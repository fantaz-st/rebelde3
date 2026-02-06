"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import classes from "./Boat.module.css";
import Button from "@/components/Button/Button";
import Image from "next/image";
import images from "@/settings/boatImages";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Boat() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const scrimRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const grid = gridRef.current;
      const scrim = scrimRef.current;
      const text = textRef.current;
      if (!section || !grid || !scrim || !text) return;

      const scrollerEl = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot") || window;
      const scrollerOpt = scrollerEl === window ? undefined : scrollerEl;

      gsap.set(grid, { transformOrigin: "50% 50%", force3D: true });
      gsap.set(scrim, { autoAlpha: 0 });
      gsap.set(text, { autoAlpha: 0, yPercent: 18, force3D: true });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          scroller: scrollerOpt,
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
      });

      tl.to(
        grid,
        {
          scale: 0.51,
        },
        0,
      )
        .to(
          '[data-zoom-type="side"], [data-zoom-type="main"]',
          {
            clipPath: "inset(10px round 10px)",
          },
          0,
        )
        .to(
          scrim,
          {
            autoAlpha: 0.25,
          },
          0,
        )
        .to(
          text,
          {
            autoAlpha: 1,
            yPercent: 0,
          },
          0.12,
        );

      return () => tl.kill();
    },
    { scope: sectionRef },
  );

  return (
    <section className={classes.section} id="boat" ref={sectionRef}>
      <div className={classes.inner}>
        <div ref={gridRef} className={classes.grid} data-scale>
          <div className={classes.top}>
            {images.top.map((img, idx) => (
              <div key={`top-${idx}`} className={classes.imageWrapper} style={{ ...img.position }}>
                <Image data-zoom-type={img.type} src={img.src} alt="" fill sizes="(max-width: 640px) 1080px, 100vw" className={classes.image} priority={false} />
              </div>
            ))}
          </div>

          <div className={classes.center}>
            {images.center.map((img, idx) => (
              <div key={`center-${idx}`} className={classes.imageWrapper} style={{ ...img.position }}>
                <Image data-zoom-type={img.type} src={img.src} alt="" fill sizes="(max-width: 640px) 1080px, 100vw" className={classes.image} priority={img.type === "main"} />
              </div>
            ))}
          </div>

          <div className={classes.bottom}>
            {images.bottom.map((img, idx) => (
              <div key={`bottom-${idx}`} className={classes.imageWrapper} style={{ ...img.position }}>
                <Image data-zoom-type={img.type} src={img.src} alt="" fill sizes="(max-width: 640px) 1080px, 100vw" className={classes.image} priority={false} />
              </div>
            ))}
          </div>
        </div>

        <div ref={scrimRef} className={classes.scrim} aria-hidden="true" />

        <div className={`grid ${classes.overlay}`}>
          <div ref={textRef} className={classes.text}>
            <h2 className={classes.title}>Built for Good Living.</h2>
            <p className={classes.desc}>Comfort you can sink into. Performance that carries you farther. Space designed for shared smiles, spontaneous dives, and long, slow lunches under the sun. Buenaventura isn&apos;t just a boat — it&apos;s your floating sanctuary.</p>
            <Button>Explore the boat</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
