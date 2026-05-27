"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Button from "@/components/Button/Button";
import useParallaxImage from "@/hooks/useParallaxImage";
import classes from "./Expeditions.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ExpeditionItem({ item, index, isLast }) {
  const rootRef = useRef(null);
  const thumbRef = useRef(null);
  const thumbInnerRef = useRef(null);
  const thumbTxtRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Parallax on all secondary images
  useParallaxImage(rootRef, {
    blockSelector: "[data-parallax-block]",
    innerSelector: "[data-parallax-inner]",
    fromScale: 1.2,
    fromYPercent: -10,
    toScale: 1,
    toYPercent: 8,
    start: "top bottom",
    end: "bottom top",
  });

  // Sticky thumb reveal: clip-path inset opens up + title scales up as the
  // hero image scrolls into view. Same pattern as FullScreenImage but tied
  // to the thumb's own viewport entry.
  useGSAP(
    () => {
      const root = rootRef.current;
      const thumb = thumbRef.current;
      const inner = thumbInnerRef.current;
      const txt = thumbTxtRef.current;
      if (!root || !thumb || !inner || !txt) return;

      const scrollerEl = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot");
      const scroller = scrollerEl || window;
      const scrollerOpt = scroller === window ? undefined : scroller;

      const fs = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const r12 = (12 / 10) * fs;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.set(inner, { willChange: "clip-path" });

        const tl = gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: thumb,
              scroller: scrollerOpt,
              start: "top bottom",
              end: "bottom bottom",
              scrub: true,
              invalidateOnRefresh: true,
            },
          })
          .fromTo(
            inner,
            { clipPath: `inset(14% 37.35% 14% 37.35% round ${r12}px)` },
            { clipPath: "inset(0% 0% 0% 0% round 0px)" },
            0,
          )
          .fromTo(txt, { scale: 0.6, transformOrigin: "top" }, { scale: 1, transformOrigin: "top" }, 0.1);

        requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      mm.add("(max-width: 767px)", () => {
        gsap.set(inner, { clearProps: "clipPath" });
        gsap.set(txt, { clearProps: "scale,transformOrigin" });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section className={classes.item} ref={rootRef}>
      <div id={item.key} className={classes.sc}>
        {/* Full-bleed sticky hero thumb */}
        <div className={classes.thumbStick}>
          <div className={classes.thumb} ref={thumbRef} data-parallax-block>
            <div className={classes.thumbInner} ref={thumbInnerRef} data-parallax-inner>
              <Image
                src={item.thumb}
                alt=""
                fill
                sizes="100vw"
                className={classes.thumbImg}
                priority={index === 0}
              />
            </div>
            <div className={classes.thumbTxt} ref={thumbTxtRef}>
              <h2 className={classes.thumbHeading}>{item.label}</h2>
            </div>
          </div>
        </div>

        {/* Content grid */}
        <div className={classes.content}>
          <div className={`container grid ${classes.grid}`}>
            <div className={classes.sub}>
              <h4 className={classes.subHeading}>{item.intro}</h4>
            </div>

            <div className={classes.mainImg} data-parallax-block>
              <div className={classes.mainImgInner} data-parallax-inner>
                <Image
                  src={item.mainImg}
                  alt=""
                  fill
                  sizes="(max-width: 991px) 100vw, 40vw"
                  className={classes.img}
                />
              </div>
            </div>

            <div className={classes.subImg} data-parallax-block>
              <div className={classes.subImgInner} data-parallax-inner>
                <Image
                  src={item.subImg}
                  alt=""
                  fill
                  sizes="(max-width: 991px) 100vw, 32vw"
                  className={classes.img}
                />
              </div>
            </div>

            <div className={classes.cta}>
              <div className={classes.ctaImg} data-parallax-block>
                <div className={classes.ctaImgInner} data-parallax-inner>
                  <Image
                    src={item.ctaImg}
                    alt=""
                    fill
                    sizes="(max-width: 991px) 100vw, 50vw"
                    className={classes.img}
                  />
                </div>
              </div>
              <div className={classes.ctaContent}>
                <p className={classes.ctaText}>{item.ctaText}</p>
                <Button href="/contact" variant="primary" size="lg">
                  Check Availability
                </Button>
              </div>
            </div>

            <div className={classes.explore}>
              <div className={classes.exploreControl}>
                <button
                  ref={prevRef}
                  type="button"
                  className={`${classes.exploreControlItem} ${classes.prev}`}
                  aria-label="Previous"
                >
                  <svg viewBox="0 0 18 18" fill="none">
                    <path
                      d="M7.875 3.938 2.813 9l5.062 5.063M15.188 9H3.5"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="square"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  ref={nextRef}
                  type="button"
                  className={`${classes.exploreControlItem} ${classes.next}`}
                  aria-label="Next"
                >
                  <svg viewBox="0 0 18 18" fill="none">
                    <path
                      d="M11 3.938 16.063 9 11 14.063M15.188 9H3.5"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="square"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <div className={classes.exploreMain}>
                <Swiper
                  modules={[Navigation]}
                  slidesPerView="auto"
                  spaceBetween={20}
                  speed={450}
                  navigation={{
                    prevEl: null,
                    nextEl: null,
                    disabledClass: classes.disabled,
                  }}
                  onBeforeInit={(swiper) => {
                    if (typeof swiper.params.navigation !== "boolean") {
                      swiper.params.navigation.prevEl = prevRef.current;
                      swiper.params.navigation.nextEl = nextRef.current;
                    }
                  }}
                  onInit={(swiper) => {
                    if (typeof swiper.params.navigation !== "boolean") {
                      swiper.params.navigation.prevEl = prevRef.current;
                      swiper.params.navigation.nextEl = nextRef.current;
                      swiper.navigation.destroy();
                      swiper.navigation.init();
                      swiper.navigation.update();
                    }
                  }}
                  className={classes.exploreSwiper}
                  breakpoints={{
                    768: { spaceBetween: 20 },
                    320: { spaceBetween: 16 },
                  }}
                >
                  {item.gallery.map((g, i) => (
                    <SwiperSlide key={i} className={classes.exploreSlide}>
                      <div className={classes.exploreItemImg}>
                        <Image src={g.src} alt={g.caption} fill sizes="(max-width: 767px) 80vw, 30vw" className={classes.img} />
                      </div>
                      <div className={classes.exploreItemTxt}>{g.caption}</div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!isLast && <div className={classes.itemSpacer} aria-hidden="true" />}
    </section>
  );
}
