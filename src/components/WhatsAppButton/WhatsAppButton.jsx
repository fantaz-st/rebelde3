"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import classes from "./WhatsAppButton.module.css";

export default function WhatsAppButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const scrollerEl = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot");
    const scroller   = scrollerEl || window;
    const getY       = () => (scroller === window ? window.scrollY || 0 : scroller.scrollTop || 0);

    let raf = null;

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setShow(getY() > 300);
        raf = null;
      });
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      scroller.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const handleClick = () => {
    // gtag is injected by Google — safe to call directly
    window.gtag?.("event", "conversion", {
      send_to: "AW-17322617143/fhd7CMSZ04gbELfSiMRA",
    });
  };

  return (
    <a
      className={`${classes.container} ${show ? classes.visible : ""}`}
      href="https://wa.me/385953933125"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      onClick={handleClick}
    >
      <Image
        src="/whatsappicon2.svg"
        width={20}
        height={20}
        sizes="20px"
        className={classes.icon}
        alt=""
        aria-hidden="true"
      />
      <p>Chat On WhatsApp</p>
    </a>
  );
}
