"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import classes from "./Loader.module.css";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Loader() {
  const wrapRef = useRef(null);
  const innerRef = useRef(null);

  const logoRef = useRef(null);
  const logoFrontRef = useRef(null);
  const logoBackRef = useRef(null);

  const bgMainRef = useRef(null);
  const bgInnerRef = useRef(null);
  const noiseRef = useRef(null);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const inner = innerRef.current;

      const logo = logoRef.current;
      const logoFront = logoFrontRef.current;
      const logoBack = logoBackRef.current;

      const bgMain = bgMainRef.current;
      const bgInner = bgInnerRef.current;
      const noise = noiseRef.current;

      if (!wrap || !inner || !logo || !logoFront || !logoBack || !bgMain || !bgInner || !noise) return;

      const debug = typeof window !== "undefined" && window.__RBD_LOADER_DEBUG__ === true;
      //   const isLoaded = sessionStorage.getItem("isLoaded") === "true";
      const isLoaded = false;
      if (!debug && isLoaded) {
        wrap.remove();
        return;
      }

      gsap.set(wrap, { autoAlpha: 1 });
      gsap.set([logoFront, logoBack], { yPercent: 100 });
      gsap.set(logo, { autoAlpha: 1, yPercent: 0, scale: 1 });
      gsap.set(bgMain, { scale: 2, autoAlpha: 1 });
      gsap.set(bgInner, { y: 0, scale: 1 /*  filter: "brightness(120%)" */ });
      gsap.set(noise, { autoAlpha: 0.3 });

      gsap.set(logoFront, { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" });

      const tlFirst = gsap.timeline({ paused: true, defaults: { ease: "none" } });
      tlFirst.to([logoFront, logoBack], { yPercent: 0, duration: 0.5, stagger: 0.05, ease: "power1.inOut" });

      const tlProg = gsap.timeline({ paused: true, defaults: { ease: "none" } });
      tlProg.to(logoFront, { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }).to(bgMain, { autoAlpha: 0, scale: 1 }, 0).to(bgInner, { scale: 1.5 }, 0);

      const tlLoadDone = gsap.timeline({ paused: true });
      tlLoadDone.to(logo, { scale: 0.7, yPercent: -300, autoAlpha: 0, duration: 0.5 }, 0);

      const computeBgShift = () => {
        const h = bgInner.getBoundingClientRect().height;
        const vh = window.innerHeight;
        return (h - vh) * -1;
      };

      tlLoadDone.to(bgInner, { y: computeBgShift(), scale: 1, duration: 2.2 }, 0).to(noise, { autoAlpha: 0, duration: 1 }, 0).to(wrap, { autoAlpha: 0 });

      const tlLoading = gsap.timeline({ paused: true });
      tlLoading
        .to(tlFirst, { duration: tlFirst.totalDuration(), progress: 1, ease: "none" })
        .to(tlProg, { duration: tlProg.totalDuration() * 3.5, progress: 1, ease: "circ.in" })
        .to(tlLoadDone, { duration: tlLoadDone.totalDuration(), progress: 1, ease: "power2.inOut" }, ">=-.2");

      const tlMaster = gsap.timeline({
        paused: true,
        onComplete: () => {
          sessionStorage.setItem("isLoaded", "true");
          wrap.remove();
          ScrollTrigger.refresh(true);
        },
      });

      tlMaster.to(tlLoading, { duration: tlLoading.totalDuration(), progress: 1, ease: "none" });

      tlMaster.play(0);
    },
    { scope: wrapRef },
  );

  return (
    <div ref={wrapRef} className={classes.loader} aria-hidden="true">
      <div ref={innerRef} className={classes.loaderInner}>
        <div ref={logoRef} className={classes.loaderLogo}>
          <div ref={logoFrontRef} className={classes.loaderLogoFront}>
            <span className={classes.logoText}>REBELDE BOATS</span>
          </div>
          <div ref={logoBackRef} className={classes.loaderLogoBack}>
            <span className={classes.logoText}>REBELDE BOATS</span>
          </div>
        </div>
      </div>

      <div ref={noiseRef} className={classes.loaderNoise} />

      <div className={classes.loaderBg}>
        <div ref={bgMainRef} className={classes.loaderBgMain} />
        <div ref={bgInnerRef} className={classes.loaderBgInner}>
          <div className={classes.loaderBgHero}>
            <Image src="/images/blu.png" alt="" width={1920} height={2600} priority className={classes.curtain} sizes="100vw" />
          </div>
        </div>
      </div>
    </div>
  );
}
