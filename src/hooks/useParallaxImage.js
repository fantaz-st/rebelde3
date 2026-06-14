"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useId } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function useParallaxImage(scopeRef, opts = {}) {
  // useId gives a stable, unique prefix per component instance —
  // prevents multiple instances from killing each other's ScrollTriggers
  const uid = useId();

  useGSAP(
    () => {
      const scope = scopeRef?.current;
      if (!scope) return;

      const scroller = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot") || window;

      const {
        blockSelector = "[data-parallax-block]",
        innerSelector = "[data-parallax-inner]",
        fromScale     = 1.15,
        fromYPercent  = -20,
        toScale       = 1,
        toYPercent    = 12,
        start         = "top bottom",
        end           = "bottom top",
      } = opts;

      const blocks = gsap.utils.toArray(scope.querySelectorAll(blockSelector));

      const triggers = blocks.map((block, index) => {
        const inner = block.querySelector(innerSelector);
        const img   = inner?.querySelector("img");
        if (!inner || !img) return null;

        const id = `parallax-${uid}-${index}`;

        gsap.set(inner, { overflow: "hidden" });

        return gsap.fromTo(
          img,
          { scale: fromScale, yPercent: fromYPercent, transformOrigin: "center" },
          {
            scale:    toScale,
            yPercent: toYPercent,
            ease:     "none",
            scrollTrigger: {
              id,
              scroller,
              trigger:             block,
              start,
              end,
              scrub:               true,
              invalidateOnRefresh: true,
            },
          },
        );
      }).filter(Boolean);

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        triggers.forEach((t) => {
          t.scrollTrigger?.kill();
          t.kill();
        });
      };
    },
    { scope: scopeRef },
  );
}
