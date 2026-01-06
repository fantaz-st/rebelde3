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

      if (!wrap || !stick || !stage || !startCol) return;

      const killById = (id) => {
        const t = ScrollTrigger.getById(id);
        if (t) t.kill(true);
      };

      const measurePairs = () => {
        return items
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
      };

      const build = () => {
        killById("gallery-master");

        gsap.set([h1Ref.current, h2Ref.current], { autoAlpha: 0 });

        gsap.set(startCol, { y: 0, autoAlpha: 1 });

        startItemRefs.current.forEach((el) => {
          if (!el) return;
          gsap.set(el, { x: 0, y: 0, scaleX: 1, scaleY: 1, transformOrigin: "50% 50%" });
        });

        const pairs = measurePairs();

        gsap.set(startCol, { y: window.innerHeight * 0.55, autoAlpha: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            id: "gallery-master",
            trigger: wrap,
            start: "top top",
            end: "+=200%",
            scrub: true,
            pin: stick,
            pinSpacing: false,
            invalidateOnRefresh: true,
            refreshPriority: 2,
          },
        });

        tl.to(startCol, { y: 0, autoAlpha: 1, duration: 0.18 }, 0);

        pairs.forEach(({ startEl, x, y, sx, sy }) => {
          tl.to(startEl, { x, y, scaleX: sx, scaleY: sy, duration: 1 }, 0.08);
        });

        tl.to(h1Ref.current, { autoAlpha: 1, duration: 0.12 }, 0.08)
          .to(h1Ref.current, { autoAlpha: 1, duration: 0.28 }, 0.2)
          .to(h1Ref.current, { autoAlpha: 0, duration: 0.12 }, 0.48)
          .to(h2Ref.current, { autoAlpha: 1, duration: 0.12 }, 0.72)
          .to(h2Ref.current, { autoAlpha: 1, duration: 0.28 }, 0.84)
          .to(h2Ref.current, { autoAlpha: 0, duration: 0.12 }, 1.15);

        return tl;
      };

      const tl = build();

      const onRefreshInit = () => build();
      ScrollTrigger.addEventListener("refreshInit", onRefreshInit);
      ScrollTrigger.refresh();

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", onRefreshInit);
        killById("gallery-master");
      };
    },
    { scope: wrapRef, dependencies: [items] }
  );

  return (
    <div ref={wrapRef} className={classes.homeGalleryWrap}>
      <section className={classes.homeGallery}>
        <div className={`container ${classes.galleryShell}`}>
          <div ref={stickRef} className={classes.homeGalleryStick}>
            <div className={classes.homeGalleryText}>
              <div className={classes.headingStack}>
                <h3 ref={h1Ref} className={classes.heading}>
                  where curated adventures await those who’ve seen it all, done it all, and still crave more.
                </h3>

                <h3 ref={h2Ref} className={classes.heading}>
                  Encounters with nature, wildlife, and local culture shape each journey, making no two days ever the same.
                </h3>
              </div>
            </div>
          </div>

          <div className={classes.homeGalleryMain}>
            <div ref={stageRef} className={classes.galleryStage}>
              <div ref={startColRef} className={`${classes.homeGalleryMainCol} ${classes.start}`}>
                <div className={classes.homeGalleryList}>
                  {items.map((it, i) => (
                    <div key={it.id} ref={(el) => (startItemRefs.current[i] = el)} className={`${classes.homeGalleryItem} ${classes.startItem}`}>
                      <div className={classes.homeGalleryItemImg}>
                        <div className={classes.homeGalleryItemImgInner}>
                          <img src={it.src} alt={it.alt} className={classes.galleryImg} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`${classes.homeGalleryMainCol} ${classes.end} ${classes.measureOnly}`} aria-hidden="true">
                <div className={classes.homeGalleryList}>
                  {items.map((it, i) => (
                    <div key={`${it.id}-end`} ref={(el) => (endItemRefs.current[i] = el)} className={`${classes.homeGalleryItem} ${classes.endItem}`}>
                      <div className={classes.homeGalleryItemImg}>
                        <div className={classes.homeGalleryItemImgInner}>
                          <img src={it.src} alt="" className={classes.galleryImg} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={classes.gallerySpacer} />
        </div>
      </section>
    </div>
  );
}
