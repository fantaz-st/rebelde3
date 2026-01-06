"use client";

import { useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import classes from "./Footer.module.css";
import horizontalLoop from "@/helpers/horizontalHelper";
import Button from "../Button/Button";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Footer() {
  const wrapRef = useRef(null);
  const bgRef = useRef(null);
  const railRef = useRef(null);
  const itemRefs = useRef([]);

  const items = useMemo(
    () => [
      { id: 1, src: "/images/footer/image-1.jpg", title: "Raja Ampat", alt: "" },
      { id: 2, src: "/images/footer/image-2.jpg", title: "Raja Ampat", alt: "" },
      { id: 3, src: "/images/footer/image-3.jpeg", title: "Raja Ampat", alt: "" },
      { id: 4, src: "/images/footer/image-4.jpeg", title: "Raja Ampat", alt: "" },
      { id: 5, src: "/images/footer/image-5.jpg", title: "Raja Ampat", alt: "" },
      { id: 6, src: "/images/footer/image-6.jpg", title: "Raja Ampat", alt: "" },
      { id: 7, src: "/images/footer/image-7.jpg", title: "Raja Ampat", alt: "" },
      { id: 8, src: "/images/footer/image-8.jpg", title: "Raja Ampat", alt: "" },
      { id: 9, src: "/images/footer/image-9.jpg", title: "Raja Ampat", alt: "" },
      { id: 10, src: "/images/footer/image-10.jpg", title: "Raja Ampat", alt: "" },
      { id: 11, src: "/images/footer/image-11.jpg", title: "Raja Ampat", alt: "" },
      { id: 12, src: "/images/footer/image-12.jpg", title: "Raja Ampat", alt: "" },
      { id: 13, src: "/images/footer/image-13.jpg", title: "Raja Ampat", alt: "" },
      { id: 14, src: "/images/footer/image-14.jpg", title: "Raja Ampat", alt: "" },
      { id: 15, src: "/images/footer/image-15.jpg", title: "Raja Ampat", alt: "" },
    ],
    []
  );

  useGSAP(
    () => {
      if (!wrapRef.current) return;

      if (bgRef.current) {
        gsap.set(bgRef.current, { backgroundPosition: "0px 0px", willChange: "background-position" });

        gsap.to(bgRef.current, {
          backgroundPosition: "0px -220px",
          ease: "none",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }

      const els = itemRefs.current.filter(Boolean);
      if (els.length) {
        const loop = horizontalLoop(els, {
          repeat: -1,
          speed: 0.8,
          paused: false,
          paddingRight: 24,
        });
      }
    },
    { scope: wrapRef, dependencies: [items] }
  );

  return (
    <footer ref={wrapRef} className={classes.footer}>
      <div className={classes.bgBase} />
      <div ref={bgRef} className={classes.footerBg} />

      <div className={classes.cta}>
        <div className={`container ${classes.ctaInner}`}>
          <h2 className={classes.ctaTitle}>Embark On Your Next Adventure</h2>
          <Button href="/contact" variant="white" size="lg">
            GET IN TOUCH
          </Button>

          <p className={classes.ctaSub}>Send us a request and we’ll be in touch shortly.</p>
        </div>
      </div>

      <div className={classes.railWrap} aria-hidden="true">
        <div ref={railRef} className={classes.rail}>
          {items.map((it, i) => (
            <div key={it.id} ref={(el) => (itemRefs.current[i] = el)} className={classes.railItem}>
              <div className={classes.railItemInner}>
                <Image src={it.src} alt={it.alt} fill sizes="(max-width: 991px) 70vw, 38vw" className={classes.railImg} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={classes.main}>
        <div className={`container ${classes.mainInner}`}>
          <div className={classes.mainGrid}>
            <div className={classes.mainCol}>
              <div className={classes.label}>CONTACT</div>
              <div className={classes.links}>
                <Link className={classes.link} href="/contact">
                  Get in touch
                </Link>
                <a className={classes.link} href="mailto:info@yourdomain.com">
                  info@yourdomain.com
                </a>
              </div>
            </div>

            <div className={`${classes.mainCol} ${classes.center}`}>
              <div className={classes.label}>EXPLORE</div>
              <div className={classes.links}>
                <Link className={classes.link} href="/bespoke-expeditions">
                  Expeditions
                </Link>
                <Link className={classes.link} href="/the-yacht">
                  The yacht
                </Link>
                <Link className={classes.link} href="/our-story">
                  Our story
                </Link>
              </div>
            </div>

            <div className={`${classes.mainCol} ${classes.right}`}>
              <div className={classes.label}>FOLLOW</div>
              <div className={classes.links}>
                <a className={classes.link} href="#" target="_blank" rel="noreferrer">
                  Instagram
                </a>
                <a className={classes.link} href="#" target="_blank" rel="noreferrer">
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.bot}>
          <div className={`container ${classes.botInner}`}>
            <div className={classes.copyright}>
              <span>© {new Date().getFullYear()}</span>
              <span className={classes.dot}>·</span>
              <span>RBD</span>
            </div>

            <div className={classes.legal}>
              <Link className={classes.botLink} href="/privacy-policy">
                Privacy
              </Link>
              <span className={classes.dot}>·</span>
              <Link className={classes.botLink} href="/terms">
                Terms
              </Link>
            </div>

            <div className={classes.socials}>
              <a className={classes.botLink} href="#" target="_blank" rel="noreferrer">
                IG
              </a>
              <a className={classes.botLink} href="#" target="_blank" rel="noreferrer">
                YT
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
