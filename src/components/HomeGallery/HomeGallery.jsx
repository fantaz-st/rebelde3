"use client";

import { useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import classes from "./HomeGallery.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HomeGallery() {
  const wrapRef = useRef(null);
  const stickRef = useRef(null);
  const stageRef = useRef(null);
  const startColRef = useRef(null);
  const h1Ref = useRef(null);
  const h2Ref = useRef(null);
  const mainRef = useRef(null);

  const startItemRefs = useRef([]);
  const endItemRefs = useRef([]);

  const items = useMemo(
    () => [
      { id: "g1", src: "/images/gallery/gallery-1.jpg", alt: "" },
      { id: "g2", src: "/images/gallery/gallery-2.jpg", alt: "" },
      { id: "g3", src: "/images/gallery/gallery-3.jpg", alt: "" },
      { id: "g4", src: "/images/gallery/gallery-4.jpg", alt: "" },
      { id: "g5", src: "/images/gallery/gallery-5.jpg", alt: "" },
    ],
    []
  );

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const stick = stickRef.current;
      const stage = stageRef.current;
      const startCol = startColRef.current;
      const main = mainRef.current;

      if (!wrap || !stick || !stage || !startCol || !main) return;

      const killById = (id) => ScrollTrigger.getById(id)?.kill(true);

      const applyOverlap = () => {
        gsap.set(main, { marginTop: "-300vh" });
      };

      const measurePairs = () =>
        items
          .map((_, i) => {
            const startEl = startItemRefs.current[i];
            const endEl = endItemRefs.current[i];
            if (!startEl || !endEl) return null;

            const a = startEl.getBoundingClientRect();
            const b = endEl.getBoundingClientRect();

            const ax = a.left + a.width / 2;
            const ay = a.top + a.height / 2;
            const bx = b.left + b.width / 2;
            const by = b.top + b.height / 2;

            return {
              startEl,
              x: bx - ax,
              y: by - ay,
              sx: b.width / a.width,
              sy: b.height / a.height,
            };
          })
          .filter(Boolean);

      const buildText = () => {
        killById("gallery-text");

        gsap.set([h1Ref.current, h2Ref.current], { autoAlpha: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            id: "gallery-text",
            trigger: wrap,
            start: "top top",
            end: "+=300%",
            scrub: true,
            pin: stick,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 2,
          },
        });

        tl.to(h1Ref.current, { autoAlpha: 1, duration: 0.12 }, 0.08)
          .to(h1Ref.current, { autoAlpha: 1, duration: 0.28 }, 0.2)
          .to(h1Ref.current, { autoAlpha: 0, duration: 0.12 }, 0.48)
          .to({}, { duration: 0.12 }, 0.6)
          .to(h2Ref.current, { autoAlpha: 1, duration: 0.12 }, 0.72)
          .to(h2Ref.current, { autoAlpha: 1, duration: 0.28 }, 0.84)
          .to(h2Ref.current, { autoAlpha: 0, duration: 0.12 }, 1.15);

        return tl;
      };

      const buildImages = () => {
        killById("gallery-images");

        const pairs = measurePairs();

        pairs.forEach(({ startEl }, i) => {
          gsap.set(startEl, {
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            transformOrigin: "50% 50%",
            zIndex: i,
          });
        });

        gsap.set(startCol, { y: 0, autoAlpha: 1 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            id: "gallery-images",
            trigger: main,
            start: "20% 60%",
            end: "+=20%",
            scrub: true,
            invalidateOnRefresh: true,
            refreshPriority: 1,
          },
        });

        pairs.forEach(({ startEl, x, y, sx, sy }) => {
          tl.to(startEl, { x, y, scaleX: sx, scaleY: sy, rotation: 0, duration: 1 }, 0);
        });

        return tl;
      };

      const rebuild = () => {
        applyOverlap();
        buildText();
        buildImages();
      };

      rebuild();

      const onRefreshInit = () => rebuild();
      ScrollTrigger.addEventListener("refreshInit", onRefreshInit);
      ScrollTrigger.refresh();

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", onRefreshInit);
        killById("gallery-text");
        killById("gallery-images");
      };
    },
    { scope: wrapRef, dependencies: [items] }
  );

  return (
    <section id="home-gallery" ref={wrapRef} className={classes.wrap}>
      <div className={`container ${classes.shell}`}>
        <div ref={stickRef} className={classes.stick}>
          <div className={classes.headingStack}>
            <h3 ref={h1Ref} className={classes.heading}>
              We craft experiences where the sea is a companion, not a destination.
            </h3>
            <h3 ref={h2Ref} className={classes.heading}>
              Every journey is personal. Every wave, a new memory.
            </h3>
          </div>
        </div>

        <div ref={mainRef} className={classes.main}>
          <div ref={stageRef} className={classes.stage}>
            <div ref={startColRef} className={`${classes.col} ${classes.start}`}>
              <div className={classes.list}>
                {items.map((it, i) => (
                  <div key={it.id} ref={(el) => (startItemRefs.current[i] = el)} className={`${classes.item} ${classes.startItem}`}>
                    <div className={classes.inner}>
                      <img src={it.src} alt={it.alt} className={classes.img} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${classes.col} ${classes.end} ${classes.measureOnly}`} aria-hidden="true">
              <div className={classes.list}>
                {items.map((it, i) => (
                  <div key={`${it.id}-end`} ref={(el) => (endItemRefs.current[i] = el)} className={`${classes.item} ${classes.endItem}`}>
                    <div className={classes.inner}>
                      <img src={it.src} alt="" className={classes.img} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
