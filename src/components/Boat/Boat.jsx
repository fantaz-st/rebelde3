"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import useParallaxImage from "@/hooks/useParallaxImage";
import classes from "./Boat.module.css";
import boatSections, { boatHero, boatSpecs } from "@/settings/boat";
import BoatSection from "@/sections/boat/BoatSection";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Boat() {
  const wrapRef = useRef(null);
  const heroRef = useRef(null);
  const navRef = useRef(null);
  const navListRef = useRef(null);
  const sectionsWrapRef = useRef(null);
  const sectionRefs = useRef({});
  const [activeIndex, setActiveIndex] = useState(0);
  const count = boatSections.length;

  // Hero parallax
  useParallaxImage(heroRef, {
    blockSelector: "[data-parallax-block]",
    innerSelector: "[data-parallax-inner]",
    fromScale: 1.2,
    fromYPercent: -8,
    toScale: 1,
    toYPercent: 8,
    start: "top top",
    end: "bottom top",
  });

  // Pin the section nav + scroll-spy
  useGSAP(
    () => {
      const scrollerEl = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot");
      const scroller = scrollerEl || window;
      const scrollerOpt = scroller === window ? undefined : scroller;

      const nav = navRef.current;
      const sectionsWrap = sectionsWrapRef.current;
      if (!nav || !sectionsWrap) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 992px)", () => {
        const st = ScrollTrigger.create({
          trigger: sectionsWrap,
          scroller: scrollerOpt,
          start: "top 140",
          end: "bottom bottom",
          pin: nav,
          pinSpacing: false,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        });

        requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => st.kill();
      });

      return () => mm.revert();
    },
    { scope: wrapRef },
  );

  // Scroll-spy: active section when its top passes viewport / 5
  useGSAP(
    () => {
      const scrollerEl = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot");
      const scroller = scrollerEl || window;

      let raf = null;
      const check = () => {
        raf = null;
        const triggerLine = window.innerHeight / 5;
        let current = 0;
        boatSections.forEach((s, i) => {
          const el = sectionRefs.current[s.key];
          if (el && el.getBoundingClientRect().top <= triggerLine) current = i;
        });
        setActiveIndex(current);
      };
      const onScroll = () => {
        if (raf == null) raf = requestAnimationFrame(check);
      };

      scroller.addEventListener("scroll", onScroll, { passive: true });
      check();

      return () => {
        scroller.removeEventListener("scroll", onScroll);
        if (raf != null) cancelAnimationFrame(raf);
      };
    },
    { scope: wrapRef },
  );

  const handleNavClick = (e, key) => {
    e.preventDefault();
    const target = sectionRefs.current[key];
    if (!target) return;
    const scroller = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot");
    const offset = 120;

    if (scroller && scroller !== window) {
      const top =
        target.getBoundingClientRect().top -
        scroller.getBoundingClientRect().top +
        scroller.scrollTop -
        offset;
      scroller.scrollTo({ top, behavior: "smooth" });
    } else {
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className={classes.wrap} ref={wrapRef}>
      {/* HERO */}
      <section className={classes.hero} ref={heroRef}>
        <div className={`container grid ${classes.heroGrid}`}>
          <div className={classes.heroThumb} data-parallax-block>
            <div className={classes.heroThumbInner} data-parallax-inner>
              <Image
                src={boatHero.hero}
                alt=""
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
            <h4 className={classes.heroSubHeading}>{boatHero.sub}</h4>
          </div>
        </div>
      </section>

      {/* NAV + SECTIONS */}
      <div className={`container grid ${classes.body}`}>
        {/* Sticky nav (left) */}
        <aside className={classes.nav} ref={navRef}>
          <div className={classes.navInner}>
            {/* sliding pin */}
            <div className={classes.navActive}>
              <div
                className={classes.navActiveInner}
                style={{
                  gridTemplateRows: `${activeIndex}fr 1fr ${count - activeIndex - 1}fr`,
                }}
              >
                <div className={classes.navActiveEmpty} />
                <div className={classes.navActiveMain}>
                  <span className={classes.navActiveIc}>
                    <svg viewBox="0 0 25 24" fill="none" aria-hidden="true">
                      <path
                        d="M12.5 6a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5m0 6a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5m0-10.5a8.26 8.26 0 0 0-8.25 8.25c0 2.944 1.36 6.064 3.938 9.023a23.8 23.8 0 0 0 3.885 3.591.75.75 0 0 0 .861 0 23.8 23.8 0 0 0 3.879-3.59c2.573-2.96 3.937-6.08 3.937-9.024A8.26 8.26 0 0 0 12.5 1.5"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </div>
                <div className={classes.navActiveEmpty} />
              </div>
            </div>

            <nav className={classes.navList} ref={navListRef}>
              {boatSections.map((section, i) => {
                const isActive = i === activeIndex;
                return (
                  <a
                    key={section.key}
                    href={`#${section.key}`}
                    onClick={(e) => handleNavClick(e, section.key)}
                    className={`${classes.navItem} ${isActive ? classes.navItemActive : ""}`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <span className={classes.flip}>
                      <span className={classes.flipTop}>{section.label}</span>
                      <span className={classes.flipBottom}>{section.label}</span>
                    </span>
                  </a>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Sections (right) */}
        <div className={classes.sections} ref={sectionsWrapRef}>
          {boatSections.map((section, i) => (
            <BoatSection
              key={section.key}
              section={section}
              index={i}
              registerRef={(el) => (sectionRefs.current[section.key] = el)}
            />
          ))}
        </div>
      </div>

      {/* SPEC TABLE */}
      <section className={classes.specs} id="specs">
        <div className={`container grid ${classes.specsGrid}`}>
          <div className={classes.specsHead}>
            <h2 className={classes.specsTitle}>Built for Good Living</h2>
            <p className={classes.specsDesc}>
              A fast, comfortable speedboat with the highest comfort-to-size ratio on the
              Split waterfront — more room to relax, less time getting there.
            </p>
          </div>

          <div className={classes.specsList}>
            {boatSpecs.map((spec) => (
              <div key={spec.label} className={classes.specItem}>
                <div className={classes.specLabel}>{spec.label}</div>
                <div className={classes.specValue}>{spec.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
