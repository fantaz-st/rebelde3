"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import classes from "./Team.module.css";
import rawItems from "@/settings/team";
import useParallaxImage from "@/hooks/useParallaxImage";
import SectionContentGrid from "@/components/SectionList/SectionContentGrid";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Pair items: [0,1], [2,3], [4,5] ...
function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function Team() {
  const t       = useTranslations("team");
  const wrapRef = useRef(null);

  useParallaxImage(wrapRef, {
    blockSelector: "[data-parallax-block]",
    innerSelector: "[data-parallax-inner]",
    fromScale:    1.15,
    fromYPercent: -10,
    toScale:      1,
    toYPercent:   8,
    start: "top bottom",
    end:   "bottom top",
  });

  // Translate items
  const items = rawItems.map((item) => {
    const descCount = Array.isArray(item.desc) ? item.desc.length : 1;
    return {
      ...item,
      title: t(`${item.key}.title`),
      descs: Array.from({ length: descCount }, (_, i) => t(`${item.key}.desc${i}`)),
    };
  });

  const pairs = chunk(items, 2);

  return (
    <section className={classes.wrap} ref={wrapRef} aria-labelledby="team-heading">
      <h2 id="team-heading" className={classes.srOnly}>Our Team</h2>

      {pairs.map(([a, b], pairIdx) => (
        <div key={a.key} className={classes.pair}>
          <SectionContentGrid
            imgLarge={a.img}
            imgLargeAlt={a.alt}
            imgSmall={b.img}
            imgSmallAlt={b.alt}
            paddingTop={pairIdx === 0 ? "12rem" : "16rem"}
            priority={pairIdx === 0}
            subText={b.descs[0]}
          >
            {/* Left column — item A: title + all paragraphs */}
            <div className={classes.textBlock}>
              <h3 className={classes.title}>{a.title}</h3>
              {a.descs.map((para, i) => (
                <p key={i} className={classes.desc}>{para}</p>
              ))}
            </div>
          </SectionContentGrid>
        </div>
      ))}
    </section>
  );
}
