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
  const imgWrapRef = useRef(null);
  const blurRef = useRef(null);
  const backdropRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      gsap.set(imgWrapRef.current, { scale: 1 });
      gsap.set(blurRef.current, { autoAlpha: 0 });
      gsap.set(textRef.current, { autoAlpha: 1 });
      gsap.set(backdropRef.current, { autoAlpha: 0 });

      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top top",
            end: () => "+=" + window.innerHeight * 1.2,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .to(imgWrapRef.current, { scale: 1.08 }, 0)
        .to(blurRef.current, { autoAlpha: 1 }, 0)
        .to(backdropRef.current, { autoAlpha: 1 }, 0)
        .to(textRef.current, { autoAlpha: 0 }, 0);
    },
    { scope: wrapRef }
  );

  return (
    <div ref={wrapRef} className={classes.homeHeroWrap}>
      <section className={classes.homeHero}>
        <div className={classes.homeHeroInner}>
          <div className={classes.homeHeroBg}>
            <div className={classes.homeHeroBgItem}>
              <div ref={imgWrapRef} className={classes.homeHeroBgItemInner}>
                <Image className={classes.heroImg} fill loading="eager" alt="" sizes="(max-width: 3840px) 100vw, 3840px" src="/images/hero-1.jpg" priority />
                <div ref={blurRef} className={classes.homeHeroBgBlurLayer} aria-hidden="true">
                  <Image className={classes.heroImg} fill loading="eager" alt="" sizes="(max-width: 3840px) 100vw, 3840px" src="/images/hero-1.jpg" priority />
                </div>
              </div>
            </div>

            <div className={classes.homeHeroBgOverlay}>
              <div className={classes.homeHeroBgOverlayTop} />
              <div className={classes.homeHeroCloneBgOverlayInner}>
                <div className={classes.homeHeroCloneBgOverlay} />
              </div>
            </div>

            <div ref={backdropRef} className={classes.homeHeroBackdrop} />
          </div>

          <div className={classes.homeHeroMain}>
            <div className={`container grid ${classes.fullH}`}>
              <div ref={textRef} className={classes.homeHeroText}>
                <div className={classes.homeHeroTitle}>
                  <h1>Your Private Adriatic Escape</h1>
                </div>
                <div className={classes.homeHeroDesc}>
                  <h4>Set your own rhythm aboard Felix 37 — private day trips and charters from Split to Hvar, Vis, the Blue Cave, and hidden bays</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.homeHomeInnerEmptyBlock} />
      </section>

      <div className={classes.homeHomeEmptyBlock} />
    </div>
  );
}
