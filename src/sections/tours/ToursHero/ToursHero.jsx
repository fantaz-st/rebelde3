"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import classes from "./ToursHero.module.css";
import items from "@/settings/tours";
import useParallaxImage from "@/hooks/useParallaxImage";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Hero for the /tours index.
 *
 * The list used to be `#anchor` links that smooth-scrolled to sections on the
 * same page. Each tour has its own page now, so these are real links —
 * crawlable, shareable, and locale-aware.
 */
export default function ToursHero() {
  const t = useTranslations("toursIndex");
  const ti = useTranslations("tourItems");
  const wrapRef = useRef(null);

  useParallaxImage(wrapRef, {
    blockSelector: "[data-parallax-block]",
    innerSelector: "[data-parallax-inner]",
    fromScale: 1.25, fromYPercent: -14,
    toScale: 1,      toYPercent: 10,
    start: "top bottom", end: "bottom top",
  });

  return (
    <section className={classes.wrap} ref={wrapRef}>
      <div className={`container grid ${classes.grid}`}>
        <div className={classes.content}>
          <h1 className={classes.title}>{t("title")}</h1>
          <p className={classes.desc}>{t("desc")}</p>

          <ul className={classes.list}>
            {items.map((item) => (
              <li key={item.key} className={classes.listItem}>
                <Link href={`/tours/${item.key}`} className={classes.link}>
                  <span className={classes.flip}>
                    <span className={classes.flipTop}>{ti(`${item.key}.label`)}</span>
                    <span className={classes.flipBottom}>{ti(`${item.key}.label`)}</span>
                  </span>
                </Link>
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
