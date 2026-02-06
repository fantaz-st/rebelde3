"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import classes from "./Boat.module.css";
import Image from "next/image";
import images from "@/settings/boatImages";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Boat() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const grid = gridRef.current;
      if (!section || !grid) return;

      const scrollerEl = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot") || window;
      const scrollerOpt = scrollerEl === window ? undefined : scrollerEl;

      const q = gsap.utils.selector(section);

      gsap.set(grid, { transformOrigin: "50% 50%", force3D: true });

      const clipTargets = q(`[data-zoom-type="side"], [data-zoom-type="main"]`);
      gsap.set(clipTargets, { clipPath: "inset(0px round 0px)" });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          scroller: scrollerOpt,
          trigger: section,
          start: "top top",
          end: "+=300%",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      tl.to(grid, { scale: 0.51 }, 0).to(clipTargets, { clipPath: "inset(10px round 10px)" }, 0);
    },
    { scope: sectionRef },
  );

  return (
    <section className={classes.section} id="boat" ref={sectionRef}>
      <div className={classes.inner}>
        <div ref={gridRef} className={classes.grid} data-scale>
          <div className={classes.top} data-section="top">
            {images.top.map((img, idx) => (
              <div key={`top-${idx}`} className={classes.imageWrapper} data-zoom-type={img.type} style={{ ...img.position }}>
                <Image src={img.src} alt="" fill sizes="(max-width: 640px) 1080px, 100vw" className={classes.image} priority={false} />
              </div>
            ))}
          </div>

          <div className={classes.center} data-section="center">
            {images.center.map((img, idx) => (
              <div key={`center-${idx}`} className={classes.imageWrapper} data-zoom-type={img.type} style={{ ...img.position }}>
                <Image src={img.src} alt="" fill sizes="(max-width: 640px) 1080px, 100vw" className={classes.image} priority={img.type === "main"} />
              </div>
            ))}
          </div>

          <div className={classes.bottom} data-section="bottom">
            {images.bottom.map((img, idx) => (
              <div key={`bottom-${idx}`} className={classes.imageWrapper} data-zoom-type={img.type} style={{ ...img.position }}>
                <Image src={img.src} alt="" fill sizes="(max-width: 640px) 1080px, 100vw" className={classes.image} priority={false} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
