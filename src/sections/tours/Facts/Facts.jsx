"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import classes from "./Facts.module.css";
import items from "@/settings/facts";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Facts() {
  const wrapRef = useRef(null);
  const itemRefs = useRef([]);
  const thumbItemRefs = useRef([]);
  const thumbImgRefs = useRef([]);
  const txtRefs = useRef([]);
  const tlRef = useRef(null);

  // Mobile accordion
  const [openIndex, setOpenIndex] = useState(0);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      if (!wrap) return;

      const scrollerEl = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot");
      const scroller = scrollerEl || window;
      const scrollerOpt = scroller === window ? undefined : scroller;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const navItems = itemRefs.current.filter(Boolean);
        const thumbs = thumbItemRefs.current.filter(Boolean);
        const imgs = thumbImgRefs.current.filter(Boolean);
        const txts = txtRefs.current.filter(Boolean);

        if (navItems.length === 0 || navItems.length !== thumbs.length) return;

        // Initial state: first thumb visible, rest pushed below
        thumbs.forEach((thumb, idx) => {
          gsap.set(thumb, { yPercent: idx === 0 ? 0 : 100 });
          gsap.set(imgs[idx], { yPercent: idx === 0 ? 0 : -30 });
        });

        // Sync active class on first nav item & first text
        navItems[0]?.classList.add(classes.active);
        txts[0]?.classList.add(classes.activeTxt);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrap,
            scroller: scrollerOpt,
            // Start when the wrap hits the top of viewport,
            // end when the wrap's bottom hits the bottom of viewport.
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        tlRef.current = tl;

        const setActive = (newIndex) => {
          navItems.forEach((it, i) => it.classList.toggle(classes.active, i === newIndex));
          txts.forEach((t, i) => t.classList.toggle(classes.activeTxt, i === newIndex));
        };

        // Transition between each consecutive pair
        navItems.forEach((el, idx) => {
          if (idx >= navItems.length - 1) return;

          tl.to(thumbs[idx], {
            yPercent: -100,
            duration: 1,
            onUpdate() {
              if (this.ratio >= 0.5) setActive(idx + 1);
              else setActive(idx);
            },
          })
            .to(imgs[idx], { yPercent: 30, duration: 1 }, "<")
            .to(thumbs[idx + 1], { yPercent: 0, duration: 1 }, "<")
            .to(imgs[idx + 1], { yPercent: 0, duration: 1 }, "<");
        });

        requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
          tlRef.current = null;
        };
      });

      mm.add("(max-width: 767px)", () => {
        thumbItemRefs.current.forEach((el) => el && gsap.set(el, { clearProps: "all" }));
        thumbImgRefs.current.forEach((el) => el && gsap.set(el, { clearProps: "all" }));
      });

      return () => mm.revert();
    },
    { scope: wrapRef },
  );

  // Click → smooth-scroll (desktop) or toggle accordion (mobile)
  const handleItemClick = (idx) => {
    const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

    if (isMobile) {
      setOpenIndex((curr) => (curr === idx ? -1 : idx));
      return;
    }

    const tl = tlRef.current;
    if (!tl?.scrollTrigger) return;

    const st = tl.scrollTrigger;
    const total = st.end - st.start;
    const stepSize = total / (items.length - 1);
    const targetScroll = st.start + stepSize * idx;

    const scrollerEl = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot");
    const scroller = scrollerEl || window;

    if (scroller && scroller !== window) {
      scroller.scrollTo({ top: targetScroll, behavior: "smooth" });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <div className={classes.wrap} ref={wrapRef}>
      <section className={classes.fact}>
        <div className={`container grid ${classes.grid}`}>
          {/* LEFT: title + clickable fact list */}
          <div className={classes.main}>
            <div className={classes.mainInner}>
              <div className={classes.title}>
                <h2 className={classes.titleHeading}>What Makes Rebelde Different</h2>
              </div>

              <ul className={classes.list}>
                {items.map((item, idx) => {
                  const isOpen = idx === openIndex;
                  return (
                    <li
                      key={item.key}
                      ref={(el) => (itemRefs.current[idx] = el)}
                      className={`${classes.item} ${isOpen ? classes.itemOpen : ""}`}
                    >
                      <button
                        type="button"
                        className={classes.itemHead}
                        onClick={() => handleItemClick(idx)}
                        aria-expanded={isOpen}
                      >
                        <span className={classes.itemPoint} aria-hidden="true" />
                        <span className={classes.itemTitle}>{item.title}</span>
                      </button>

                      {/* Mobile-only accordion content */}
                      <div className={classes.itemContent}>
                        <div className={classes.itemImg}>
                          <Image
                            src={item.img}
                            alt=""
                            fill
                            sizes="(max-width: 767px) 100vw, 40vw"
                            className={classes.img}
                          />
                        </div>
                        <p className={classes.itemDesc}>{item.desc}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* RIGHT: sticky image card + crossfading text (desktop) */}
          <div className={classes.thumb}>
            <div className={classes.thumbCms}>
              <div className={classes.thumbList}>
                {items.map((item, idx) => (
                  <div
                    key={item.key}
                    ref={(el) => (thumbItemRefs.current[idx] = el)}
                    className={classes.thumbItem}
                  >
                    <div
                      ref={(el) => (thumbImgRefs.current[idx] = el)}
                      className={classes.thumbItemImg}
                    >
                      <Image
                        src={item.img}
                        alt=""
                        fill
                        sizes="(max-width: 991px) 60vw, 45vw"
                        className={classes.img}
                        priority={idx === 0}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className={classes.thumbTxt}>
                {items.map((item, idx) => (
                  <div
                    key={item.key}
                    ref={(el) => (txtRefs.current[idx] = el)}
                    className={classes.thumbTxtInner}
                  >
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
