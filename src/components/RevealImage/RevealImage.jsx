"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import classes from "./RevealImage.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function RevealImage({
  src,
  alt = "",
  sizes = "100vw",
  quality = 85,
  priority = false,
  title,
  inset = 45,
  radius = 0,
  height = "100vh",
  className = "",
}) {
  const frameRef = useRef(null);

  useGSAP(
    () => {
      const frame = frameRef.current;
      if (!frame) return;

      const panel = frame.querySelector("[data-reveal-panel]");
      const img = frame.querySelector("[data-reveal-img]");
      const titleEl = frame.querySelector("[data-reveal-title]");
      if (!panel || !img) return;

      /* Lenis owns scrolling; ScrollTrigger wants undefined, not window. */
      const el =
        window.__RBD_SCROLLER__ ||
        document.querySelector(".scrollRoot") ||
        window;
      const scroller = el === window ? undefined : el;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 992px)", () => {
        /* rem -> px, because clip-path's `round` won't take a rem here. */
        const rootPx = parseFloat(
          getComputedStyle(document.documentElement).fontSize || "10",
        );
        const r = radius * rootPx;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: frame,
            scroller,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
            // markers: true,
          },
          defaults: { ease: "none" },
        });

        /* Right edge stays pinned, left edge travels out to 0 — the image
           unclips leftward. Measured off the reference recording: across the
           reveal the right edge never moves and only the left does. */
        tl.fromTo(
          panel,
          { clipPath: `inset(0% 0% 0% ${inset}% round ${r}px)` },
          { clipPath: "inset(0% 0% 0% 0% round 0px)" },
        );
        tl.fromTo(
          img,
          { scale: 1.2, transformOrigin: "right center" },
          { scale: 1 },
          0,
        );

        /* Overlaid title rises in with the reveal. */
        if (titleEl) {
          tl.fromTo(
            titleEl,
            { scale: 0.9, transformOrigin: "top", autoAlpha: 0 },
            { scale: 1, transformOrigin: "top", autoAlpha: 1 },
            0,
          );
        }

        /* Layout is still settling on first paint; measure a frame later. */
        requestAnimationFrame(() => ScrollTrigger.refresh());

        /* Kill this timeline only. Calling mm.revert() here would recurse:
           revert() runs every registered context's cleanup, and this IS one
           of them. The outer cleanup below is what disposes the matchMedia. */
        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: frameRef },
  );

  return (
    <div
      ref={frameRef}
      className={`${classes.frame} ${className}`.trim()}
      style={{ "--reveal-height": height }}
    >
      <div className={classes.panel} data-reveal-panel>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={quality}
          priority={priority}
          className={classes.img}
          data-reveal-img
        />
      </div>

      {title && (
        <div className={classes.title} data-reveal-title>
          <h2 className={classes.titleText}>{title}</h2>
        </div>
      )}
    </div>
  );
}
