"use client";

import { useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function SmoothScroll({ children }) {
  const scrollerRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    const scroller = scrollerRef.current;
    const content = contentRef.current;

    window.__RBD_SCROLLER__ = scroller;

    const lenis = new Lenis({
      wrapper: scroller,
      content,
      lerp: 0.1,
      smoothWheel: true,
      smoothTouch: false,
    });

    const onLenisScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onLenisScroll);

    const tick = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      gsap.ticker.remove(tick);
      lenis.off("scroll", onLenisScroll);
      lenis.destroy();
      if (window.__RBD_SCROLLER__ === scroller) delete window.__RBD_SCROLLER__;
    };
  }, []);

  return (
    <div ref={scrollerRef} className="scrollRoot">
      <div ref={contentRef}>{children}</div>
    </div>
  );
}
