"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import classes from "./Hero.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const wrapRef = useRef(null);
  const backgroundRef = useRef(null);
  const blurRef = useRef(null);
  const backdropRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      const scroller = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot") || window;

      if (!wrapRef.current) return;

      gsap.set(backgroundRef.current, { scale: 1, transformOrigin: "50% 50%" });
      gsap.set(blurRef.current, { autoAlpha: 0 });
      gsap.set(backdropRef.current, { autoAlpha: 0 });
      gsap.set(textRef.current, { autoAlpha: 1 });

      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: wrapRef.current,
            scroller: scroller === window ? undefined : scroller,
            start: "top top",
            end: "+=80%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .to(backgroundRef.current, { scale: 1.08 }, 0)
        .to(blurRef.current, { autoAlpha: 1 }, 0)
        .to(backdropRef.current, { autoAlpha: 1 }, 0)
        .to(textRef.current, { autoAlpha: 0 }, 0);
    },
    { scope: wrapRef },
  );

  return (
    <div className={classes.wrap} ref={wrapRef}>
      <section className={classes.hero}>
        <div className={classes.inner}>
          <div ref={backgroundRef} className={classes.bg}>
            <div className={classes.bgItem}>
              <Image className={classes.img} fill priority alt="" sizes="100vw" src="/images/hero-main.jpg" />
            </div>

            <div ref={blurRef} className={classes.blur} aria-hidden="true">
              <Image className={classes.img} fill priority alt="" sizes="100vw" src="/images/hero-main.jpg" />
            </div>

            <div ref={backdropRef} className={classes.backdrop} aria-hidden="true" />
          </div>

          <div className={classes.main}>
            <div className={`container grid ${classes.grid}`}>
              <div ref={textRef} className={classes.text}>
                <h1 className={classes.title}>Your Private Adriatic Escape</h1>
                <h4 className={classes.subtitle}>Set your own rhythm aboard Felix 37 – private day trips and charters from Split to Hvar, Vis, the Blue Cave, and hidden bays</h4>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.innerEmptyBlock} />
      </section>

      <div className={classes.outerEmptyBlock} />
    </div>
  );
}
