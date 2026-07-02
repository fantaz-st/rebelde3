"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import classes from "./Loader.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Inline SVG logo — two instances stacked (back + front) for the wipe animation
function LogoSVG({ className }) {
  return (
    <svg className={className} viewBox="0 0 210 100.57" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g id="text">
        <path d="M22.96,98.18h-5.05l-6.1-5.72H8.46v5.72H5V83.03h12.97c2.27,0,3.4,0.98,3.4,2.93v3.55c0,1.47-0.59,2.38-1.76,2.73c-0.45,0.14-1.66,0.21-3.64,0.21L22.96,98.18z M17.97,88.67v-1.82c0-0.51-0.15-0.84-0.44-1c-0.22-0.14-0.6-0.21-1.14-0.21H8.46v4.23h7.92c0.55,0,0.93-0.07,1.14-0.21C17.82,89.51,17.97,89.18,17.97,88.67z"/>
        <path d="M37.69,98.18H24.22V85.76h13.32v2.2H27.27v2.7h5.99v2.14h-5.99v3.05h10.42V98.18z"/>
        <path d="M53.59,95.74c0,1.62-1.28,2.44-3.84,2.44H39.42V85.76h11.15c1.96,0,2.93,0.8,2.93,2.41v1.5c0,1.17-0.7,1.88-2.11,2.11c1.47,0.23,2.2,1.03,2.2,2.38V95.74z M50.54,89.84v-1.17c0-0.59-0.45-0.88-1.35-0.88h-6.78v2.93h6.78C50.09,90.72,50.54,90.43,50.54,89.84z M50.66,94.83v-0.94c0-0.47-0.14-0.78-0.41-0.94c-0.2-0.12-0.55-0.18-1.06-0.18h-6.78v3.17h6.78c0.51,0,0.86-0.06,1.06-0.18C50.52,95.61,50.66,95.3,50.66,94.83z"/>
        <path d="M69.52,98.18H56.06V85.76h13.32v2.2H59.11v2.7h5.99v2.14h-5.99v3.05h10.42V98.18z"/>
        <path d="M84.05,98.18H71.26V85.76h3.05v10.09h9.74V98.18z"/>
        <path d="M100.63,91.93c0,4.17-2.74,6.25-8.22,6.25h-7.6V85.76h8.36c2.21,0,3.96,0.46,5.25,1.38C99.89,88.22,100.63,89.81,100.63,91.93z M97.52,91.78c0-2.52-1.44-3.79-4.31-3.79h-5.34v7.86h3.9c1.86,0,3.2-0.22,4.02-0.65C96.94,94.59,97.52,93.44,97.52,91.78z"/>
        <path d="M116,98.18h-13.47V85.76h13.32v2.2h-10.27v2.7h5.99v2.14h-5.99v3.05H116V98.18z"/>
        <path d="M140.62,95.74c0,1.62-1.28,2.44-3.84,2.44h-10.33V85.76h11.15c1.96,0,2.93,0.8,2.93,2.41v1.5c0,1.17-0.7,1.88-2.11,2.11c1.47,0.23,2.2,1.03,2.2,2.38V95.74z M137.57,89.84v-1.17c0-0.59-0.45-0.88-1.35-0.88h-6.78v2.93h6.78C137.12,90.72,137.57,90.43,137.57,89.84z M137.69,94.83v-0.94c0-0.47-0.14-0.78-0.41-0.94c-0.2-0.12-0.55-0.18-1.06-0.18h-6.78v3.17h6.78c0.51,0,0.86-0.06,1.06-0.18C137.55,95.61,137.69,95.3,137.69,94.83z"/>
        <path d="M158.84,95.24c0,1.17-0.23,1.96-0.7,2.35c-0.47,0.39-1.31,0.59-2.52,0.59h-9.6c-1.21,0-2.05-0.19-2.52-0.57c-0.47-0.38-0.7-1.17-0.7-2.36V88.7c0-1.19,0.23-1.98,0.7-2.36c0.47-0.38,1.31-0.57,2.52-0.57h9.6c1.21,0,2.05,0.19,2.52,0.57c0.47,0.38,0.7,1.17,0.7,2.36V95.24z M155.82,95.8v-7.75h-10.01v7.75H155.82z"/>
        <path d="M177.3,98.18h-3.4l-1.56-2.73h-8.22l-1.56,2.73h-3.02l7.37-12.41h2.9L177.3,98.18z M171.11,93.19l-2.9-5.16l-2.79,5.16H171.11z"/>
        <path d="M189.51,87.99h-6.02v10.18h-3.02V87.99h-5.99v-2.23h15.02V87.99z"/>
        <path d="M205,95.24c0,1.17-0.23,1.96-0.7,2.35c-0.47,0.39-1.31,0.59-2.52,0.59h-8.07c-1.33,0-2.21-0.22-2.63-0.66c-0.42-0.44-0.63-1.32-0.63-2.63l2.7-0.5v1.47h9.13v-2.85h-8.04c-1.21,0-2.04-0.19-2.49-0.56c-0.51-0.41-0.76-1.2-0.76-2.38V88.7c0-1.17,0.25-1.97,0.76-2.38c0.45-0.37,1.28-0.56,2.49-0.56h7.37c1.25,0,2.11,0.2,2.57,0.59c0.46,0.39,0.69,1.19,0.69,2.41l-2.61,0.56v-1.32h-8.54v2.61h8.07c1.21,0,2.05,0.19,2.52,0.57c0.47,0.38,0.7,1.17,0.7,2.36V95.24z"/>
      </g>
      <g id="sign">
        <path d="M103.19,29.1c6.42,4.45,15.78,10.71,34.71,29.66c-2.06,1.18-4.28,2.25-6.65,3.2c-11.02-11.68-45.24-11.64-56.24,0.07c-2.38-0.95-4.61-2.02-6.68-3.18c18.96-19.02,28.32-25.29,34.75-29.74c0.02-0.01,0.04-0.03,0.06-0.04C103.15,29.07,103.17,29.08,103.19,29.1z"/>
        <path d="M149,49.8c-1.78,2.13-3.96,4.14-6.49,5.99c-18.9-17.96-33.14-27.31-38.07-29.28c-0.53-0.21-0.97-0.35-1.3-0.41c0,0,0,0-0.01,0c-0.33,0.05-0.77,0.19-1.3,0.41c-4.93,1.98-19.2,11.35-38.12,29.37c-2.56-1.85-4.75-3.87-6.56-6.01c0.19-0.09,0.37-0.19,0.57-0.28c4.08-2.03,7.66-3.77,11.52-6.24c3.87-2.47,5.7-4.14,4.53-7.19c-0.7-2.54,6.53-4.7,14-8.25c8.15-3.87,11.83-5.51,14.22-5.87c0.4-0.06,0.77-0.08,1.12-0.08h0.04c0.35-0.01,0.72,0.02,1.12,0.08c2.39,0.36,6.08,2,14.23,5.87c7.48,3.55,14.7,5.71,14,8.25c-1.17,3.05,0.67,4.72,4.55,7.19c3.86,2.47,7.45,4.2,11.53,6.24C148.72,49.66,148.86,49.73,149,49.8z"/>
        <path d="M154.85,36.76c-0.28,2.8-1.13,5.57-2.57,8.24c-6.21-1.96-8.92-3.38-11.6-5.3c-1.04-0.74-2.25-1.78-1.9-3.15c0.24-0.96,1.19-1.42,0.04-3.3c-2.09-1.94-1.95-2.23-18.96-9.1c-8.18-3.49-11.8-4.92-16.69-4.92h-0.09c-4.89,0-8.51,1.43-16.69,4.92c-17,6.87-16.86,7.16-18.94,9.1c-1.15,1.88-0.19,2.34,0.05,3.3c0.34,1.38-0.86,2.41-1.9,3.15c-2.7,1.95-5.43,3.37-11.77,5.36c-1.38-2.57-2.24-5.23-2.55-7.92c0.72-2.31,3.5-2.49,6.11-4.32c6.07-5.17,12.25-6.57,21.17-9.65c18.23-6.53,21.52-6.22,24.72-6.24c0.03,0,0.07,0,0.1,0c3.1,0.01,6.82-0.02,24.32,6.24c8.93,3.07,15.1,4.48,21.18,9.65C151.33,34.54,153.96,34.8,154.85,36.76z"/>
        <path d="M153.13,26.33c0.52,1.2,0.93,2.41,1.21,3.62c-0.25-0.1-0.52-0.2-0.79-0.28c-7.04-2.14-13.51-6.12-23.47-8.86c-12.61-3.48-18.94-5.67-25.05-6.06c-0.63-0.04-1.27-0.06-1.91-0.07c-0.65,0-1.28,0.03-1.92,0.07c-6.11,0.4-12.44,2.59-25.04,6.06c-9.95,2.75-16.41,6.72-23.46,8.86c-0.34,0.1-0.67,0.22-0.99,0.37c0.3-1.24,0.71-2.48,1.24-3.71c0.03-0.07,0.06-0.13,0.09-0.2c4.08-2.13,16.06-6.95,24.93-8.81c8.9-1.84,17.9-4.63,24.36-4.85c0.16-0.01,0.32-0.01,0.48-0.01h0.01c0.19,0,0.39,0,0.59,0c0.16,0,0.32,0.01,0.48,0.01c6.47,0.22,15.47,3.01,24.37,4.85c8.73,1.83,20.44,6.52,24.72,8.7C153.04,26.12,153.09,26.22,153.13,26.33z"/>
        <path d="M149,19.74c-6.44-1.88-13.79-3.75-20.79-5.07c-10.13-1.63-14.94-3.97-24.55-4.14c0,0-0.3-0.01-0.49-0.01h-0.05c-0.19,0-0.37,0-0.55,0.01c-9.62,0.16-14.42,2.51-24.54,4.14c-7.08,1.33-14.51,3.23-21,5.13c1.13-1.36,2.41-2.65,3.8-3.86c4.49-1.01,17.82-3.21,28.82-5.51c6.98-1.28,11.13-1.51,12.94-1.53c0.21,0,0.39,0,0.54,0c0.15,0,0.33,0,0.54,0c1.81,0.03,5.96,0.25,12.94,1.53c10.83,2.26,23.93,4.43,28.61,5.46C146.6,17.1,147.87,18.38,149,19.74z"/>
        <path d="M138.92,11.38c-5.44-0.78-13.33-1.91-19.74-2.84c-7.44-1.07-10.47-1.43-15.42-1.59c-0.21-0.01-0.43-0.01-0.65-0.02c-0.22,0.01-0.44,0.01-0.65,0.02c-4.94,0.16-7.97,0.52-15.41,1.59c-6.49,0.94-14.49,2.09-19.94,2.87c1.16-0.7,2.37-1.35,3.62-1.97c2.05-0.62,5.42-1.19,14.05-2.19c7.59-0.99,12.81-1.59,18.33-1.69c5.52,0.1,10.74,0.7,18.33,1.69c8.13,0.94,11.6,1.51,13.69,2.09C136.44,9.97,137.7,10.66,138.92,11.38z"/>
        <path d="M124.33,5.24c-0.69-0.09-1.34-0.16-1.96-0.23c-9.84-1.08-12.88-1.17-18.47-1.23c-0.25,0-0.52-0.01-0.79-0.01c-0.27,0-0.53,0.01-0.79,0.01c-5.59,0.06-8.63,0.15-18.47,1.23c-0.7,0.08-1.44,0.16-2.22,0.26c6.52-1.85,13.8-2.88,21.4-2.88C110.6,2.39,117.84,3.42,124.33,5.24z"/>
      </g>
    </svg>
  );
}

export default function Loader() {
  const wrapRef      = useRef(null);
  const bgMainRef    = useRef(null);
  const bgInnerRef   = useRef(null);
  const curtainRef   = useRef(null);
  const logoRef      = useRef(null);
  const logoFrontRef = useRef(null);
  const logoBackRef  = useRef(null);
  const noiseRef     = useRef(null);

  useGSAP(
    () => {
      const wrap      = wrapRef.current;
      const bgMain    = bgMainRef.current;
      const bgInner   = bgInnerRef.current;
      const curtain   = curtainRef.current;
      const logo      = logoRef.current;
      const logoFront = logoFrontRef.current;
      const logoBack  = logoBackRef.current;
      const noise     = noiseRef.current;

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

      const computeShift = () => (bgInner.getBoundingClientRect().height - window.innerHeight) * -1;

      const play = async () => {
        document.documentElement.classList.add("is-loading");

        await waitImg(curtain);
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

        const SHIFT = computeShift();

        gsap.set(wrap,    { autoAlpha: 1 });
        gsap.set(bgMain,  { autoAlpha: 1, scale: 2, transformOrigin: "50% 50%" });
        gsap.set(bgInner, { y: 0, scale: 1, transformOrigin: "50% 0%" });
        gsap.set(curtain, { scale: 1.5, yPercent: 0, transformOrigin: "50% 50%" });
        gsap.set(logo,    { autoAlpha: 1 });
        // Both layers start slid below the clip container
        gsap.set([logoFront, logoBack], { yPercent: 120 });
        // Front starts fully clipped (left-edge reveal)
        gsap.set(logoFront, { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" });
        gsap.set(noise,   { autoAlpha: 0.28 });

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

        tl.addLabel("in",     0);
        tl.addLabel("prog",   0.65);
        tl.addLabel("reveal", 1.2);

        // 1. Back slides up, then front slides up slightly after
        tl.to([logoFront, logoBack], { yPercent: 0, duration: 0.65, stagger: 0.06, ease: "power3.out" }, "in+=0.05");

        // 2. Front wipes in left→right while bg shrinks away
        tl.to(logoFront, { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)", duration: 1.25, ease: "power2.inOut" }, "prog");
        tl.to(bgMain,    { autoAlpha: 0, scale: 1, duration: 1.25, ease: "power2.inOut" }, "prog");
        tl.to(bgInner,   { scale: 1.05, duration: 1.25, ease: "power2.inOut" }, "prog");

        // 3. Curtain image reveals
        tl.to(bgInner,  { y: SHIFT, scale: 1, duration: 2.2, ease: "power3.inOut" }, "reveal");
        tl.to(curtain,  { scale: 1,  duration: 2.2, ease: "power3.inOut" }, "reveal");

        // 4. Logo exits
        tl.to(logo,  { y: -24, autoAlpha: 0, duration: 0.55, ease: "power2.inOut" }, "prog+=1.05");
        tl.to(noise, { autoAlpha: 0, duration: 0.9, ease: "power1.out" }, "reveal+=1.2");
        tl.to(wrap,  { autoAlpha: 0, duration: 0.35, ease: "power1.out" }, "reveal+=2.05");
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
            <img ref={curtainRef} src="/images/hero/rebelde-boats-hero.webp" alt="" className={classes.curtain} />
          </div>
        </div>
      </div>

      {/* Logo: clip container → back layer + front layer stacked */}
      <div ref={logoRef} className={classes.logo}>
        <div className={classes.logoClip}>
          <div ref={logoBackRef} className={`${classes.logoLayer} ${classes.logoBack}`}>
            <LogoSVG className={classes.logoSvg} />
          </div>
          <div ref={logoFrontRef} className={`${classes.logoLayer} ${classes.logoFront}`}>
            <LogoSVG className={classes.logoSvg} />
          </div>
        </div>
      </div>

      <div ref={noiseRef} className={classes.noise} />
    </div>
  );
}