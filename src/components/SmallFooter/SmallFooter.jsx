"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import classes from "./SmallFooter.module.css";
import Button from "../Button/Button";
import items from "../../settings/footer-marquee";


export default function SmallFooter() {
  const wrapRef = useRef(null);
  const bgRef = useRef(null);
  const itemRefs = useRef([]);


  return (
    <footer ref={wrapRef} className={classes.footer}>
     
      <div className={classes.main}>
        <div className={classes.top}>
          <div className={`container ${classes.topInner}`}>
            <div className={`${classes.column} ${classes.left} `}>
              <h5 className={classes.label}>Chat with us on WhatsApp</h5>

              <a className={`${classes.link} ${classes.larger}`} target="_blank" href="https://wa.me/385953933125" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
                <h4>+385 95 393 3125</h4>
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
