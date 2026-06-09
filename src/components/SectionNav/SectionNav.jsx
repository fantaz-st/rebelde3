"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import classes from "./SectionNav.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Unified section navigation.
 *
 * Desktop (>=992px):
 *   - default: a grid-column rail (FAQ-style), pinned via GSAP
 *   - overlay: an absolute, pinned overlay that floats at the container's left
 *     edge (for full-bleed pages like Expeditions). Links use mix-blend-mode so
 *     they stay legible over both dark hero images and light content.
 * Mobile (<992px): a bottom bar that appears once the user scrolls into the
 *   sections; tap to expand a sheet of all sections.
 *
 * @param {{id:string,label:string}[]} sections
 * @param {React.RefObject} containerRef - element wrapping the sections
 * @param {number} [topOffset=140]
 * @param {boolean} [overlay=false] - use the absolute floating overlay (full-bleed pages)
 */
export default function SectionNav({ sections, containerRef, topOffset = 140, overlay = false }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [barVisible, setBarVisible] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const railRef = useRef(null);
  const rootRef = useRef(null);
  const count = sections.length;

  const getScroller = () => {
    const el = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot");
    return el || window;
  };

  // ---- Desktop pin (>=992px) ----
  // Overlay mode pins the inner rail; grid mode pins the rail element.
  useGSAP(
    () => {
      const rail = railRef.current;
      const container = containerRef?.current;
      if (!rail || !container) return;

      const scroller = getScroller();
      const scrollerOpt = scroller === window ? undefined : scroller;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 992px)", () => {
        // In overlay mode the rail is already absolute inside the container,
        // and uses position:sticky internally — no GSAP pin needed.
        if (overlay) return;

        const st = ScrollTrigger.create({
          trigger: container,
          scroller: scrollerOpt,
          start: `top ${topOffset}`,
          end: "bottom bottom",
          pin: rail,
          pinSpacing: false,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        });
        requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => st.kill();
      });

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [count, overlay] },
  );

  // ---- Scroll-spy + mobile bar visibility ----
  useEffect(() => {
    const scroller = getScroller();
    const container = containerRef?.current;
    let raf = null;

    const check = () => {
      raf = null;
      const triggerLine = window.innerHeight / 5;

      let current = 0;
      sections.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= triggerLine) current = i;
      });
      setActiveIndex(current);

      if (container) {
        const r = container.getBoundingClientRect();
        const inView = r.top < window.innerHeight * 0.6 && r.bottom > window.innerHeight * 0.2;
        setBarVisible(inView);
      }
    };

    const onScroll = () => {
      if (raf == null) raf = requestAnimationFrame(check);
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    check();

    return () => {
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, [sections, containerRef]);

  useEffect(() => {
    if (!barVisible) setSheetOpen(false);
  }, [barVisible]);

  const scrollTo = (id) => {
    const target = document.getElementById(id);
    if (!target) return;
    const scroller = getScroller();

    if (scroller && scroller !== window) {
      const top =
        target.getBoundingClientRect().top -
        scroller.getBoundingClientRect().top +
        scroller.scrollTop -
        topOffset;
      scroller.scrollTo({ top, behavior: "smooth" });
    } else {
      const top = target.getBoundingClientRect().top + window.scrollY - topOffset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleClick = (e, id) => {
    e.preventDefault();
    scrollTo(id);
    setSheetOpen(false);
  };

  const activeLabel = sections[activeIndex]?.label || "";

  const pinSvg = (
    <svg viewBox="0 0 25 24" fill="none" aria-hidden="true">
      <path
        d="M12.5 6a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5m0 6a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5m0-10.5a8.26 8.26 0 0 0-8.25 8.25c0 2.944 1.36 6.064 3.938 9.023a23.8 23.8 0 0 0 3.885 3.591.75.75 0 0 0 .861 0 23.8 23.8 0 0 0 3.879-3.59c2.573-2.96 3.937-6.08 3.937-9.024A8.26 8.26 0 0 0 12.5 1.5"
        fill="currentColor"
      />
    </svg>
  );

  // Desktop rail markup (shared by both modes; class differs)
  const railClass = overlay
    ? `${classes.rail} ${classes.railOverlay}`
    : classes.rail;

  return (
    <div ref={rootRef} className={classes.root}>
      {/* ===== DESKTOP rail ===== */}
      <aside className={railClass} ref={railRef}>
        <div className={classes.railInner}>
          <div className={classes.pin}>
            <div
              className={classes.pinInner}
              style={{ gridTemplateRows: `${activeIndex}fr 1fr ${count - activeIndex - 1}fr` }}
            >
              <div className={classes.pinEmpty} />
              <div className={classes.pinMain}>
                <span className={classes.pinIc}>{pinSvg}</span>
              </div>
              <div className={classes.pinEmpty} />
            </div>
          </div>

          <nav className={classes.list}>
            {sections.map((s, i) => {
              const isActive = i === activeIndex;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={(e) => handleClick(e, s.id)}
                  className={`${classes.item} ${isActive ? classes.itemActive : ""}`}
                  aria-current={isActive ? "true" : undefined}
                >
                  <span className={classes.flip}>
                    <span className={classes.flipTop}>{s.label}</span>
                    <span className={classes.flipBottom}>{s.label}</span>
                  </span>
                </a>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* ===== MOBILE bottom bar + sheet ===== */}
      <div
        className={`${classes.mobile} ${barVisible ? classes.mobileVisible : ""} ${
          sheetOpen ? classes.mobileOpen : ""
        }`}
      >
        <div className={classes.sheetBackdrop} onClick={() => setSheetOpen(false)} aria-hidden="true" />

        <div className={classes.sheet} role="dialog" aria-modal="true" aria-label="Jump to section">
          <ul className={classes.sheetList}>
            {sections.map((s, i) => {
              const isActive = i === activeIndex;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    className={`${classes.sheetItem} ${isActive ? classes.sheetItemActive : ""}`}
                    onClick={(e) => handleClick(e, s.id)}
                  >
                    {isActive && <span className={classes.sheetItemPin} aria-hidden="true">{pinSvg}</span>}
                    {s.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <button
          type="button"
          className={classes.bar}
          onClick={() => setSheetOpen((v) => !v)}
          aria-expanded={sheetOpen}
        >
          <span className={classes.barLabel}>
            <span className={classes.barPin} aria-hidden="true">{pinSvg}</span>
            {activeLabel}
          </span>
          <span className={`${classes.barChevron} ${sheetOpen ? classes.barChevronOpen : ""}`}>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
