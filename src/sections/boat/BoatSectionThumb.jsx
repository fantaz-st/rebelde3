"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import useParallaxImage from "@/hooks/useParallaxImage";
import classes from "./Boat.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function BoatSectionThumb({ section, index }) {
  const wrapRef       = useRef(null);
  const thumbRef      = useRef(null);
  const thumbInnerRef = useRef(null);
  const thumbTxtRef   = useRef(null);

  // Parallax on the thumb image
  useParallaxImage(wrapRef, {
    blockSelector:  "[data-parallax-block]",
    innerSelector:  "[data-parallax-inner]",
    fromScale:      1.15,
    fromYPercent:   -12,
    toScale:        1,
    toYPercent:     10,
    start:          "top bottom",
    end:            "bottom top",
  });

  // Clip-path reveal
  useGSAP(
    () => {
      const thumb = thumbRef.current;
      const inner = thumbInnerRef.current;
      const txt   = thumbTxtRef.current;
      if (!thumb || !inner || !txt) return;

      const scrollerEl  = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot");
      const scroller    = scrollerEl || window;
      const scrollerOpt = scroller === window ? undefined : scroller;

      const fs = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const r8 = (8 / 10) * fs;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.set(inner, { willChange: "clip-path" });

        const tl = gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger:             thumb,
              scroller:            scrollerOpt,
              start:               "top bottom",
              end:                 "bottom bottom",
              scrub:               true,
              invalidateOnRefresh: true,
            },
          })
          .fromTo(inner, { clipPath: `inset(14% 37.35% 14% 37.35% round ${r8}px)` }, { clipPath: "inset(0% 0% 0% 0% round 0px)" }, 0)
          .fromTo(txt,   { scale: 0.6, transformOrigin: "top" },                      { scale: 1, transformOrigin: "top" },          0.1);

        requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => { tl.scrollTrigger?.kill(); tl.kill(); };
      });

      mm.add("(max-width: 767px)", () => {
        gsap.set(inner, { clearProps: "clipPath,willChange" });
        gsap.set(txt,   { clearProps: "scale,transformOrigin" });
      });

      return () => mm.revert();
    },
    { scope: wrapRef },
  );

  // Assign both wrapRef and thumbRef to the same element
  const setRefs = (el) => {
    wrapRef.current = el;
    thumbRef.current = el;
  };

  return (
    <div ref={setRefs} className={classes.thumb} data-parallax-block>
      <div className={classes.thumbInner} ref={thumbInnerRef} data-parallax-inner>
        <Image
          src={section.thumb}
          alt={index === 0
            ? "Felix 37 Buenaventura — Rebelde Boats private charter speedboat from Split"
            : `${section.label} — Rebelde Boats Felix 37`}
          fill
          sizes="100vw"
          className={classes.thumbImg}
          priority={index === 0}
        />
      </div>
      <div className={classes.thumbTxt} ref={thumbTxtRef}>
        <h2 className={classes.thumbHeading}>{section.label}</h2>
      </div>
    </div>
  );
}
