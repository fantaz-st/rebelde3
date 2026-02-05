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

export default function Testimonials() {
  const rootRef = useRef(null);
  const pinRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const pin = pinRef.current;
      if (!root || !pin) return;

      const scrollerEl = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot");
      const scroller = scrollerEl || window;
      const scrollerOpt = scroller === window ? undefined : scroller;

      const inner = root.querySelector(`.${classes.inner}`);
      const viewport = root.querySelector(`.${classes.viewport}`);
      const list = root.querySelector(`.${classes.list}`);
      if (!inner || !viewport || !list) return;

      const mm = gsap.matchMedia();
      let tl;

      const getDelta = () => Math.max(0, list.scrollHeight - viewport.clientHeight);

      mm.add("(min-width: 992px)", () => {
        tl = gsap
          .timeline({
            scrollTrigger: {
              trigger: pin,
              scroller: scrollerOpt,
              start: "10% top",
              end: () => `+=${getDelta()}`,
              pin: inner,
              scrub: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })
          .fromTo(list, { y: 0 }, { y: () => -getDelta(), ease: "none" });

        requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => {
          tl?.scrollTrigger?.kill();
          tl?.kill();
          tl = null;
        };
      });

      mm.add("(max-width: 991px)", () => {
        gsap.set(list, { clearProps: "transform" });
        requestAnimationFrame(() => ScrollTrigger.refresh());
      });

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [testimonials] },
  );

  return (
    <section className={classes.wrap} ref={rootRef}>
      <div className={`container ${classes.inner}`}>
        <div className={classes.header}>
          <h2 className={classes.title}>Happy users feedback</h2>
        </div>

        <div className={`grid ${classes.grid}`} ref={pinRef}>
          <div className={classes.left}>
            <div className={classes.rule} aria-hidden="true" />
            <div className={classes.viewport}>
              <div className={classes.list}>
                {testimonials.map((t) => (
                  <article key={t.id} className={classes.card}>
                    <p className={classes.cardTitle}>{t.title}</p>
                    <h4 className={classes.quote}>&ldquo;{t.text}&rdquo;</h4>
                    <div className={classes.meta}>
                      <div className={classes.name}>{t.name}</div>
                      <div className={classes.stars} aria-hidden="true">
                        ★★★★★
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className={classes.right}>
            <div className={classes.media}>
              <Image className={classes.image} src="/images/testimonials/background.jpeg" alt="Happy guests on our boat" fill priority sizes="(max-width: 991px) 100vw, 45vw" />

              <div className={classes.badge}>
                <h3 className={classes.score}>5.0</h3>

                <div className={classes.avatars}>
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

                <div className={classes.badgeStars} aria-hidden="true">
                  ★★★★★
                </div>

                <p className={classes.badgeNote}>200+ satisfied guests</p>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.buttonWrap}>
          <Button href="https://www.tripadvisor.com/Attraction_Review-g295370-d28042808-Reviews-Rebelde_Boats-Split_Split_Dalmatia_County_Dalmatia.html" variant="primary" size="lg">
            Read more Testimonials
          </Button>
        </div>
      </div>
    </section>
  );
}
