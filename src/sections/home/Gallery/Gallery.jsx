"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import items from "@/settings/gallery";
import classes from "./Gallery.module.css";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Gallery() {
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

      /* textItems.forEach((el, i) => {
        const isLast = i === textItems.length - 1;

        tlShowText.fromTo(el, { autoAlpha: 0, y: "3rem", scale: 1.04 }, { autoAlpha: 1, y: "0rem", scale: 1, duration: 1 }, i * 2);

        if (!isLast) {
          tlShowText.to(el, { autoAlpha: 0, y: "-3rem", scale: 0.96, duration: 1 }, i * 2 + 1);
        }
      }); */
      textItems.forEach((el, i) => {
        const inAt = i * 2;
        const outAt = i * 2 + 1;

        tlShowText.fromTo(el, { autoAlpha: 0, y: "3rem", scale: 1.04 }, { autoAlpha: 1, y: "0rem", scale: 1, duration: 1 }, inAt);
        tlShowText.to(el, { autoAlpha: 0, y: "-3rem", scale: 0.96, duration: 1 }, outAt);
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
        const getScrollTop = () => {
          if (scroller === window) return window.scrollY || document.documentElement.scrollTop || 0;
          return scroller.scrollTop || 0;
        };

        const getViewportTopLeft = () => {
          if (scroller === window) return { left: 0, top: 0 };
          const r = scroller.getBoundingClientRect();
          return { left: r.left, top: r.top };
        };

        const computeDelta = (fromEl, toEl) => {
          const scrollTop = getScrollTop();
          const vp = getViewportTopLeft();

          const a = fromEl.getBoundingClientRect();
          const b = toEl.getBoundingClientRect();

          const ax = a.left - vp.left + a.width / 2 + (scroller === window ? scrollTop * 0 : scrollTop * 0);
          const ay = a.top - vp.top + a.height / 2;

          const bx = b.left - vp.left + b.width / 2;
          const by = b.top - vp.top + b.height / 2;

          return { x: bx - ax, y: by - ay };
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
            start: "top bottom",
            end: "top 50%",
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
    <section className={classes.wrap} ref={wrapRef}>
      <div className={classes.emptyTop} />

      <div className={classes.stick} ref={stickRef}>
        <div className={classes.stickInner}>
          <div className="container">
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
      </div>

      <div className={classes.main}>
        <section className={classes.gallery}>
          <div className={classes.stage} ref={stageRef}>
            <div className={classes.startCol}>
              {items.map((it, i) => (
                <div key={it.id} ref={(el) => (startItemRefs.current[i] = el)} className={`${classes.item} ${classes.start}`}>
                  <div className={classes.itemInner}>
                    <Image src={it.src} alt={it.alt || ""} className={classes.img} fill />
                  </div>
                </div>
              ))}
            </div>

            <div className={classes.endCol}>
              <div className={`grid ${classes.endList}`}>
                {items.map((it, i) => (
                  <div key={`${it.id}-end`} ref={(el) => (endItemRefs.current[i] = el)} className={`${classes.item} ${classes.end}`}>
                    <div className={classes.itemInner}>
                      <Image src={it.src} alt={it.alt || ""} className={classes.img} fill />
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
