"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Button from "@/components/Button/Button";
import useParallaxImage from "@/hooks/useParallaxImage";
import SectionContentGrid from "./SectionContentGrid";
import classes from "./SectionItem.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function SectionItem({ item, index, isLast, ctaLabel = "Check Availability" }) {
  const rootRef    = useRef(null);
  const heroRef    = useRef(null);
  const heroImgRef = useRef(null);
  const heroTxtRef = useRef(null);
  const prevRef    = useRef(null);
  const nextRef    = useRef(null);
  const galleryRef = useRef(null);

  const galleryGroup = `gallery-${item.key}`;

  useParallaxImage(rootRef, {
    blockSelector: "[data-parallax-block]",
    innerSelector: "[data-parallax-inner]",
    fromScale: 1.15, fromYPercent: -10,
    toScale: 1,      toYPercent: 8,
    start: "top bottom", end: "bottom top",
  });

  useGSAP(
    () => {
      const hero    = heroRef.current;
      const heroImg = heroImgRef.current;
      const heroTxt = heroTxtRef.current;
      if (!hero || !heroImg || !heroTxt) return;

      const scroller = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot") || window;
      const fs  = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const r12 = (12 / 10) * fs;
      const mm  = gsap.matchMedia();

      const buildReveal = (hInset, vInset, scaleFrom, start, end) => {
        gsap.set(heroImg, { willChange: "clip-path" });
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: hero, scroller, start, end, scrub: true, invalidateOnRefresh: true },
        })
          .fromTo(heroImg,
            { clipPath: `inset(${vInset}% ${hInset}% ${vInset}% ${hInset}% round ${r12}px)` },
            { clipPath: "inset(0% 0% 0% 0% round 0px)" }
          )
          .fromTo(heroTxt, { scale: scaleFrom, transformOrigin: "center" }, { scale: 1 }, 0);
        requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => { tl.scrollTrigger?.kill(); tl.kill(); };
      };

      mm.add("(min-width: 768px)", () => buildReveal(37.35, 14, 0.6, "top bottom+=200%", "bottom bottom"));
      mm.add("(max-width: 767px)", () => buildReveal(12, 25, 0.75, "top 90%", "top 40%"));
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  useEffect(() => {
    const container = galleryRef.current;
    if (!container) return;
    Fancybox.bind(container, `[data-fancybox="${galleryGroup}"]`, {
      Thumbs: { type: "modern" }, Carousel: { infinite: true },
    });
    return () => { Fancybox.unbind(container); Fancybox.close(); };
  }, [item.key, galleryGroup]);

  const wireSwiperNav = (swiper) => {
    if (typeof swiper.params.navigation === "boolean") return;
    swiper.params.navigation.prevEl = prevRef.current;
    swiper.params.navigation.nextEl = nextRef.current;
    swiper.navigation.destroy();
    swiper.navigation.init();
    swiper.navigation.update();
  };

  return (
    <section id={item.key} className={classes.item} ref={rootRef}>

      {/* ── Hero ── */}
      <div ref={heroRef} className={classes.hero}>
        <div ref={heroImgRef} className={classes.heroInner}>
          <Image src={item.hero} alt="" fill priority={index === 0}
            sizes="100vw" className={classes.heroImg} />
        </div>
        <div ref={heroTxtRef} className={classes.heroLabel}>
          <h2 className={classes.heroLabelText}>{item.label}</h2>
        </div>
      </div>

      {/* ── Content grid ── */}
      <SectionContentGrid
        intro={item.intro}
        subText={item.subText}
        imgLarge={item.imgLarge}
        imgSmall={item.imgSmall}
      />

      {/* ── CTA row ── */}
      <div className={`container grid ${classes.ctaGrid}`}>
        <div className={classes.ctaImg} data-parallax-block>
          <div className={classes.ctaImgInner} data-parallax-inner>
            <Image src={item.ctaImg} alt="" fill
              sizes="(max-width: 767px) 100vw, 55vw" className={classes.img} />
          </div>
        </div>
        <div className={classes.ctaContent}>
          <p className={classes.ctaText}>{item.ctaText}</p>
          <Button href="/contact" variant="primary" size="lg">{ctaLabel}</Button>
        </div>
      </div>

      {/* ── Gallery swiper ── */}
      <div className={`container ${classes.exploreWrap}`}>
        <div className={classes.exploreControl}>
          <button ref={prevRef} type="button" className={classes.exploreBtn} aria-label="Previous">
            <svg viewBox="0 0 18 18" fill="none" width="18" height="18" aria-hidden="true">
              <path d="M7.875 3.938 2.813 9l5.062 5.063M15.188 9H3.5"
                stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" strokeLinejoin="round" />
            </svg>
          </button>
          <button ref={nextRef} type="button" className={classes.exploreBtn} aria-label="Next">
            <svg viewBox="0 0 18 18" fill="none" width="18" height="18" aria-hidden="true">
              <path d="M11 3.938 16.063 9 11 14.063M15.188 9H3.5"
                stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className={classes.exploreMain} ref={galleryRef}>
          <Swiper
            modules={[Navigation]}
            slidesPerView="auto"
            speed={450}
            navigation={{ disabledClass: classes.navDisabled }}
            onBeforeInit={(s) => {
              if (typeof s.params.navigation !== "boolean") {
                s.params.navigation.prevEl = prevRef.current;
                s.params.navigation.nextEl = nextRef.current;
              }
            }}
            onInit={wireSwiperNav}
            className={classes.swiper}
            breakpoints={{ 320: { spaceBetween: 12 }, 768: { spaceBetween: 20 } }}
          >
            {item.gallery.map((g, i) => (
              <SwiperSlide key={i} className={classes.slide}>
                <a href={g.src} data-fancybox={galleryGroup} data-caption={g.caption}
                  className={classes.slideLink} aria-label={g.caption}>
                  <div className={classes.slideImg}>
                    <Image src={g.src} alt={g.caption} fill
                      sizes="(max-width: 767px) 80vw, 30vw" className={classes.img} />
                  </div>
                  <div className={classes.slideCap}>{g.caption}</div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {!isLast && <div className={classes.divider} aria-hidden="true" />}
    </section>
  );
}
