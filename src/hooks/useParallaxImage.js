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

      const scroller = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot");

      const { blockSelector = '[data-team-block="1"]', innerSelector = '[data-team-media-inner="1"]', fromScale = 1.6, fromYPercent = -10, toScale = 1, toYPercent = 20, start = "top bottom", end = "bottom top" } = opts;

      const killById = (id) => {
        const t = ScrollTrigger.getById(id);
        if (t) t.kill(true);
      };

      const blocks = gsap.utils.toArray(scope.querySelectorAll(blockSelector));

      blocks.forEach((block, index) => {
        const inner = block.querySelector(innerSelector);
        if (!inner) return;

        const id = `team-parallax-${index}`;
        killById(id);

        gsap.set(inner, {
          scale: fromScale,
          yPercent: fromYPercent,
          willChange: "transform",
        });

        gsap.to(inner, {
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
        });
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        blocks.forEach((_, index) => {
          killById(`team-parallax-${index}`);
        });
      };
    },
    { scope: scopeRef }
  );
}
