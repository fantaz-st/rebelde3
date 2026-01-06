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

      const { blockSelector = '[data-team-block="1"]', innerSelector = '[data-team-media-inner="1"]', fromScale = 1.6, fromYPercent = -10, toScale = 1, toYPercent = 20, start = "top bottom", end = "bottom top" } = opts;

      const blocks = gsap.utils.toArray(scope.querySelectorAll(blockSelector));

      blocks.forEach((block, index) => {
        const inner = block.querySelector(innerSelector);
        if (!inner) return;

        gsap.set(inner, { scale: fromScale, yPercent: fromYPercent, willChange: "transform" });

        gsap.to(inner, {
          scale: toScale,
          yPercent: toYPercent,
          ease: "none",
          scrollTrigger: {
            id: `team-parallax-${index}`,
            trigger: block,
            start,
            end,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });

      ScrollTrigger.refresh();

      return () => {
        blocks.forEach((_, index) => {
          const t = ScrollTrigger.getById(`team-parallax-${index}`);
          if (t) t.kill(true);
        });
      };
    },
    { scope: scopeRef }
  );
}
