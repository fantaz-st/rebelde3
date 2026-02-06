"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import classes from "./Boat.module.css";
import Button from "@/components/Button/Button";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const images = ["/images/boat/boat2.jpg", "/images/boat/boat3.jpg", "/images/boat/boat4.jpg", "/images/boat/boat5.jpg", "/images/boat/boat1.jpg", "/images/boat/boat6.jpg", "/images/boat/boat7.jpg", "/images/boat/boat2.jpg", "/images/boat/boat3.jpg"];

export default function Boat() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const viewportRef = useRef(null);
  const gridRef = useRef(null);
  const centerTileRef = useRef(null);
  const textRef = useRef(null);
  const scrimRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pinEl = pinRef.current;
      const viewport = viewportRef.current;
      const grid = gridRef.current;
      const centerTile = centerTileRef.current;
      const text = textRef.current;
      const scrim = scrimRef.current;

      if (!section || !pinEl || !viewport || !grid || !centerTile || !text || !scrim) return;

      const scrollerEl = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot");
      const scroller = scrollerEl || window;
      const scrollerOpt = scroller === window ? undefined : scroller;

      gsap.set(grid, { transformOrigin: "50% 50%", force3D: true });
      gsap.set(text, { autoAlpha: 0, yPercent: 28, force3D: true });
      gsap.set(scrim, { autoAlpha: 0 });

      const applyStartState = () => {
        gsap.set(grid, { clearProps: "transform" });

        const vp = viewport.getBoundingClientRect();
        const tile = centerTile.getBoundingClientRect();
        if (!vp.width || !vp.height || !tile.width || !tile.height) return;

        const scaleCover = Math.max(vp.width / tile.width, vp.height / tile.height);

        const vpCx = vp.left + vp.width / 2;
        const vpCy = vp.top + vp.height / 2;
        const tileCx = tile.left + tile.width / 2;
        const tileCy = tile.top + tile.height / 2;

        const dx = vpCx - tileCx;
        const dy = vpCy - tileCy;

        gsap.set(grid, { x: dx, y: dy, scale: scaleCover * 1.02, rotate: 0 });
      };

      applyStartState();

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
          pin: pinEl,
          pinSpacing: true,
          anticipatePin: 1,
          scroller: scrollerOpt,
          invalidateOnRefresh: true,
          onRefreshInit: applyStartState,
        },
      });

      tl.to(
        grid,
        {
          x: 0,
          y: 0,
          scale: 1,
          rotate: -6,
        },
        0,
      )
        .to(
          scrim,
          {
            autoAlpha: 0.75,
          },
          0,
        )
        .to(
          text,
          {
            autoAlpha: 1,
            yPercent: 0,
          },
          0,
        );

      return () => {
        tl.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className={classes.section} id="drive-modes">
      <div ref={pinRef} className={classes.pin}>
        <div className={classes.centerRow}>
          <div ref={viewportRef} className={classes.gridViewport} aria-hidden="true">
            <div ref={gridRef} className={classes.grid}>
              {images.map((src, i) => (
                <div key={src + i} ref={i === 4 ? centerTileRef : null} className={classes.tile}>
                  <img src={src} alt="" className={`${classes.img} ${i === 4 ? classes.imgTop : ""}`} />
                </div>
              ))}
            </div>
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
