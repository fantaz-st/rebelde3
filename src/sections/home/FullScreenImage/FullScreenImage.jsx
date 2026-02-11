"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import classes from "./FullScreenImage.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function FullScreenImage() {
  const containerRef = useRef(null);
  const imgWrapperRef = useRef(null);
  const pinRef = useRef(null);
  const imgRef = useRef(null);

  useGSAP(
    () => {
      const scroller = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot") || window;

      const fs = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const r8 = (8 / 10) * fs;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          scroller,
          pin: true,

          start: "top top",
          end: "500%",
          // end: () => `bottom+=${window.innerHeight * 1.3} bottom`,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          markers: true,
        },
      });
      /* gsap.set(imgWrapperRef.current, {
        clipPath: `inset(14% 37.35% 14% 37.35% round ${r8}px)`,
        WebkitClipPath: `inset(14% 37.35% 14% 37.35% round ${r8}px)`,
      }); */

      tl.fromTo(imgWrapperRef.current, { clipPath: `inset(14% 37.35% 14% 37.35% round ${r8}px)` }, { clipPath: "inset(-15% -15% -15% -15% round 0px)", ease: "none" }).fromTo(imgRef.current, { scale: 1.2, transformOrigin: "top" }, { scale: 1, ease: "none" }, 0);
    },
    { scope: containerRef },
  );

  return (
    <section className={classes.container} ref={containerRef}>
      <div className={classes.pin} ref={pinRef}>
        <div className={classes.imgWrapper} ref={imgWrapperRef}>
          <Image ref={imgRef} src="/images/team2/team-main.jpeg" alt="" fill sizes="100vw" className={classes.img} priority />
        </div>
      </div>
    </section>
  );
}
