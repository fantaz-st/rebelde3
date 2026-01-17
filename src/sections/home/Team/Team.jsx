"use client";

import Image from "next/image";
import { useRef } from "react";
import classes from "./Team.module.css";
import items from "@/settings/team";
import useRevealPinImages from "@/hooks/useRevealPinImages";
import useParallaxImage from "@/hooks/useParallaxImage";

export default function Team() {
  const wrapRef = useRef(null);

  useParallaxImage(wrapRef, {
    blockSelector: "[data-parallax-block]",
    innerSelector: "[data-parallax-inner]",
    fromScale: 1.15,
    fromYPercent: -10,
    toScale: 1,
    toYPercent: 20,
  });

  useRevealPinImages(wrapRef, {
    revealStart: "top bottom",
    revealEnd: "top top",
    pinStart: "top top",
    pinDistanceVH: 1.3,
    mobileMax: 767,
  });

  return (
    <div className={classes.wrap} ref={wrapRef}>
      <div className={classes.blockEmpty} aria-hidden="true" />

      <section className={classes.team}>
        <div className={classes.list}>
          <article className={classes.item}>
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

          <article className={classes.item}>
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

          <article className={classes.item}>
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
        </div>

        <div className={classes.thumb}>
          <div className={classes.thumbInner} data-reveal-pin="1">
            <Image data-reveal-pin-inner="1" src="/images/team2/team-main.jpeg" alt="" fill sizes="100vw" className={classes.thumbImg} />
          </div>
        </div>
      </section>
    </div>
  );
}
