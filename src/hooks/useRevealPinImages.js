"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function useRevealPinImages(scopeRef, opts = {}) {
  useGSAP(
    () => {
      const scope = scopeRef?.current;
      if (!scope) return;

      const scroller = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot");

      const {
        selector = '[data-reveal-pin="1"]',
        startInset = "inset(14% 50% 14% 50% round 8rem)",
        midInset = "inset(0% 0% 0% 0% round 0rem)",
        imgScaleFrom = 1.2,
        imgScaleMid = 1.1,
        imgScaleTo = 1,
        revealStart = "top bottom",
        revealEnd = "top top",
        pinStart = "top top",
        pinDistanceVH = 1.3,
      } = opts;

      const killById = (id) => {
        const t = ScrollTrigger.getById(id);
        if (t) t.kill(true);
      };

      const blocks = gsap.utils.toArray(scope.querySelectorAll(selector));

      blocks.forEach((block, index) => {
        const inner = block.querySelector('[data-reveal-pin-inner="1"]') || block;
        const img = block.querySelector("img");

        if (!inner || !img) return;

        const idReveal = `reveal-pin-reveal-${index}`;
        const idPin = `reveal-pin-pin-${index}`;

        killById(idReveal);
        killById(idPin);

        gsap.set(inner, {
          clipPath: startInset,
          WebkitClipPath: startInset,
          willChange: "clip-path",
        });

        gsap.set(img, {
          scale: imgScaleFrom,
          transformOrigin: "top",
          willChange: "transform",
        });

        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              id: idReveal,
              scroller,
              trigger: block,
              start: revealStart,
              end: revealEnd,
              scrub: true,
              invalidateOnRefresh: true,
              markers: true,
            },
          })
          .fromTo(inner, { clipPath: startInset, WebkitClipPath: startInset }, { clipPath: midInset, WebkitClipPath: midInset, duration: 1 }, 0)
          .fromTo(img, { scale: imgScaleFrom, transformOrigin: "top" }, { scale: imgScaleMid, transformOrigin: "top", duration: 1 }, 0);

        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              id: idPin,
              scroller,
              trigger: block,
              start: pinStart,
              end: () => `+=${window.innerHeight * pinDistanceVH}`,
              scrub: true,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })
          .to(img, { scale: imgScaleTo, transformOrigin: "top", duration: 1 });
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        blocks.forEach((_, index) => {
          killById(`reveal-pin-reveal-${index}`);
          killById(`reveal-pin-pin-${index}`);
        });
      };
    },
    { scope: scopeRef }
  );
}
