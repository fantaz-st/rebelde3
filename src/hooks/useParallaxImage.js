"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function useParallaxImage(scopeRef, opts = {}) {
  useGSAP(
    () => {
      const scope = scopeRef?.current;
      if (!scope) return;

      const scroller = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot") || window;

      const { blockSelector = "[data-parallax-block]", innerSelector = "[data-parallax-inner]", fromScale = 1.15, fromYPercent = -20, toScale = 1, toYPercent = 12, start = "top bottom", end = "bottom top" } = opts;

      const killById = (id) => {
        const t = ScrollTrigger.getById(id);
        if (t) t.kill(true);
      };

      const blocks = gsap.utils.toArray(scope.querySelectorAll(blockSelector));

      blocks.forEach((block, index) => {
        const inner = block.querySelector(innerSelector);
        const img = inner?.querySelector("img");
        if (!inner || !img) return;

        const id = `team-parallax-${index}`;
        killById(id);

        gsap.set(inner, { overflow: "hidden" });
        gsap.set(img, { willChange: "transform" });

        gsap.fromTo(
          img,
          { scale: fromScale, yPercent: fromYPercent, transformOrigin: "center" },
          {
            scale: toScale,
            yPercent: toYPercent,
            ease: "none",
            scrollTrigger: {
              id,
              scroller,
              trigger: block,
              start,
              end,
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        blocks.forEach((_, index) => killById(`team-parallax-${index}`));
      };
    },
    { scope: scopeRef }
  );
}
