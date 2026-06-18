"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import classes from "./Hero.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const wrapRef       = useRef(null);
  const backgroundRef = useRef(null);
  const blurRef       = useRef(null);
  const backdropRef   = useRef(null);
  const textRef       = useRef(null);

  useGSAP(
    () => {
      const scroller = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot") || window;
      if (!wrapRef.current) return;

      gsap.set(backgroundRef.current, { scale: 1, transformOrigin: "50% 50%" });
      gsap.set(blurRef.current,       { autoAlpha: 0 });
      gsap.set(backdropRef.current,   { autoAlpha: 0 });
      gsap.set(textRef.current,       { autoAlpha: 1 });

      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger:            wrapRef.current,
            scroller:           scroller === window ? undefined : scroller,
            start:              "top top",
            end:                "+=80%",
            scrub:              true,
            invalidateOnRefresh: true,
          },
        })
        .to(backgroundRef.current, { scale: 1.08 }, 0)
        .to(blurRef.current,       { autoAlpha: 1 }, 0)
        .to(backdropRef.current,   { autoAlpha: 1 }, 0)
        .to(textRef.current,       { autoAlpha: 0 }, 0);
    },
    { scope: wrapRef },
  );

  return (
    <div className={classes.wrap} ref={wrapRef}>
      <section className={classes.hero} data-hero aria-label="Hero — Private Boat Tours from Split">
        <div className={classes.inner}>
          <div ref={backgroundRef} className={classes.bg}>
            <div className={classes.bgItem}>
              <Image
                className={classes.img}
                fill
                priority
                alt="Felix 37 Buenaventura speedboat cruising the Adriatic sea near Split, Croatia"
                sizes="100vw"
                src="/images/tall-hero-felix 37.png"
              />
            </div>

            <div ref={blurRef} className={classes.blur} aria-hidden="true">
              <Image
                className={classes.img}
                fill
                alt=""
                sizes="1px"
                src="/images/tall-hero-felix 37.png"
              />
            </div>

            <div ref={backdropRef} className={classes.backdrop} aria-hidden="true" />
          </div>

          <div className={classes.main}>
            <div className={`container grid ${classes.grid}`}>
              <div ref={textRef} className={classes.text} data-hero-content>
                <h1 className={classes.title}>Private Boat Tours from Split</h1>
                <p className={classes.subtitle}>
                  Discover the Adriatic through private experiences crafted around you.
                </p>
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
