"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import classes from "./Boat.module.css";
import Button from "@/components/Button/Button";

gsap.registerPlugin(ScrollTrigger, useGSAP);
ScrollTrigger.config({ ignoreMobileResize: true });

const images = ["/images/boat/boat2.jpg", "/images/boat/boat3.jpg", "/images/boat/boat4.jpg", "/images/boat/boat5.jpg", "/images/boat/boat1.jpg", "/images/boat/boat6.jpg", "/images/boat/boat7.jpg", "/images/boat/boat2.jpg", "/images/boat/boat3.jpg"];

export default function Boat() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const gridRef = useRef(null);
  const scrimRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pinEl = pinRef.current;
      const grid = gridRef.current;
      const scrim = scrimRef.current;
      const text = textRef.current;
      if (!section || !pinEl || !grid || !scrim || !text) return;

      const scrollerEl = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot") || window;
      const scrollerOpt = scrollerEl === window ? undefined : scrollerEl;

      gsap.set(grid, { transformOrigin: "50% 50%", force3D: true });
      gsap.set(scrim, { autoAlpha: 0 });
      gsap.set(text, { autoAlpha: 0, yPercent: 20, force3D: true });

      const tl = gsap.timeline({ defaults: { ease: "none" } });

      tl.fromTo(grid, { scale: 3.1, rotate: 0 }, { scale: 1, rotate: -6 }, 0).fromTo(grid, { "--gap": "0px", "--pad": "0px" }, { "--gap": "0.6vw", "--pad": "0.6vw" }, 0).to(scrim, { autoAlpha: 0.55 }, 0).to(text, { autoAlpha: 1, yPercent: 0 }, 0.12);

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=400%",
        scrub: true,
        pin: pinEl,
        pinSpacing: true,
        anticipatePin: 1,
        scroller: scrollerOpt,
        invalidateOnRefresh: true,
        animation: tl,
      });

      return () => {
        st.kill();
        tl.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className={classes.section} id="boat">
      <div ref={pinRef} className={classes.pin}>
        <div className={classes.stage}>
          <div ref={gridRef} className={classes.grid} aria-hidden="true">
            {images.map((src, i) => (
              <div key={src + i} className={classes.tile}>
                <img src={src} alt="" className={classes.img} />
              </div>
            ))}
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
      </div>
    </section>
  );
}
