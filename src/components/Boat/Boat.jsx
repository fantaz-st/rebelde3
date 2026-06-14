"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import useParallaxImage from "@/hooks/useParallaxImage";
import classes from "./Boat.module.css";
import boatSections, { boatHero, boatSpecs } from "@/settings/boat";
import BoatSection from "@/sections/boat/BoatSection";
import SectionNav from "@/components/SectionNav/SectionNav";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Boat() {
  const wrapRef         = useRef(null);
  const heroRef         = useRef(null);
  const heroBgRef       = useRef(null);
  const heroTextRef     = useRef(null);
  const sectionsWrapRef = useRef(null);

  const sections = boatSections.map((s) => ({ id: s.key, label: s.label }));

  // Hero image parallax
  useParallaxImage(heroRef, {
    blockSelector: "[data-parallax-block]",
    innerSelector: "[data-parallax-inner]",
    fromScale:     1.2,
    fromYPercent:  -8,
    toScale:       1,
    toYPercent:    8,
    start:         "top top",
    end:           "bottom top",
  });

  // Hero bg: blue → white, text: white → blue, driven by scroll
  useGSAP(
    () => {
      const scroller    = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot") || window;
      const scrollerOpt = scroller === window ? undefined : scroller;

      const bg   = heroBgRef.current;
      const text = heroTextRef.current;
      const hero = heroRef.current;
      if (!bg || !text || !hero) return;

      gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger:             hero,
          scroller:            scrollerOpt,
          start:               "top top",
          end:                 "bottom top",
          scrub:               true,
          invalidateOnRefresh: true,
        },
      })
        .fromTo(bg,   { backgroundColor: "#003357" }, { backgroundColor: "#ffffff" }, 0)
        .fromTo(text, { color: "#ffffff" },            { color: "#003357" },           0);
    },
    { scope: wrapRef },
  );

  return (
    <div className={classes.wrap} ref={wrapRef}>

      {/* ── HERO ── */}
      <section
        className={classes.hero}
        ref={heroRef}
        aria-label="The Boat — Felix 37 Buenaventura"
      >
        {/* Scroll-animated background panel */}
        <div className={classes.heroBg} ref={heroBgRef} aria-hidden="true" />

        <div className={`container grid ${classes.heroGrid}`} ref={heroTextRef}>
          <div className={classes.heroThumb} data-parallax-block>
            <div className={classes.heroThumbInner} data-parallax-inner>
              <Image
                src={boatHero.hero}
                alt="Felix 37 Buenaventura speedboat — Rebelde Boats private charter from Split, Croatia"
                fill
                priority
                sizes="(max-width: 991px) 100vw, 60vw"
                className={classes.heroImg}
              />
            </div>
          </div>

          <div className={classes.heroText}>
            <h1 className={classes.heroTitle}>{boatHero.title}</h1>
            <p className={classes.heroDesc}>{boatHero.desc}</p>
          </div>

          <div className={classes.heroSub}>
            <p className={classes.heroSubText}>{boatHero.sub}</p>
          </div>
        </div>
      </section>

      {/* ── NAV + SECTIONS ── */}
      <div className={`container grid ${classes.body}`}>
        <SectionNav
          sections={sections}
          containerRef={sectionsWrapRef}
          topOffset={140}
          variant="rail"
        />

        <div className={classes.sections} ref={sectionsWrapRef}>
          {boatSections.map((section, i) => (
            <BoatSection
              key={section.key}
              section={section}
              index={i}
            />
          ))}
        </div>
      </div>

      {/* ── SPEC TABLE ── */}
      <section className={classes.specs} id="specs" aria-labelledby="specs-heading">
        <div className={`container grid ${classes.specsGrid}`}>
          <div className={classes.specsHead}>
            <h2 id="specs-heading" className={classes.specsTitle}>Technical Specifications</h2>
            <p className={classes.specsDesc}>
              A fast, comfortable speedboat with the highest comfort-to-size ratio on the
              Split waterfront — more room to relax, less time getting there.
            </p>
          </div>

          <dl className={classes.specsList}>
            {boatSpecs.map((spec) => (
              <div key={spec.label} className={classes.specItem}>
                <dt className={classes.specLabel}>{spec.label}</dt>
                <dd className={classes.specValue}>{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
