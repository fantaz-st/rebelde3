"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import useParallaxImage from "@/hooks/useParallaxImage";
import classes from "./Boat.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function BoatSection({ section, index }) {
  const rootRef       = useRef(null);
  const thumbRef      = useRef(null);
  const thumbInnerRef = useRef(null);
  const thumbTxtRef   = useRef(null);
  const prevRef       = useRef(null);
  const nextRef       = useRef(null);
  const galleryRef    = useRef(null);

  useParallaxImage(rootRef, {
    blockSelector: "[data-parallax-block]",
    innerSelector: "[data-parallax-inner]",
    fromScale: 1.15, fromYPercent: -8,
    toScale: 1,      toYPercent:  8,
    start: "top bottom", end: "bottom top",
  });

  useGSAP(() => {
    const inner = thumbInnerRef.current;
    const thumb = thumbRef.current;
    if (!inner || !thumb) return;

    const scroller    = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot") || window;
    const scrollerOpt = scroller === window ? undefined : scroller;
    const r = (12 / 10) * (parseFloat(getComputedStyle(document.documentElement).fontSize) || 16);

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      gsap.set(inner, { willChange: "clip-path" });
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: thumb, scroller: scrollerOpt,
          start: "top bottom", end: "bottom bottom",
          scrub: true, invalidateOnRefresh: true,
        },
      })
        .fromTo(inner,
          { clipPath: `inset(14% 37.35% 14% 37.35% round ${r}px)` },
          { clipPath: "inset(0% 0% 0% 0% round 0px)" }, 0);

      if (thumbTxtRef.current) {
        tl.fromTo(thumbTxtRef.current,
          { scale: 0.6, transformOrigin: "top" },
          { scale: 1,   transformOrigin: "top" }, 0.1);
      }
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => { tl.scrollTrigger?.kill(); tl.kill(); };
    });
    mm.add("(max-width: 767px)", () => {
      gsap.set(inner, { clearProps: "clipPath,willChange" });
    });
    return () => mm.revert();
  }, { scope: rootRef });

  useEffect(() => {
    const el = galleryRef.current;
    if (!el || !section.gallery?.length) return;
    const group = `boat-${section.key}`;
    Fancybox.bind(el, `[data-fancybox="${group}"]`, {
      Thumbs: { type: "modern" },
      Toolbar: { display: { left: ["infobar"], middle: [], right: ["slideshow", "thumbs", "close"] } },
    });
    return () => { Fancybox.unbind(el); Fancybox.close(); };
  }, [section.key]);

  const group = `boat-${section.key}`;

  return (
    <section className={classes.section} ref={rootRef} id={section.key}>

      {/* THUMB — full viewport width, no container */}
      <div className={classes.thumbStick}>
        <div className={classes.thumb} ref={thumbRef}>
          <div className={classes.thumbInner} ref={thumbInnerRef}>
            <Image
              src={section.thumb}
              alt={section.label}
              fill sizes="100vw"
              className={classes.thumbImg}
              priority={index === 0}
            />
          </div>
          <div className={classes.thumbTxt} ref={thumbTxtRef}>
            <h2 className={classes.thumbHeading}>{section.label}</h2>
          </div>
        </div>
      </div>

      {/* CONTENT — 16-col container grid
          Children placed via CSS grid-area (no inline styles needed)
          DOM order matches the visual reading order */}
      <div className={`container grid ${classes.sectionContent}`}>

        {/* 1. leftWrap → grid-area: 1/5/2/9 */}
        <div className={classes.leftWrap}>
          <div className={classes.textBlock}>
            <h3 className={classes.sectionTitle}>{section.label}</h3>
            <p className={classes.sectionSub}>{section.intro}</p>
          </div>
        </div>

        {/* 2. subImg → grid-area: 2/5/3/9 */}
        {section.subImg && (
          <div className={classes.subImg} data-parallax-block>
            <div className={classes.subImgInner} data-parallax-inner>
              <Image
                src={section.subImg} alt=""
                fill sizes="(max-width:767px) 50vw, (max-width:991px) 35vw, 25vw"
                className={classes.img}
              />
            </div>
          </div>
        )}

        {/* 3+4. rightWrap → grid-area: 1/11/2/-3 (flex column: mainImg then sub-text)
             matches original: mainImg is INSIDE rightWrap as first flex child */}
        {(section.mainImg || section.subText) && (
          <div className={classes.rightWrap}>
            {section.mainImg && (
              <div className={classes.mainImg} data-parallax-block>
                <div className={classes.mainImgInner} data-parallax-inner>
                  <Image
                    src={section.mainImg} alt=""
                    fill sizes="(max-width:767px) 40vw, (max-width:991px) 45vw, 28vw"
                    className={classes.img}
                  />
                </div>
              </div>
            )}
            {section.subText && (
              <div className={classes.textBlock}>
                <p className={classes.sectionSub}>{section.subText}</p>
              </div>
            )}
          </div>
        )}

        {/* 5. cta → grid-area: 3/5/4/-4 */}
        {(section.ctaImg || section.ctaText) && (
          <div className={classes.cta}>
            {section.ctaImg && (
              <div className={classes.ctaImg} data-parallax-block>
                <div className={classes.ctaImgInner} data-parallax-inner>
                  <Image
                    src={section.ctaImg} alt=""
                    fill sizes="(max-width:767px) 100vw, (max-width:991px) 45vw, 44vw"
                    className={classes.img}
                  />
                </div>
              </div>
            )}
            {section.ctaText && (
              <div className={classes.ctaContent}>
                <p className={classes.ctaText}>{section.ctaText}</p>
              </div>
            )}
          </div>
        )}

        {/* 6. explore → grid-area: 4/5/5/-2 */}
        {section.gallery?.length > 0 && (
          <div className={classes.explore}>
            <div className={classes.exploreControl}>
              <button ref={prevRef} type="button" className={classes.exploreBtn} aria-label="Previous">
                <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M7.875 3.938 2.813 9l5.062 5.063M15.188 9H3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" strokeLinejoin="round"/>
                </svg>
              </button>
              <button ref={nextRef} type="button" className={classes.exploreBtn} aria-label="Next">
                <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M11 3.938 16.063 9 11 14.063M15.188 9H3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            <div className={classes.exploreMain} ref={galleryRef}>
              <Swiper
                modules={[Navigation]}
                slidesPerView="auto"
                spaceBetween={20}
                speed={450}
                navigation={{
                  prevEl: null, nextEl: null,
                  disabledClass: classes.swiperDisabled,
                }}
                onBeforeInit={(s) => {
                  if (typeof s.params.navigation !== "boolean") {
                    s.params.navigation.prevEl = prevRef.current;
                    s.params.navigation.nextEl = nextRef.current;
                  }
                }}
                onInit={(s) => {
                  if (typeof s.params.navigation !== "boolean") {
                    s.params.navigation.prevEl = prevRef.current;
                    s.params.navigation.nextEl = nextRef.current;
                    s.navigation.destroy();
                    s.navigation.init();
                    s.navigation.update();
                  }
                }}
                className={classes.exploreSwiper}
              >
                {section.gallery.map((g, i) => (
                  <SwiperSlide key={i} className={classes.exploreSlide}>
                    <a
                      href={g.src}
                      data-fancybox={group}
                      data-caption={g.caption}
                      className={classes.exploreLink}
                      aria-label={g.caption}
                    >
                      <div className={classes.exploreItemImg}>
                        <Image
                          src={g.src} alt={g.caption}
                          fill sizes="(max-width:767px) 60vw, 30vw"
                          className={classes.img}
                        />
                      </div>
                      <p className={classes.exploreCaption}>{g.caption}</p>
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
