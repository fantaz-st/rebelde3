"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import classes from "./ToursHero.module.css";
import items from "@/settings/tours";
import useParallaxImage from "@/hooks/useParallaxImage";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ToursHero() {
  const t  = useTranslations("toursHero");
  const ti = useTranslations("tourItems");
  const wrapRef = useRef(null);

  useParallaxImage(wrapRef, {
    blockSelector: "[data-parallax-block]",
    innerSelector: "[data-parallax-inner]",
    fromScale: 1.25, fromYPercent: -14,
    toScale: 1,      toYPercent: 10,
    start: "top bottom", end: "bottom top",
  });

  const handleAnchorClick = (e, key) => {
    e.preventDefault();
    const target = document.getElementById(key);
    if (!target) return;
    const scroller = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot");
    if (scroller && scroller !== window) {
      const targetTop = target.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop;
      scroller.scrollTo({ top: targetTop, behavior: "smooth" });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className={classes.wrap} ref={wrapRef}>
      <div className={`container grid ${classes.grid}`}>
        <div className={classes.content}>
          <h2 className={classes.title}>{t("title")}</h2>
          <p className={classes.desc}>{t("desc")}</p>

          <ul className={classes.list}>
            {items.map((item) => (
              <li key={item.key} className={classes.listItem}>
                <a
                  href={`#${item.key}`}
                  className={classes.link}
                  onClick={(e) => handleAnchorClick(e, item.key)}
                >
                  <span className={classes.flip}>
                    <span className={classes.flipTop}>{ti(`${item.key}.label`)}</span>
                    <span className={classes.flipBottom}>{ti(`${item.key}.label`)}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={classes.mediaSmall} data-parallax-block>
          <div className={classes.mediaInner} data-parallax-inner>
            <Image src="/images/tours/tour-small.jpg" alt="" fill sizes="(max-width: 991px) 60vw, 22vw" className={classes.img} priority />
          </div>
        </div>

        <div className={classes.mediaLarge} data-parallax-block>
          <div className={classes.mediaInner} data-parallax-inner>
            <Image src="/images/tours/tour-large.jpg" alt="" fill sizes="(max-width: 991px) 100vw, 36vw" className={classes.img} priority />
          </div>
        </div>
      </div>
    </section>
  );
}
