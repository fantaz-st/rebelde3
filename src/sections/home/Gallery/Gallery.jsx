"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import items from "@/components/settings/gallery";
import classes from "./Gallery.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Gallery() {
  const wrapRef = useRef(null);
  const stageRef = useRef(null);

  const textInnerRef = useRef(null);
  const textItemRefs = useRef([]);

  const startItemRefs = useRef([]);
  const endItemRefs = useRef([]);
  const stickRef = useRef(null);

  useGSAP(
    () => {
      const scrollerEl = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot");
      const scroller = scrollerEl || window;

      const stick = stickRef.current;
      const stage = stageRef.current;
      const textInner = textInnerRef.current;
      const textItems = textItemRefs.current.filter(Boolean);

      if (!stick || !stage || !textInner || textItems.length === 0) return;

      gsap.set(textItems, { autoAlpha: 0 });

      const tlShowText = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stick,
          scroller: scroller === window ? undefined : scroller,
          start: "top top",
          end: () => `+=${stage.offsetHeight}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      textItems.forEach((el, i) => {
        const isLast = i === textItems.length - 1;

        tlShowText.fromTo(el, { autoAlpha: 0, y: "3rem", scale: 1.04 }, { autoAlpha: 1, y: "0rem", scale: 1, duration: 1 }, i * 2);

        if (!isLast) {
          tlShowText.to(el, { autoAlpha: 0, y: "-3rem", scale: 0.96, duration: 1 }, i * 2 + 1);
        }
      });

      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stage,
            scroller: scroller === window ? undefined : scroller,
            start: "bottom-=1.5vh 50%",
            end: "bottom-=1vh 50%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .fromTo(textInner, { autoAlpha: 1, scale: 1 }, { autoAlpha: 0, scale: 0.96, duration: 1 });
    },
    { scope: wrapRef }
  );

  return (
    <section className={classes.wrap} ref={wrapRef}>
      <div className={classes.emptyTop} />

      <div className={classes.stick} ref={stickRef}>
        <div className={classes.stickInner}>
          <div className={classes.textInner} ref={textInnerRef}>
            <div className={classes.textItem} ref={(el) => (textItemRefs.current[0] = el)}>
              <h3 className={classes.heading}>We craft experiences where the sea is a companion, not a destination.</h3>
            </div>
            <div className={classes.textItem} ref={(el) => (textItemRefs.current[1] = el)}>
              <h3 className={classes.heading}>Every journey is personal. Every wave, a new memory.</h3>
            </div>
          </div>
        </div>
      </div>

      <div className={classes.main}>
        <section className={classes.gallery}>
          <div className={classes.stage} ref={stageRef}>
            <div className={classes.startCol}>
              {items.map((it, i) => (
                <div key={it.id} ref={(el) => (startItemRefs.current[i] = el)} className={`${classes.item} ${classes.startItem}`}>
                  <div className={classes.itemInner}>
                    <img src={it.src} alt={it.alt || ""} className={classes.img} />
                  </div>
                </div>
              ))}
            </div>

            <div className={classes.endCol}>
              <div className={classes.endList}>
                {items.map((it, i) => (
                  <div key={`${it.id}-end`} ref={(el) => (endItemRefs.current[i] = el)} className={`${classes.item} ${classes.endItem}`}>
                    <div className={classes.itemInner}>
                      <img src={it.src} alt={it.alt || ""} className={classes.img} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className={classes.emptyBottom} />
    </section>
  );
}
