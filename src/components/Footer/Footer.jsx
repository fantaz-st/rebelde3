"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import classes from "./Footer.module.css";
import horizontalLoop from "@/helpers/horizontalHelper";
import Button from "../Button/Button";
import items from "../../settings/footer-marquee";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Footer() {
  const wrapRef = useRef(null);
  const bgRef = useRef(null);
  const itemRefs = useRef([]);

  useGSAP(
    () => {
      const scroller = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot") || window;
      if (!wrapRef.current) return;

      if (bgRef.current) {
        gsap.set(bgRef.current, { backgroundPosition: "0px 0px", willChange: "background-position" });

        gsap.to(bgRef.current, {
          backgroundPosition: "0px -220px",
          ease: "none",
          scrollTrigger: {
            scroller: scroller === window ? undefined : scroller,

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
        horizontalLoop(els, {
          repeat: -1,
          speed: 0.8,
          paused: false,
          paddingRight: 24,
        });
      }
    },
    { scope: wrapRef, dependencies: [items] },
  );

  return (
    <footer ref={wrapRef} className={classes.footer}>
      <div className={classes.bgBase} />
      <div ref={bgRef} className={classes.footerBg} />

      <div className={classes.cta}>
        <div className={`container ${classes.ctaInner}`}>
          <h2 className={classes.ctaTitle}>Want to make it special?</h2>
          <Button href="/contact" variant="white" size="lg">
            GET IN TOUCH
          </Button>
          <p className={classes.ctaSub}>Reach out and let us turn your time in Split into something truly special.</p>
        </div>
      </div>

      <div className={classes.railWrap} aria-hidden="true">
        <div className={classes.rail}>
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
        <div className={classes.top}>
          <div className={`container ${classes.topInner}`}>
            <div className={`${classes.column} ${classes.left} `}>
              <h5 className={classes.label}>Chat with us on WhatsApp</h5>

              <a className={`${classes.link} ${classes.larger}`} target="_blank" href="https://wa.me/385997973959" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
                <h4>+385 99 797 3959</h4>
              </a>
            </div>

            <div className={`${classes.column} ${classes.center}`}>
              <p className={`${classes.label} font-alternate`}>Rebelde Boats</p>
              <p className={classes.larger}>REBELDE d.o.o.</p>
              <p className={classes.larger}>OIB: 99723002621</p>
              <p className={classes.larger}>Vnkovačka 45, 21000 SPLIT</p>
            </div>

            <div className={`${classes.column} ${classes.right}`}>
              <h5 className={classes.label}>Get in touch</h5>
              <a className={`${classes.link} ${classes.larger}`} href="mailto:rebeldeboats@gmail.com">
                <h4>rebeldeboats@gmail.com</h4>
              </a>
            </div>
          </div>
        </div>

        <div className={classes.bot}>
          <div className={`container ${classes.botInner}`}>
            <div className={`${classes.column} ${classes.left}`}>
              <div className={classes.copyright}>
                <span>© {new Date().getFullYear()}</span>
                <span className={classes.dot}>·</span>
                <span>Rebelde Boats</span>
              </div>
            </div>
            <div className={`${classes.column} ${classes.center}`}>
              <div className={classes.links}>
                <Link className={classes.botLink} href="/our-boat">
                  Our Boat
                </Link>
                <Link className={classes.botLink} href="/our-tours">
                  Our Tours
                </Link>
                <Link className={classes.botLink} href="/faq">
                  FAQ-s
                </Link>
                <Link className={classes.botLink} href="/contact">
                  Contact
                </Link>
              </div>
            </div>
            <div className={`${classes.column} ${classes.right}`}>
              <div className={classes.columnInner}>
                designed & developed by <a href="mailto:cbabic.st@gmail.com">fantaz</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
