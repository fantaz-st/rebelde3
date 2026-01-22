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

      const scroller = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot") || window;

      const mm = gsap.matchMedia();
      let tl;

      mm.add("(min-width: 992px)", () => {
        const fs = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
        const r8 = (8 / 10) * fs;

        tl = gsap.timeline({
          scrollTrigger: {
            scroller,
            trigger: thumb,
            start: "top bottom",
            end: () => `bottom+=${window.innerHeight * 1.3} bottom`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(inner, { clipPath: `inset(14% 37.35% 14% 37.35% round ${r8}px)` }, { clipPath: "inset(-15% -15% -15% -15% round 0px)", ease: "none" }).fromTo(img, { scale: 1.2, transformOrigin: "top" }, { scale: 1, ease: "none" }, 0);

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
    <div className={classes.wrap} ref={wrapRef}>
      <div className={classes.blockEmpty} aria-hidden="true" />

      <section className={classes.team}>
        <div className={classes.list}>
          <article className={`container ${classes.item}`}>
            <div className={`grid ${classes.gridInner}`}>
              <div className={`${classes.media} ${classes.item1ImgA}`} data-parallax-block>
                <div className={classes.mediaInner} data-parallax-inner>
                  <Image src={items[0].img1} alt={items[0].alt || ""} width={1600} height={1200} sizes="(max-width: 991px) 100vw, 50vw" className={classes.img} priority />
                </div>
              </div>

              <div className={`${classes.text} ${classes.item1Text}`}>
                <h3 className={classes.title}>{items[0].title}</h3>
                <p className={classes.desc}>{items[0].desc}</p>
              </div>

              <div className={`${classes.media} ${classes.item1ImgB} ${classes.haveMargin}`} data-parallax-block>
                <div className={classes.mediaInner} data-parallax-inner>
                  <Image src={items[0].img2} alt={items[0].alt || ""} width={1600} height={1200} sizes="(max-width: 991px) 100vw, 60vw" className={classes.img} />
                </div>
              </div>
            </div>
          </article>

          <article className={`container ${classes.item}`}>
            <div className={`grid ${classes.gridInner}`}>
              <div className={`${classes.media} ${classes.item2Img}`} data-parallax-block>
                <div className={classes.mediaInner} data-parallax-inner>
                  <Image src={items[1].img} alt={items[1].alt || ""} width={1600} height={1200} sizes="(max-width: 991px) 100vw, 50vw" className={classes.img} />
                </div>
              </div>

              <div className={`${classes.text} ${classes.item2Text}`}>
                <h3 className={classes.title}>{items[1].title}</h3>
                <p className={classes.desc}>{items[1].desc}</p>
              </div>
            </div>
          </article>

          <article className={`container ${classes.item}`}>
            <div className={`grid ${classes.gridInner}`}>
              <div className={`${classes.media} ${classes.item3Img}`} data-parallax-block>
                <div className={classes.mediaInner} data-parallax-inner>
                  <Image src={items[2].img} alt={items[2].alt || ""} width={1600} height={1200} sizes="(max-width: 991px) 100vw, 50vw" className={classes.img} />
                </div>
              </div>

              <div className={`${classes.text} ${classes.item3Text}`}>
                <h3 className={classes.title}>{items[2].title}</h3>
                <p className={classes.desc}>{items[2].desc}</p>
              </div>
            </div>
          </article>

          <div className={`full width ${classes.thumb}`} data-team-thumb>
            <div className={classes.thumbInner} data-team-thumb-inner>
              <Image data-team-thumb-img src="/images/team2/team-main.jpeg" alt="" fill sizes="100vw" className={classes.thumbImg} priority onLoadingComplete={() => ScrollTrigger.refresh()} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
