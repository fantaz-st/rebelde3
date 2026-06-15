"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import classes from "./Boat.module.css";
import boatSections, { boatHero, boatSpecs } from "@/settings/boat";
import BoatSection from "@/sections/boat/BoatSection";
import SectionNav from "@/components/SectionNav/SectionNav";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Boat() {
  const wrapRef         = useRef(null);
  const heroRef         = useRef(null);
  const heroBgRef       = useRef(null);
  const heroContentRef  = useRef(null);
  const heroSubRef      = useRef(null);
  const heroThumbRef    = useRef(null);
  const sectionsWrapRef = useRef(null);

  const navSections = boatSections.map((s) => ({ id: s.key, label: s.label }));

  useGSAP(() => {
    const scroller    = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot") || window;
    const scrollerOpt = scroller === window ? undefined : scroller;
    const bg      = heroBgRef.current;
    const content = heroContentRef.current;
    const sub     = heroSubRef.current;
    const thumb   = heroThumbRef.current;
    const hero    = heroRef.current;
    if (!bg || !content || !hero) return;

    const mm = gsap.matchMedia();

    // ── Desktop only: bg color + text color animation ──
    mm.add("(min-width: 768px)", () => {
      // Select text elements to animate directly (avoids color inheritance issues)
      const heroEl   = heroRef.current;
      const titles   = heroEl ? heroEl.querySelectorAll("h1, p") : [];

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: hero, scroller: scrollerOpt,
          start: "top top", end: "bottom 40%",
          scrub: true, invalidateOnRefresh: true,
        },
      })
        .fromTo(bg,     { backgroundColor: "#003357" }, { backgroundColor: "#ffffff" }, 0)
        .fromTo(titles, { color: "#ffffff" },            { color: "#003357" },           0);

      // hero-sub: yPercent 0→60, scale 0.9→1 (matches original)
      if (sub) {
        tl.fromTo(sub,
          { yPercent: 0, scale: 0.9, transformOrigin: "bottom" },
          { yPercent: 60, scale: 1, duration: 1.2 },
          "<=0.1"
        );
      }

      // hero-thumb: scale 1→0.95, yPercent 0→12 (matches original)
      if (thumb) {
        tl.fromTo(thumb,
          { yPercent: 0, scale: 1, transformOrigin: "bottom" },
          { scale: 0.95, yPercent: 12, duration: 1.2 },
          "<=0"
        );
      }

      return () => tl.scrollTrigger?.kill();
    });

    return () => mm.revert();
  }, { scope: wrapRef });

  return (
    <div className={classes.wrap} ref={wrapRef}>

      {/* ── HERO ── */}
      <div className={classes.heroWrap} ref={heroRef}>
        <section className={classes.hero} aria-label="The Boat">
          <div className={classes.heroBg} ref={heroBgRef} aria-hidden="true" />

          {/* All hero children are direct children of the 16-col grid */}
          <div className="container grid" ref={heroContentRef}>

            {/* THUMB: grid-area 1/4/2/11, padding-top 16rem */}
            <div className={classes.heroThumb} ref={heroThumbRef}>
              <div className={classes.heroThumbInner}>
                <Image
                  src={boatHero.hero}
                  alt="Felix 37 Buenaventura — Rebelde Boats private charter from Split"
                  fill priority
                  sizes="(max-width:991px) 100vw, 45vw"
                  className={classes.heroImg}
                />
              </div>
            </div>

            {/* TEXT: grid-area 1/12/2/-3 — title + desc */}
            <div className={classes.heroText}>
              <h1 className={classes.heroTitle}>{boatHero.title}</h1>
              <p className={classes.heroDesc}>{boatHero.desc}</p>
            </div>

            {/* SUB: grid-area 2/6/3/-6, centered — animated on scroll */}
            <p className={classes.heroSub} ref={heroSubRef}>
              {boatHero.sub}
            </p>
          </div>
        </section>
      </div>

      {/* ── SECTIONS OUTER — nav absolutely overlaid ── */}
      <div className={classes.sectionsOuter}>
        <div className={classes.navOverlay} aria-hidden="true">
          <div className={classes.navInner}>
            <div className={`container ${classes.navContent}`}>
              <SectionNav
                sections={navSections}
                containerRef={null}
                topOffset={140}
                variant="overlay"
              />
            </div>
          </div>
        </div>

        <div className={classes.sectionsWrap} ref={sectionsWrapRef}>
          {boatSections.map((section, i) => (
            <BoatSection key={section.key} section={section} index={i} />
          ))}
        </div>
      </div>

      {/* ── SPECS ── */}
      <section className={classes.specs} aria-labelledby="specs-heading">
        <div className={`container grid ${classes.specsGrid}`}>
          <div className={classes.specsLeft}>
            <h2 id="specs-heading" className={classes.specsTitle}>Technical Specifications</h2>
            <p className={classes.specsDesc}>
              A fast, comfortable speedboat with the highest comfort-to-size ratio on the Split waterfront.
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
