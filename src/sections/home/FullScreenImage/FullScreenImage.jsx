"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import classes from "./FullScreenImage.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function FullScreenImage() {
  const wrapRef = useRef(null);

  useGSAP(
    () => {
      const root = wrapRef.current;
      if (!root) return;

      const inner = root.querySelector("[data-fsi-inner]");
      const img = root.querySelector("img[data-fsi-img]");
      if (!inner || !img) return;

      const scroller = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot") || window;
      const pinType = scroller === window ? "fixed" : "transform";

      const mm = gsap.matchMedia();
      let tl;

      mm.add("(min-width: 992px)", () => {
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            scroller,
            pin: true,
            pinType,
            start: "top top",
            end: () => `+=${window.innerHeight * 1.3}`,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(inner, { clipPath: "inset(14% 37.35% 14% 37.35% round 80px)" }, { clipPath: "inset(-15% -15% -15% -15% round 0px)", ease: "none" }).fromTo(img, { scale: 1.2, transformOrigin: "top" }, { scale: 1, ease: "none" }, 0);

        requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => {
          tl?.scrollTrigger?.kill();
          tl?.kill();
          tl = null;
        };
      });

      return () => mm.revert();
    },
    { scope: wrapRef },
  );

  return (
    <section className={classes.wrap} ref={wrapRef}>
      <div className={classes.inner} data-fsi-inner>
        <Image data-fsi-img src="/images/team2/team-main.jpeg" alt="" fill sizes="100vw" className={classes.img} priority onLoadingComplete={() => ScrollTrigger.refresh()} />
      </div>
    </section>
  );
}
