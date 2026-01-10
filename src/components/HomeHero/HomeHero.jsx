"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import classes from "./HomeHero.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HomeHero() {
  const wrapRef = useRef(null);
  const stickRef = useRef(null);
  const backgroundRef = useRef(null);
  const blurRef = useRef(null);
  const backdropRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      gsap.set(backgroundRef.current, { scale: 1 });
      gsap.set(blurRef.current, { autoAlpha: 0 });
      gsap.set(backdropRef.current, { autoAlpha: 0 });
      gsap.set(textRef.current, { autoAlpha: 1 });

      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: wrapRef.current,
            scroller: document.querySelector(".scrollRoot"),
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .to(backgroundRef.current, { scale: 1.08 }, 0)
        .to(blurRef.current, { autoAlpha: 1 }, 0)
        .to(backdropRef.current, { autoAlpha: 1 }, 0)
        .to(textRef.current, { autoAlpha: 0 }, 0);
    },
    { scope: wrapRef }
  );

  return (
    <section ref={wrapRef} className={classes.wrap}>
      <div ref={stickRef} className={classes.stick}>
        <div ref={backgroundRef} className={classes.background}>
          <Image className={classes.img} fill priority alt="" sizes="100vw" src="/images/hero-1.jpg" />

          <div ref={blurRef} className={classes.blur} aria-hidden="true">
            <Image className={classes.img} fill priority alt="" sizes="100vw" src="/images/hero-1.jpg" />
          </div>

          <div ref={backdropRef} className={classes.backdrop} aria-hidden="true" />
        </div>

        <div ref={textRef} className={classes.text}>
          <h1 className={classes.title}>Your Private Adriatic Escape</h1>
          <h4 className={classes.subtitle}>Set your own rhythm aboard Felix 37 — private day trips and charters from Split to Hvar, Vis, the Blue Cave, and hidden bays</h4>
        </div>
      </div>
    </section>
  );
}
