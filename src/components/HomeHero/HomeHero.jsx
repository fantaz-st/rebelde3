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
  const backgroundRef = useRef(null);
  const blurRef = useRef(null);
  const backdropRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      ScrollTrigger.config({
        ignoreMobileResize: true,
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      });

      const setVh = () => {
        const h = window.visualViewport?.height ?? window.innerHeight;
        document.documentElement.style.setProperty("--vh", `${h * 0.01}px`);
      };

      setVh();

      const vv = window.visualViewport;
      vv?.addEventListener("resize", setVh);
      vv?.addEventListener("scroll", setVh);
      window.addEventListener("orientationchange", setVh);

      gsap.set(backgroundRef.current, { scale: 1, transformOrigin: "50% 50%" });
      gsap.set(blurRef.current, { autoAlpha: 0 });
      gsap.set(backdropRef.current, { autoAlpha: 0 });
      gsap.set(textRef.current, { autoAlpha: 1 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: () => `+=${wrapRef.current?.offsetHeight || window.innerHeight}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      tl.to(backgroundRef.current, { scale: 1.08 }, 0).to(blurRef.current, { autoAlpha: 1 }, 0).to(backdropRef.current, { autoAlpha: 1 }, 0).to(textRef.current, { autoAlpha: 0 }, 0);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        vv?.removeEventListener("resize", setVh);
        vv?.removeEventListener("scroll", setVh);
        window.removeEventListener("orientationchange", setVh);
      };
    },
    { scope: wrapRef }
  );

  return (
    <section ref={wrapRef} className={classes.container}>
      <div ref={backgroundRef} className={classes.background}>
        <Image className={classes.img} fill priority loading="eager" alt="" sizes="100vw" src="/images/hero-1.jpg" />

        <div ref={blurRef} className={classes.blur} aria-hidden="true">
          <Image className={classes.img} fill priority loading="eager" alt="" sizes="100vw" src="/images/hero-1.jpg" />
        </div>

        <div ref={backdropRef} className={classes.backdrop} aria-hidden="true" />
      </div>

      <div ref={textRef} className={classes.text}>
        <h1 className={classes.title}>Your Private Adriatic Escape</h1>
        <h4 className={classes.subtitle}>Set your own rhythm aboard Felix 37 — private day trips and charters from Split to Hvar, Vis, the Blue Cave, and hidden bays</h4>
      </div>
    </section>
  );
}
