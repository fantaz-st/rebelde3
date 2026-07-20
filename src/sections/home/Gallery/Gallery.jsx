"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import items from "@/settings/gallery";
import classes from "./Gallery.module.css";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Gallery() {
  const t = useTranslations("gallery");

  const wrapRef = useRef(null);
  const stageRef = useRef(null);
  const stickRef = useRef(null);
  const textInnerRef = useRef(null);
  const textItemRefs = useRef([]);
  const startItemRefs = useRef([]);
  const endItemRefs = useRef([]);

  useGSAP(
    () => {
      const scrollerEl = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot");
      const scroller = scrollerEl || window;
      const scrollerOpt = scroller === window ? undefined : scroller;

      const stick = stickRef.current;
      const stage = stageRef.current;
      const textInner = textInnerRef.current;

      const textItems = textItemRefs.current.filter(Boolean);
      const startItems = startItemRefs.current.filter(Boolean);
      const endItems = endItemRefs.current.filter(Boolean);

      if (!stick || !stage || !textInner) return;

      gsap.set(textItems, { autoAlpha: 0 });

      const tlShowText = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stick,
          scroller: scrollerOpt,
          start: "top top",
          end: () => `+=${stage.offsetHeight}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      textItems.forEach((el, i) => {
        tlShowText
          .fromTo(el, { autoAlpha: 0, y: "3rem", scale: 1.04 }, { autoAlpha: 1, y: "0rem", scale: 1, duration: 1 }, i * 2)
          .to(el, { autoAlpha: 0, y: "-3rem", scale: 0.96, duration: 1 }, i * 2 + 1);
      });

      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stage,
            scroller: scrollerOpt,
            start: "bottom-=1.5vh 50%",
            end: "bottom-=1vh 50%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .fromTo(textInner, { autoAlpha: 1, scale: 1 }, { autoAlpha: 0, scale: 0.96, duration: 1 });

      if (startItems.length && endItems.length && startItems.length === endItems.length) {
        const computeDelta = (fromEl, toEl) => {
          const vpLeft = scroller === window ? 0 : scroller.getBoundingClientRect().left;
          const vpTop = scroller === window ? 0 : scroller.getBoundingClientRect().top;
          const a = fromEl.getBoundingClientRect();
          const b = toEl.getBoundingClientRect();
          return {
            x: b.left - vpLeft + b.width / 2 - (a.left - vpLeft + a.width / 2),
            y: b.top - vpTop + b.height / 2 - (a.top - vpTop + a.height / 2),
          };
        };

        const setImageFlip = () => {
          startItems.forEach((el, i) => {
            gsap.set(el, { clearProps: "x,y,rotation" });
            gsap.set(el, { zIndex: i });
          });
        };

        setImageFlip();

        const tlImages = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stage,
            scroller: scrollerOpt,
            start: "top 90%",
            end: "top 20%",
            scrub: true,
            invalidateOnRefresh: true,
            onRefresh: () => setImageFlip(),
          },
        });

        startItems.forEach((startEl, i) => {
          const endEl = endItems[i];
          const dir = (i + 1) % 2 === 0 ? 1 : -1;
          const first = {
            x: gsap.utils.random(10, 20) * dir,
            y: 0,
            rotation: gsap.utils.random(5, 10) * dir,
          };

          tlImages.fromTo(startEl, first, { x: () => computeDelta(startEl, endEl).x, y: () => computeDelta(startEl, endEl).y, rotation: 0 }, "<+=0.015");

          const img = startEl.querySelector("img");
          const inner = startEl.querySelector(`.${classes.itemInner}`) || startEl.querySelector(":scope > div");
          const randY = gsap.utils.random(0, 20);

          if (img) {
            gsap.to(img, {
              scrollTrigger: {
                trigger: startEl,
                scroller: scrollerOpt,
                start: "top 90%",
                end: "top top",
                scrub: true,
                invalidateOnRefresh: true,
              },
              yPercent: randY,
              ease: "none",
            });
          }

          if (inner) {
            gsap.to(inner, {
              scrollTrigger: {
                trigger: startEl,
                scroller: scrollerOpt,
                start: "top bottom+=10%",
                end: "top top",
                scrub: true,
                invalidateOnRefresh: true,
              },
              yPercent: -randY,
              scale: 1,
              ease: "none",
            });
          }
        });
      }
    },
    { scope: wrapRef },
  );

  return (
    <section className={classes.wrap} ref={wrapRef} aria-label="Adriatic tour photo gallery">
      <div className={classes.emptyTop} />

      <div className={classes.stick} ref={stickRef}>
        <div className={classes.stickInner}>
          <div className="container">
            <div className={classes.textInner} ref={textInnerRef}>
              <div className={classes.textItem} ref={(el) => (textItemRefs.current[0] = el)}>
                <h2 className={classes.heading}>{t("slide1")}</h2>
              </div>
              <div className={classes.textItem} ref={(el) => (textItemRefs.current[1] = el)}>
                <h2 className={classes.heading}>{t("slide2")}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={classes.main}>
        <div className={classes.gallery} role="list" aria-label="Gallery of Adriatic boat tour photos">
          <div className={classes.stage} ref={stageRef}>
            <div className={classes.startCol}>
              {items.map((it, i) => (
                <div key={it.id} ref={(el) => (startItemRefs.current[i] = el)} className={`${classes.item} ${classes.start}`} role="listitem">
                  <div className={classes.itemInner}>
                    <Image src={it.src} alt={it.alt} className={classes.img} fill priority={i === 0} sizes="(max-width: 767px) 50vw, 30vw" />
                  </div>
                </div>
              ))}
            </div>

            <div className={classes.endCol}>
              <div className={`grid ${classes.endList}`}>
                {items.map((it, i) => (
                  <div key={`${it.id}-end`} ref={(el) => (endItemRefs.current[i] = el)} className={`${classes.item} ${classes.end}`} aria-hidden="true">
                    <div className={classes.itemInner}>
                      <Image src={it.src} alt="" className={classes.img} fill sizes="(max-width: 767px) 50vw, 30vw" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={classes.emptyBottom} />
    </section>
  );
}
