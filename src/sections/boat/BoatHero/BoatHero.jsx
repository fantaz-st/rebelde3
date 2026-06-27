"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import classes from "./BoatHero.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const BLUE  = "#003357";
const WHITE = "#ffffff";
const CREAM = "#f2ebe3";

export default function BoatHero() {
  const t = useTranslations("boatHero");

  const wrapRef    = useRef(null);
  const gridRef    = useRef(null);
  const textRef    = useRef(null);
  const subRef     = useRef(null);
  const thumbRef   = useRef(null);
  const thumbImgRef = useRef(null);

  useGSAP(
    () => {
      const wrap     = wrapRef.current;
      const grid     = gridRef.current;
      const text     = textRef.current;
      const sub      = subRef.current;
      const thumb    = thumbRef.current;
      const thumbImg = thumbImgRef.current;
      if (!wrap || !grid || !text || !sub || !thumb || !thumbImg) return;

      const scroller = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot") || window;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Hero image parallax — desktop only
        gsap.set(thumb, { overflow: "hidden" });
        const tlParallax = gsap.fromTo(thumbImg,
          { scale: 1.12, yPercent: -8, transformOrigin: "center" },
          {
            scale: 1, yPercent: 6, ease: "none",
            scrollTrigger: {
              trigger: thumb, scroller,
              start: "top top", end: "bottom top",
              scrub: true, invalidateOnRefresh: true,
            },
          }
        );

        // Background: blue → cream as grid scrolls
        const tlBg = gsap.fromTo(wrap,
          { backgroundColor: BLUE },
          {
            backgroundColor: CREAM, ease: "none",
            scrollTrigger: {
              trigger: grid, scroller,
              start: "top top", end: "bottom 20%",
              scrub: true, invalidateOnRefresh: true,
            },
          }
        );

        // Title + desc: white → navy
        const tlText = gsap.fromTo(text,
          { color: WHITE },
          {
            color: BLUE, ease: "none",
            scrollTrigger: {
              trigger: grid, scroller,
              start: "top top", end: "bottom 20%",
              scrub: true, invalidateOnRefresh: true,
            },
          }
        );

        // Sub text parallax
        const tlSub = gsap.fromTo(sub,
          { yPercent: 0, scale: 0.92, transformOrigin: "bottom center" },
          {
            yPercent: 30, scale: 1, ease: "none",
            scrollTrigger: {
              trigger: sub, scroller,
              start: "top bottom", end: "bottom top",
              scrub: true, invalidateOnRefresh: true,
            },
          }
        );

        return () => {
          tlParallax.scrollTrigger?.kill(); tlParallax.kill();
          tlBg.scrollTrigger?.kill();       tlBg.kill();
          tlText.scrollTrigger?.kill();     tlText.kill();
          tlSub.scrollTrigger?.kill();      tlSub.kill();
        };
      });

      // Mobile: clear any GSAP transforms so image renders naturally
      mm.add("(max-width: 767px)", () => {
        gsap.set(thumbImg, { clearProps: "scale,yPercent,transform" });
        return () => {};
      });

      return () => mm.revert();
    },
    { scope: wrapRef },
  );

  return (
    <section
      ref={wrapRef}
      className={classes.wrap}
      aria-label="The Boat — Felix 37 Buenaventura"
    >
      <div ref={gridRef} className={`container grid ${classes.grid}`}>

        {/* Image: cols 3–10 */}
        <div ref={thumbRef} className={classes.thumb}>
          <div className={classes.thumbInner}>
            <Image
              ref={thumbImgRef}
              src="/images/boat/grid/hero.jpg"
              alt="Felix 37 Buenaventura — Rebelde Boats private speedboat on the Adriatic"
              fill
              priority
              sizes="(max-width: 767px) 100vw, 45vw"
              className={classes.thumbImg}
            />
          </div>
        </div>

        {/* Text: cols 11–16, starts white, tweens to navy */}
        <div ref={textRef} className={classes.text}>
          <h1 className={classes.title}>{t("title")}</h1>
          <p className={classes.desc}>{t("desc")}</p>
        </div>

      </div>

      {/* Sub text — always navy, gets parallax on desktop */}
      <div ref={subRef} className={classes.sub}>
        <p className={classes.subText}>{t("sub")}</p>
      </div>
    </section>
  );
}
