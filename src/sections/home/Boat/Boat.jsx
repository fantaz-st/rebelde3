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

  useGSAP(
    () => {
      const section = sectionRef.current;

      const scrollerEl = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot") || window;
      const scrollerOpt = scrollerEl === window ? undefined : scrollerEl;

      console.log(sectionRef.current.getBoundingClientRect());

      const tl = gsap.timeline({
        scrollTrigger: {
          scroller: scrollerOpt,
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          markers: true,
        },
      });

      tl.to("[data-scale]", {
        scale: 0.51,
        duration: 10,
      });

      tl.to('[data-zoom-type="side"], [data-zoom-type="main"]', {
        clipPath: "inset(10px round 10px)",
        ease: "power4.out",
        duration: 10,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section className={classes.section} id="boat" ref={sectionRef}>
      <div className={classes.inner}>
        <div className={classes.grid} data-scale>
          <div className={classes.top} data-section="top">
            {images.top.map((img, idx) => (
              <div key={`top-${idx}`} className={classes.imageWrapper} style={{ ...img.position }}>
                <Image data-zoom-type={img.type} src={img.src} alt="img desc" fill sizes="(max-width: 640px) 1080px, 100vw" className={classes.image} priority={false} />
              </div>
            ))}
          </div>
          <div className={classes.center} data-section="center">
            {images.center.map((img, idx) => (
              <div key={`center-${idx}`} className={classes.imageWrapper} style={{ ...img.position }}>
                <Image data-zoom-type={img.type} src={img.src} alt="img desc" fill sizes="(max-width: 640px) 1080px, 100vw" className={classes.image} priority={img.type === "main"} />
              </div>
            ))}
          </div>
          <div className={classes.bottom} data-section="bottom">
            {images.bottom.map((img, idx) => (
              <div key={`bottom-${idx}`} className={classes.imageWrapper} style={{ ...img.position }}>
                <Image data-zoom-type={img.type} src={img.src} alt="img desc" fill sizes="(max-width: 640px) 1080px, 100vw" className={classes.image} priority={false} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
