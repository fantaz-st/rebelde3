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
import classes from "./BoatSectionItem.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function BoatSectionItem({ item, index, isLast }) {
  const rootRef    = useRef(null);
  const heroRef    = useRef(null);
  const heroImgRef = useRef(null);
  const heroTxtRef = useRef(null);
  const prevRef    = useRef(null);
  const nextRef    = useRef(null);
  const galleryRef = useRef(null);
  const galleryGroup = `boat-gallery-${item.key}`;

  // Parallax on imgLarge, imgSmall, ctaImg
  useParallaxImage(rootRef, {
    blockSelector: "[data-parallax-block]",
    innerSelector: "[data-parallax-inner]",
    fromScale:    1.12,
    fromYPercent: -8,
    toScale:      1,
    toYPercent:   6,
    start: "top bottom",
    end:   "bottom top",
  });

  // Clip-path scale reveal + title scale on heroImg
  useGSAP(
    () => {
      const hero    = heroRef.current;
      const heroImg = heroImgRef.current;
      const heroTxt = heroTxtRef.current;
      if (!hero || !heroImg || !heroTxt) return;

      const scroller = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot") || window;
      const fs = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const r12 = (12 / 10) * fs; // 1.2rem in px

      const mm = gsap.matchMedia();

      // Desktop: original Kudanil values — 14% vertical, 37.35% horizontal
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger:             hero,
            scroller,
            start:               "top bottom+=200%",
            end:                 "bottom bottom",
            scrub:               true,
            invalidateOnRefresh: true,
          },
        });
        tl.fromTo(heroImg,
          { clipPath: `inset(14% 37.35% 14% 37.35% round ${r12}px)` },
          { clipPath: "inset(0% 0% 0% 0% round 0px)" }
        )
        .fromTo(heroTxt,
          { scale: 0.6, transformOrigin: "center" },
          { scale: 1 },
          0
        );
        return () => { tl.scrollTrigger?.kill(); tl.kill(); };
      });

      // Mobile: start when 10% of image is visible, finish when image top hits viewport top
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger:             hero,
            scroller,
            start:               "top 90%",
            end:                 "top top",
            scrub:               true,
            invalidateOnRefresh: true,
          },
        });
        tl.fromTo(heroImg,
          { clipPath: `inset(8% 4% 8% 4% round ${r12}px)` },
          { clipPath: "inset(0% 0% 0% 0% round 0px)" }
        )
        .fromTo(heroTxt,
          { scale: 0.75, transformOrigin: "center" },
          { scale: 1 },
          0
        );
        return () => { tl.scrollTrigger?.kill(); tl.kill(); };
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  // Fancybox
  useEffect(() => {
    const container = galleryRef.current;
    if (!container) return;
    Fancybox.bind(container, `[data-fancybox="${galleryGroup}"]`, {
      Thumbs:   { type: "modern" },
      Carousel: { infinite: true },
    });
    return () => { Fancybox.unbind(container); Fancybox.close(); };
  }, [item.key, galleryGroup]);

  return (
    <section id={item.key} className={classes.item} ref={rootRef}>

      {/* ── Full-screen hero image with clip-path reveal + centred label ── */}
      <div ref={heroRef} className={classes.heroImg}>
        <div ref={heroImgRef} className={classes.heroImgInner}>
          <Image
            src={item.heroImg}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            className={classes.heroImgEl}
          />
        </div>
        <div ref={heroTxtRef} className={classes.heroLabel}>
          <h2 className={classes.heroLabelText}>{item.label}</h2>
        </div>
      </div>

      {/* ── Main content grid ── */}
      <div className={`container grid ${classes.grid}`}>

        {/* Left: intro only — title shown in heroLabel overlay */}
        <div className={classes.left}>
          <p className={classes.intro}>{item.intro}</p>
        </div>

        {/* Right: large vertical image — parallax */}
        <div className={classes.imgLarge} data-parallax-block>
          <div className={classes.imgLargeInner} data-parallax-inner>
            <Image src={item.imgLarge} alt="" fill sizes="(max-width: 767px) 50vw, (max-width: 991px) 50vw, 40vw" className={classes.img}/>
          </div>
        </div>

        {/* Left: small vertical image — parallax */}
        <div className={classes.imgSmall} data-parallax-block>
          <div className={classes.imgSmallInner} data-parallax-inner>
            <Image src={item.imgSmall} alt="" fill sizes="(max-width: 767px) 65vw, (max-width: 991px) 40vw, 28vw" className={classes.img}/>
          </div>
        </div>

        {/* Right: secondary text */}
        <div className={classes.subText}>
          <p className={classes.subTextP}>{item.subText}</p>
        </div>

      </div>

      {/* ── CTA row ── */}
      <div className={`container grid ${classes.ctaGrid}`}>
        <div className={classes.ctaImg} data-parallax-block>
          <div className={classes.ctaImgInner} data-parallax-inner>
            <Image src={item.ctaImg} alt="" fill sizes="(max-width: 767px) 100vw, 55vw" className={classes.img}/>
          </div>
        </div>
        <div className={classes.ctaContent}>
          <p className={classes.ctaText}>{item.ctaText}</p>
          <Button href="/contact" variant="primary" size="lg">Check Availability</Button>
        </div>
      </div>

      {/* ── Gallery swiper ── */}
      <div className={`container ${classes.exploreWrap}`}>
        <div className={classes.exploreControl}>
          <button ref={prevRef} type="button" className={classes.exploreBtn} aria-label="Previous">
            <svg viewBox="0 0 18 18" fill="none" width="18" height="18"><path d="M7.875 3.938 2.813 9l5.062 5.063M15.188 9H3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" strokeLinejoin="round"/></svg>
          </button>
          <button ref={nextRef} type="button" className={classes.exploreBtn} aria-label="Next">
            <svg viewBox="0 0 18 18" fill="none" width="18" height="18"><path d="M11 3.938 16.063 9 11 14.063M15.188 9H3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" strokeLinejoin="round"/></svg>
          </button>
        </div>
        <div className={classes.exploreMain} ref={galleryRef}>
          <Swiper
            modules={[Navigation]}
            slidesPerView="auto"
            spaceBetween={20}
            speed={450}
            navigation={{ disabledClass: classes.disabled }}
            onBeforeInit={(s) => { if (typeof s.params.navigation !== "boolean") { s.params.navigation.prevEl = prevRef.current; s.params.navigation.nextEl = nextRef.current; }}}
            onInit={(s) => { if (typeof s.params.navigation !== "boolean") { s.params.navigation.prevEl = prevRef.current; s.params.navigation.nextEl = nextRef.current; s.navigation.destroy(); s.navigation.init(); s.navigation.update(); }}}
            className={classes.swiper}
            breakpoints={{ 320: { spaceBetween: 12 }, 768: { spaceBetween: 20 } }}
          >
            {item.gallery.map((g, i) => (
              <SwiperSlide key={i} className={classes.slide}>
                <a href={g.src} data-fancybox={galleryGroup} data-caption={g.caption} className={classes.slideLink}>
                  <div className={classes.slideImg}>
                    <Image src={g.src} alt={g.caption} fill sizes="(max-width: 767px) 45vw, 30vw" className={classes.img}/>
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