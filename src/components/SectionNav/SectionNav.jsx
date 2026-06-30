"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import classes from "./SectionNav.module.css";

export default function SectionNav({
  sections,
  containerRef = null,
  topOffset = 140,
  variant = "rail",
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [barVisible,  setBarVisible]  = useState(false);
  const [sheetOpen,   setSheetOpen]   = useState(false);
  const [mounted,     setMounted]     = useState(false);

  const count     = sections.length;
  const isOverlay = variant === "overlay";

  useEffect(() => { setMounted(true); }, []);

  const getScroller = () => {
    const el = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot");
    return el || window;
  };

  // ── Scroll-spy + mobile bar visibility ──────────────────────
  useEffect(() => {
    const scroller  = getScroller();
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
        setBarVisible(r.top < window.innerHeight * 0.6 && r.bottom > window.innerHeight * 0.2);
      } else {
        setBarVisible(sections.some((s) => {
          const el = document.getElementById(s.id);
          if (!el) return false;
          const r = el.getBoundingClientRect();
          return r.top < window.innerHeight && r.bottom > 0;
        }));
      }
    };

    const onScroll = () => { if (raf == null) raf = requestAnimationFrame(check); };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize",  onScroll, { passive: true });
    check();

    return () => {
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize",  onScroll);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, [sections, containerRef]);

  useEffect(() => { if (!barVisible) setSheetOpen(false); }, [barVisible]);

  // ── Scroll-to ────────────────────────────────────────────────
  const scrollTo = (id) => {
    const target   = document.getElementById(id);
    if (!target) return;
    const scroller = getScroller();
    if (scroller !== window) {
      const top =
        target.getBoundingClientRect().top -
        scroller.getBoundingClientRect().top +
        scroller.scrollTop - topOffset;
      scroller.scrollTo({ top, behavior: "smooth" });
    } else {
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - topOffset, behavior: "smooth" });
    }
  };

  const handleClick = (e, id) => { e.preventDefault(); scrollTo(id); setSheetOpen(false); };

  const activeLabel = sections[activeIndex]?.label ?? "";

  const pinIcon = (
    <svg viewBox="0 0 25 24" fill="none" aria-hidden="true" focusable="false">
      <path d="M12.5 6a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5m0 6a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5m0-10.5a8.26 8.26 0 0 0-8.25 8.25c0 2.944 1.36 6.064 3.938 9.023a23.8 23.8 0 0 0 3.885 3.591.75.75 0 0 0 .861 0 23.8 23.8 0 0 0 3.879-3.59c2.573-2.96 3.937-6.08 3.937-9.024A8.26 8.26 0 0 0 12.5 1.5" fill="currentColor" />
    </svg>
  );

  const mobileEl = (
    <div className={[classes.mobile, barVisible ? classes.mobileVisible : "", sheetOpen ? classes.mobileOpen : ""].join(" ")}>
      <div className={classes.backdrop} onClick={() => setSheetOpen(false)} aria-hidden="true" />
      <div className={classes.sheet} role="dialog" aria-modal="true" aria-label="Jump to section">
        <ul className={classes.sheetList} role="list">
          {sections.map((s, i) => {
            const isActive = i === activeIndex;
            return (
              <li key={s.id} className={classes.sheetItem}>
                <button
                  type="button"
                  className={`${classes.sheetBtn} ${isActive ? classes.sheetBtnActive : ""}`}
                  onClick={(e) => handleClick(e, s.id)}
                  aria-current={isActive ? "location" : undefined}
                >
                  <span className={classes.sheetBtnPin} style={{ opacity: isActive ? 1 : 0 }} aria-hidden="true">{pinIcon}</span>
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
        aria-label={`Current section: ${activeLabel}. Tap to navigate.`}
      >
        <span className={classes.barLabel}>
          <span className={classes.barPinIcon} aria-hidden="true">{pinIcon}</span>
          <span className={classes.barLabelText}>{activeLabel}</span>
        </span>
        <span className={`${classes.barChevron} ${sheetOpen ? classes.barChevronOpen : ""}`}>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
            <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
    </div>
  );

  return (
    <>
      <aside
        className={`${classes.rail} ${isOverlay ? classes.railOverlay : ""}`}
        aria-label="Section navigation"
      >
        <div className={classes.railInner}>
          {/*
            navWrap contains BOTH the pin track and the nav list.
            The pin track is absolute within navWrap so it spans
            exactly the height of the links — not the full viewport.
          */}
          <div className={classes.navWrap}>
            <div className={classes.pinTrack} aria-hidden="true">
              <div
                className={classes.pinTrackInner}
                style={{ gridTemplateRows: `${activeIndex}fr 1fr ${count - activeIndex - 1}fr` }}
              >
                <div className={classes.pinTrackEmpty} />
                <div className={classes.pinTrackDot}>
                  <span className={classes.pinIcon}>{pinIcon}</span>
                </div>
                <div className={classes.pinTrackEmpty} />
              </div>
            </div>

            <nav>
              <ul className={classes.navList} role="list">
                {sections.map((s, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        onClick={(e) => handleClick(e, s.id)}
                        className={`${classes.navItem} ${isActive ? classes.navItemActive : ""}`}
                        aria-current={isActive ? "location" : undefined}
                      >
                        <span className={classes.flip} aria-hidden="true">
                          <span className={classes.flipTop}>{s.label}</span>
                          <span className={classes.flipBot}>{s.label}</span>
                        </span>
                        <span className={classes.srOnly}>{s.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </aside>

      {mounted && createPortal(mobileEl, document.body)}
    </>
  );
}
