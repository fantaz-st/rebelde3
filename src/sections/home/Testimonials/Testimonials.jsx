"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import classes from "./Testimonials.module.css";
import Button from "@/components/Button/Button";
import testimonials from "@/settings/testimonials";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const AGGREGATE_RATING = {
  ratingValue: "5.0",
  reviewCount: testimonials.length,
};

function buildReviewJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.rebelde.hr/#business",
    name: "Rebelde Boats",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: AGGREGATE_RATING.ratingValue,
      bestRating:  "5",
      worstRating: "1",
      reviewCount: "200",
    },
    review: testimonials.map((t) => ({
      "@type":       "Review",
      name:          t.title,
      reviewBody:    t.text,
      reviewRating: {
        "@type":       "Rating",
        ratingValue:   "5",
        bestRating:    "5",
        worstRating:   "1",
      },
      author: {
        "@type": "Person",
        name:    t.name,
      },
    })),
  };
}

export default function Testimonials() {
  const rootRef = useRef(null);
  const pinRef  = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const pin  = pinRef.current;
      if (!root || !pin) return;

      const scrollerEl  = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot");
      const scroller    = scrollerEl || window;
      const scrollerOpt = scroller === window ? undefined : scroller;

      const inner    = root.querySelector(`.${classes.inner}`);
      const viewport = root.querySelector(`.${classes.viewport}`);
      const list     = root.querySelector(`.${classes.list}`);
      if (!inner || !viewport || !list) return;

      const mm = gsap.matchMedia();
      let tl;

      const getDelta = () => Math.max(0, list.scrollHeight - viewport.clientHeight);

      mm.add("(min-width: 992px)", () => {
        tl = gsap
          .timeline({
            scrollTrigger: {
              trigger:            pin,
              scroller:           scrollerOpt,
              start:              "top 20%",
              end:                () => `+=${getDelta()}`,
              pin:                inner,
              scrub:              true,
              anticipatePin:      1,
              invalidateOnRefresh: true,
            },
          })
          .fromTo(list, { y: 0 }, { y: () => -getDelta(), ease: "none" });

        requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => { tl?.scrollTrigger?.kill(); tl?.kill(); tl = null; };
      });

      mm.add("(max-width: 991px)", () => {
        gsap.set(list, { clearProps: "transform" });
        requestAnimationFrame(() => ScrollTrigger.refresh());
      });

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [testimonials] },
  );

  const jsonLd = buildReviewJsonLd();

  return (
    <section className={classes.wrap} ref={rootRef} aria-labelledby="testimonials-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className={`container ${classes.inner}`}>
        <div className={classes.header}>
          <h2 id="testimonials-heading" className={classes.title}>
            What Our Guests Say
          </h2>
        </div>

        <div className={`grid ${classes.grid}`} ref={pinRef}>
          <div className={classes.left}>
            <div className={classes.rule} aria-hidden="true" />
            <div className={classes.viewport}>
              <div className={classes.list}>
                {testimonials.map((t) => (
                  <article key={t.id} className={classes.card}>
                    <p className={classes.cardTitle}>{t.title}</p>
                    <blockquote className={classes.quote} cite="https://www.tripadvisor.com/Attraction_Review-g295370-d28042808-Reviews-Rebelde_Boats-Split_Split_Dalmatia_County_Dalmatia.html">
                      &ldquo;{t.text}&rdquo;
                    </blockquote>
                    <footer className={classes.meta}>
                      <cite className={classes.name}>{t.name}</cite>
                      <div
                        className={classes.stars}
                        role="img"
                        aria-label="5 out of 5 stars"
                      >
                        ★★★★★
                      </div>
                    </footer>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className={classes.right}>
            <div className={classes.media}>
              <Image
                className={classes.image}
                src="/images/testimonials/background.jpeg"
                alt="Happy guests on a private Rebelde Boats tour in the Adriatic"
                fill
                sizes="(max-width: 991px) 100vw, 45vw"
              />

              <aside className={classes.badge} aria-label="Guest rating summary">
                <p className={classes.score} aria-label="Rating: 5.0 out of 5">5.0</p>

                <div className={classes.avatars} aria-hidden="true">
                  <div className={classes.avatar}>
                    <Image src="/images/testimonials/avatar-1.jpg" alt="" fill sizes="50px" />
                  </div>
                  <div className={classes.avatar}>
                    <Image src="/images/testimonials/avatar-2.jpg" alt="" fill sizes="50px" />
                  </div>
                  <div className={classes.avatar}>
                    <Image src="/images/testimonials/avatar-3.jpg" alt="" fill sizes="50px" />
                  </div>
                </div>

                <div className={classes.badgeStars} role="img" aria-label="5 out of 5 stars">
                  ★★★★★
                </div>

                <p className={classes.badgeNote}>200+ satisfied guests</p>
              </aside>
            </div>
          </div>
        </div>

        <div className={classes.buttonWrap}>
          <Button
            href="https://www.tripadvisor.com/Attraction_Review-g295370-d28042808-Reviews-Rebelde_Boats-Split_Split_Dalmatia_County_Dalmatia.html"
            variant="primary"
            size="lg"
          >
            Read more on TripAdvisor
          </Button>
        </div>
      </div>
    </section>
  );
}
