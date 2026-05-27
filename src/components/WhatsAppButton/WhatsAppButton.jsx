"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import classes from "./WhatsAppButton.module.css";

export default function WhatsAppButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const scrollerEl = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot");
    const scroller = scrollerEl || window;

    const getY = () =>
      scroller === window ? window.scrollY || 0 : scroller.scrollTop || 0;

    let ticking = false;

    const checkScroll = () => {
      setShow(getY() > 300);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(checkScroll);
        ticking = true;
      }
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    checkScroll();

    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-17322617143/fhd7CMSZ04gbELfSiMRA",
      });
    }
  };

  return (
    <a
      className={`${classes.container} ${show ? classes.visible : ""}`}
      target="_blank"
      href="https://wa.me/385997973959"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      onClick={handleClick}
    >
      <Image
        src="/whatsappicon2.svg"
        width={24}
        height={24}
        sizes="24px"
        className={classes.icon}
        alt="WhatsApp logo for direct chat - Rebelde boats"
      />
      <p>Chat On WhatsApp</p>
    </a>
  );
}
