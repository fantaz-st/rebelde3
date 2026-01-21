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
      const wrap = wrapRef.current;
      if (!wrap) return;

      const thumb = wrap.querySelector("[data-thumb='1']");
      const inner = wrap.querySelector("[data-thumb-inner='1']");
      const img = wrap.querySelector("img[data-thumb-img='1']");
      if (!thumb || !inner || !img) return;

      const scroller = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot") || window;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 992px)", () => {
        gsap.set(inner, { clipPath: "inset(14% 37.35% 14% 37.35% round 8rem)" });
        gsap.set(img, { scale: 1.2, transformOrigin: "top" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: thumb,
            scroller,
            start: "top bottom",
            end: () => `bottom+=${window.innerHeight * 1.3} bottom`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        tl.to(inner, { clipPath: "inset(-15% -15% -15% -15% round 0rem)", ease: "none" }).to(img, { scale: 1, ease: "none" }, "<");

        ScrollTrigger.refresh();

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: wrapRef },
  );

  return (
    <>
      <div className={classes.tall}></div>

      <section className={classes.wrap} ref={wrapRef}>
        <div className={classes.sticky}>
          <div className={classes.container} data-thumb="1">
            <div className={classes.inner} data-thumb-inner="1">
              <Image data-thumb-img="1" src="/images/team2/team-main.jpeg" alt="" fill sizes="100vw" className={classes.img} priority onLoadingComplete={() => ScrollTrigger.refresh()} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
/* useParallaxImage(wrapRef, {
    blockSelector: "[data-parallax-block]",
    innerSelector: "[data-parallax-inner]",
    fromScale: 1.15,
    fromYPercent: -10,
    toScale: 1,
    toYPercent: 20,
  }); */
