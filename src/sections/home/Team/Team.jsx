"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import useParallaxImage from "@/hooks/useParallaxImage";
import rawItems, { thumb } from "@/settings/team";
import classes from "./Team.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ── Item renderers ──────────────────────────────────────────

function TeamImage({ src, alt, className, priority = false }) {
  return (
    <div className={`${classes.imgWrap} ${className}`} data-parallax-block>
      <div className={classes.imgInner} data-parallax-inner>
        <Image
          src={src}
          alt={alt || ""}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 40vw"
          className={classes.img}
          priority={priority}
        />
      </div>
    </div>
  );
}

function TeamText({ title, descs, className }) {
  return (
    <div className={className}>
      <h3 className={classes.title}>{title}</h3>
      {descs.map((para, i) => (
        <p key={i} className={classes.desc}>
          {para}
        </p>
      ))}
    </div>
  );
}

function Item1({ item, priority }) {
  return (
    <article className={classes.item}>
      <div className={classes.grid}>
        <TeamImage
          src={item.img}
          alt={item.alt}
          className={classes.item1Img1}
          priority={priority}
        />
        <TeamText
          title={item.title}
          descs={item.descs}
          className={classes.item1Text}
        />
        <TeamImage
          src={item.img2}
          alt={item.alt2}
          className={classes.item1Img2}
        />
      </div>
    </article>
  );
}

function Item2({ item }) {
  return (
    <article className={classes.item}>
      <div className={classes.grid}>
        <TeamImage src={item.img} alt={item.alt} className={classes.item2Img} />
        <TeamText
          title={item.title}
          descs={item.descs}
          className={classes.item2Text}
        />
      </div>
    </article>
  );
}

function Item3({ item }) {
  return (
    <article className={classes.item}>
      <div className={classes.grid}>
        <TeamImage src={item.img} alt={item.alt} className={classes.item3Img} />
        <TeamText
          title={item.title}
          descs={item.descs}
          className={classes.item3Text}
        />
      </div>
    </article>
  );
}

const LAYOUTS = { double: Item1, left: Item2, right: Item3 };

// ─────────────────────────────────────────────────────────────

export default function Team() {
  const t = useTranslations("team");
  const wrapRef = useRef(null);

  useParallaxImage(wrapRef, {
    blockSelector: "[data-parallax-block]",
    innerSelector: "[data-parallax-inner]",
    fromScale: 1.12,
    fromYPercent: -8,
    toScale: 1,
    toYPercent: 6,
    start: "top bottom",
    end: "bottom top",
  });

  // Final thumb — desktop clip-path reveal + mobile parallax
  useGSAP(
    () => {
      const root = wrapRef.current;
      if (!root) return;
      const thumbEl = root.querySelector("[data-team-thumb]");
      const thumbInner = root.querySelector("[data-team-thumb-inner]");
      const thumbImg = root.querySelector("[data-team-thumb-img]");
      const thumbImgMobile =
        root.querySelector("[data-team-thumb-img-mobile]") || thumbImg;
      if (!thumbEl || !thumbInner || !thumbImg) return;

      const scroller =
        window.__RBD_SCROLLER__ ||
        document.querySelector(".scrollRoot") ||
        window;
      const scrollerOpt = scroller === window ? undefined : scroller;
      const mm = gsap.matchMedia();

      // ── Desktop: clip-path expand + scale down ──
      mm.add("(min-width: 992px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: thumbEl,
            scroller: scrollerOpt,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(
          thumbInner,
          { clipPath: "inset(14% 37% 14% 37%)" },
          { clipPath: "inset(0% 0% 0% 0%)", ease: "none" },
        );
        tl.fromTo(
          thumbImg,
          { scale: 1.2, transformOrigin: "center" },
          { scale: 1, ease: "none" },
          0,
        );

        requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      // ── Mobile: parallax translate on the mobile portrait image ──
      mm.add("(max-width: 767px)", () => {
        const st = gsap.fromTo(
          thumbImgMobile,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: thumbEl,
              scroller: scrollerOpt,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );

        requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => {
          st.scrollTrigger?.kill();
          st.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: wrapRef },
  );

  // `t.raw` returns the array straight from messages — no more desc0/desc1
  // index juggling, and settings/team.js no longer carries a parallel copy
  // of the English text just to count paragraphs.
  const items = rawItems.map((item) => ({
    ...item,
    title: t(`${item.key}.title`),
    descs: t.raw(`${item.key}.desc`),
    alt: t(`${item.key}.alt`),
    alt2: item.img2 ? t(`${item.key}.alt2`) : undefined,
  }));

  return (
    <div className={classes.wrap} ref={wrapRef}>
      <div className={classes.blockEmpty} aria-hidden="true" />

      <section className={classes.team} aria-labelledby="team-heading">
        <h2 id="team-heading" className={classes.srOnly}>
          Our Team
        </h2>

        <div className={classes.list}>
          {items.map((item, idx) => {
            const Layout = LAYOUTS[item.layout] || Item2;
            /* No `priority` here: this section is several screens down,
               and its preload was competing with the hero image. */
            return <Layout key={item.key} item={item} priority={false} />;
          })}
        </div>

        <div className={classes.thumb} data-team-thumb>
          <div className={classes.thumbInner} data-team-thumb-inner>
            {/* Desktop / tablet — landscape */}
            <Image
              data-team-thumb-img
              src={thumb.img}
              alt={thumb.alt}
              fill
              sizes="100vw"
              quality={85}
              className={`${classes.thumbImg} ${classes.thumbImgDesktop}`}
              onLoad={() => ScrollTrigger.refresh()}
            />
            {/* Mobile — portrait crop of the same photo */}
            {thumb.imgMobile && (
              <Image
                data-team-thumb-img-mobile
                src={thumb.imgMobile}
                alt={thumb.alt}
                fill
                sizes="100vw"
                quality={85}
                className={`${classes.thumbImg} ${classes.thumbImgMobile}`}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
