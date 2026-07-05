"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import useParallaxImage from "@/hooks/useParallaxImage";
import rawItems from "@/settings/team";
import classes from "./Team.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Team() {
  const t       = useTranslations("team");
  const wrapRef = useRef(null);

  useParallaxImage(wrapRef, {
    blockSelector: "[data-parallax-block]",
    innerSelector: "[data-parallax-inner]",
    fromScale:    1.12,
    fromYPercent: -8,
    toScale:      1,
    toYPercent:   6,
    start: "top bottom",
    end:   "bottom top",
  });

  const items = rawItems.map((item) => {
    const descCount = Array.isArray(item.desc) ? item.desc.length : 1;
    return {
      ...item,
      title: t(`${item.key}.title`),
      descs: Array.from({ length: descCount }, (_, i) => t(`${item.key}.desc${i}`)),
    };
  });

  return (
    <section className={classes.wrap} ref={wrapRef} aria-labelledby="team-heading">
      <h2 id="team-heading" className={classes.srOnly}>Our Team</h2>

      <div className={classes.list}>
        {items.map((item, idx) => {
          const flip = idx % 2 !== 0;
          return (
            <div
              key={item.key}
              className={`${classes.item} ${flip ? classes.itemFlip : ""}`}
            >
              {/* Text block */}
              <div className={classes.text}>
                <h3 className={classes.title}>{item.title}</h3>
                {item.descs.map((para, i) => (
                  <p key={i} className={classes.desc}>{para}</p>
                ))}
              </div>

              {/* Image block */}
              <div
                className={`${classes.imgWrap} ${item.aspect === "5/4" ? classes.imgWide : ""}`}
                data-parallax-block
              >
                <div className={classes.imgInner} data-parallax-inner>
                  <Image
                    src={item.img}
                    alt={item.alt || ""}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 42vw"
                    className={classes.img}
                    priority={idx === 0}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
