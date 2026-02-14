"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import classes from "./Team.module.css";
import items from "@/settings/team";
import useParallaxImage from "@/hooks/useParallaxImage";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Team() {
  const wrapRef = useRef(null);

  useParallaxImage(wrapRef, {
    blockSelector: "[data-parallax-block]",
    innerSelector: "[data-parallax-inner]",
    fromScale: 1.4,
    fromYPercent: -20,
    toScale: 1,
    toYPercent: 12,
    start: "top bottom",
    end: "bottom top",
  });

  useGSAP(
    () => {
      const root = wrapRef.current;
      if (!root) return;

      const thumb = root.querySelector("[data-team-thumb]");
      const inner = root.querySelector("[data-team-thumb-inner]");
      const img = root.querySelector("img[data-team-thumb-img]");
      if (!thumb || !inner || !img) return;

      const scrollerEl = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot");
      const scroller = scrollerEl || window;
      const scrollerOpt = scroller === window ? undefined : scroller;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 992px)", () => {
        gsap.set(inner, { willChange: "clip-path" });

        const fs = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
        const r8 = (8 / 10) * fs;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: thumb,
            scroller: scrollerOpt,
            start: "top bottom",
            end: () => `bottom+=${window.innerHeight * 1.3} bottom`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(inner, { clipPath: `inset(14% 37.35% 14% 37.35% round ${r8}px)` }, { clipPath: "inset(-15% -15% -15% -15% round 0px)", ease: "none" }).fromTo(img, { scale: 1.2, transformOrigin: "top" }, { scale: 1, ease: "none" }, 0);

        requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      mm.add("(max-width: 991px)", () => {
        gsap.set(inner, { clipPath: "inset(0% 0% 0% 0% round 0px)", willChange: "transform" });
        gsap.set(img, { willChange: "transform" });

        const st = gsap.fromTo(
          img,
          { scale: 1.4, yPercent: -20, transformOrigin: "center" },
          {
            scale: 1,
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: thumb,
              scroller: scrollerOpt,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );

        requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => {
          st.scrollTrigger?.kill();
          st.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: wrapRef }
  );

  return (
    <div className={classes.wrap} ref={wrapRef}>
      <div className={classes.blockEmpty} aria-hidden="true" />

      <section className={classes.team}>
        <div className={`grid ${classes.list}`}>
          <div className={classes.items}>
            {items.map((item) => (
              <article className={classes.item} key={item.key}>
                <div className={classes.media} data-parallax-block>
                  <div className={classes.mediaInner} data-parallax-inner>
                    <Image src={item.img} alt={item.alt || ""} fill sizes="(max-width: 991px) 100vw, 50vw" className={classes.img} priority />
                  </div>
                </div>

                <div className={classes.text}>
                  <h4 className={classes.title}>{item.title}</h4>
                  <p className={classes.desc}>{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className={`full-width ${classes.thumb}`} data-team-thumb>
          <div className={classes.thumbInner} data-team-thumb-inner>
            <Image data-team-thumb-img src="/images/team/team-main.jpeg" alt="" fill sizes="100vw" className={classes.thumbImg} priority onLoad={() => ScrollTrigger.refresh()} />
          </div>
        </div>
      </section>
    </div>
  );
}
