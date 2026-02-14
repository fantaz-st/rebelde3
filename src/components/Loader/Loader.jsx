"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import classes from "./Loader.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Loader() {
  const wrapRef = useRef(null);

  const bgMainRef = useRef(null);
  const bgInnerRef = useRef(null);
  const curtainRef = useRef(null);

  const logoRef = useRef(null);
  const logoFrontRef = useRef(null);
  const logoBackRef = useRef(null);

  const noiseRef = useRef(null);

  useGSAP(
    () => {
      const wrap = wrapRef.current;

      const bgMain = bgMainRef.current;
      const bgInner = bgInnerRef.current;
      const curtain = curtainRef.current;

      const logo = logoRef.current;
      const logoFront = logoFrontRef.current;
      const logoBack = logoBackRef.current;

      const noise = noiseRef.current;

      if (!wrap || !bgMain || !bgInner || !curtain || !logo || !logoFront || !logoBack || !noise) return;

      if (wrap.dataset.playing === "1") return;
      wrap.dataset.playing = "1";

      const waitImg = (img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((res) => {
              img.addEventListener("load", res, { once: true });
              img.addEventListener("error", res, { once: true });
            });

      const computeShift = () => {
        const h = bgInner.getBoundingClientRect().height;
        const vh = window.innerHeight;
        return (h - vh) * -1;
      };

      const play = async () => {
        document.documentElement.classList.add("is-loading");

        await waitImg(curtain);
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

        const SHIFT = computeShift();

        gsap.set(wrap, { autoAlpha: 1 });
        gsap.set(bgMain, { autoAlpha: 1, scale: 2, transformOrigin: "50% 50%" });
        gsap.set(bgInner, { y: 0, scale: 1, transformOrigin: "50% 0%" });
        gsap.set(curtain, { scale: 1.5, yPercent: 0, transformOrigin: "50% 50%" });

        gsap.set(logo, { autoAlpha: 1 });
        gsap.set([logoFront, logoBack], { yPercent: 120 });
        gsap.set(logoFront, { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" });

        gsap.set(noise, { autoAlpha: 0.28 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          onComplete: () => {
            document.documentElement.classList.remove("is-loading");
            wrap.dataset.playing = "0";
            wrap.remove();
            ScrollTrigger.refresh(true);
          },
        });

        if (window.__RBD_SLOW__) tl.timeScale(0.25);

        tl.addLabel("in", 0);
        tl.addLabel("prog", 0.65);
        tl.addLabel("reveal", 1.2);

        tl.to([logoFront, logoBack], { yPercent: 0, duration: 0.65, stagger: 0.06, ease: "power3.out" }, "in+=0.05");

        tl.to(bgMain, { autoAlpha: 0, scale: 1, duration: 1.25, ease: "power2.inOut" }, "prog");
        tl.to(logoFront, { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)", duration: 1.25, ease: "power2.inOut" }, "prog");
        tl.to(bgInner, { scale: 1.05, duration: 1.25, ease: "power2.inOut" }, "prog");

        tl.to(bgInner, { y: SHIFT, scale: 1, duration: 2.2, ease: "power3.inOut" }, "reveal");
        tl.to(curtain, { scale: 1, duration: 2.2, ease: "power3.inOut" }, "reveal");

        tl.to(logo, { y: -24, autoAlpha: 0, duration: 0.55, ease: "power2.inOut" }, "prog+=1.05");
        tl.to(noise, { autoAlpha: 0, duration: 0.9, ease: "power1.out" }, "reveal+=1.2");
        tl.to(wrap, { autoAlpha: 0, duration: 0.35, ease: "power1.out" }, "reveal+=2.05");
      };

      play();
    },
    { scope: wrapRef }
  );

  return (
    <div ref={wrapRef} className={classes.loader} aria-hidden="true" data-loader>
      <div className={classes.bg}>
        <div ref={bgMainRef} className={classes.bgMain} />

        <div ref={bgInnerRef} className={classes.bgInner}>
          <div className={classes.top} />
          <div className={classes.bot}>
            <img ref={curtainRef} src="/images/hero-tall2.png" alt="" className={classes.curtain} />
          </div>
        </div>
      </div>

      <div ref={logoRef} className={classes.logo}>
        <div className={classes.logoClip}>
          <div ref={logoBackRef} className={`${classes.logoLayer} ${classes.logoBack}`}>
            <span className={classes.logoText}>REBELDE BOATS</span>
          </div>
          <div ref={logoFrontRef} className={classes.logoLayer}>
            <span className={classes.logoText}>REBELDE BOATS</span>
          </div>
        </div>
      </div>

      <div ref={noiseRef} className={classes.noise} />
    </div>
  );
}
