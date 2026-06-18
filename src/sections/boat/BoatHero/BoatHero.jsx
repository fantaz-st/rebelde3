"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import useParallaxImage from "@/hooks/useParallaxImage";
import classes from "./BoatHero.module.css";
import { boatHero } from "@/settings/boatSections";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const BLUE  = "#003357";
const WHITE = "#ffffff";
const CREAM = "#f2ebe3";

export default function BoatHero() {
  const wrapRef = useRef(null);
  const gridRef = useRef(null);
  const textRef = useRef(null);
  const subRef  = useRef(null);

  useParallaxImage(wrapRef, {
    blockSelector: "[data-parallax-block]",
    innerSelector: "[data-parallax-inner]",
    fromScale:    1.12,
    fromYPercent: -8,
    toScale:      1,
    toYPercent:   6,
    start: "top top",
    end:   "bottom top",
  });

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const grid = gridRef.current;
      const text = textRef.current;
      const sub  = subRef.current;
      if (!wrap || !grid || !text || !sub) return;

      const scroller = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot") || window;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const tlBg = gsap.timeline({
          scrollTrigger: {
            trigger: grid, scroller,
            start: "top top", end: "bottom 20%",
            scrub: true, invalidateOnRefresh: true,
          },
        });
        tlBg.fromTo(wrap,
          { backgroundColor: BLUE },
          { backgroundColor: CREAM, ease: "none" }
        );

        const tlText = gsap.timeline({
          scrollTrigger: {
            trigger: grid, scroller,
            start: "top top", end: "bottom 20%",
            scrub: true, invalidateOnRefresh: true,
          },
        });
        tlText.fromTo(text,
          { color: WHITE },
          { color: BLUE, ease: "none" }
        );

        const tlSub = gsap.timeline({
          scrollTrigger: {
            trigger: sub, scroller,
            start: "top bottom", end: "bottom top",
            scrub: true, invalidateOnRefresh: true,
          },
        });
        tlSub.fromTo(sub,
          { yPercent: 0, scale: 0.92, transformOrigin: "bottom center" },
          { yPercent: 30, scale: 1, ease: "none" }
        );

        return () => {
          tlBg.scrollTrigger?.kill();   tlBg.kill();
          tlText.scrollTrigger?.kill(); tlText.kill();
          tlSub.scrollTrigger?.kill();  tlSub.kill();
        };
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

        {/* Image: cols 4–10 */}
        <div className={classes.thumb} data-parallax-block>
          <div className={classes.thumbInner} data-parallax-inner>
            <Image
              src={boatHero.hero}
              alt="Felix 37 Buenaventura — Rebelde Boats private speedboat on the Adriatic"
              fill
              priority
              sizes="(max-width: 767px) 100vw, 45vw"
              className={classes.thumbImg}
            />
          </div>
        </div>

        {/* Text: cols 12–14, pushed to bottom of viewport */}
        <div ref={textRef} className={classes.text}>
          <h1 className={classes.title}>{boatHero.title}</h1>
          <p className={classes.desc}>{boatHero.desc}</p>
        </div>

        {/* Sub: row 2, cols 6–11 */}
        <div ref={subRef} className={classes.sub}>
          <p className={classes.subText}>{boatHero.sub}</p>
        </div>

      </div>
    </section>
  );
}