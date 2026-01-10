"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const scrollerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const content = contentRef.current;

    ScrollTrigger.defaults({ scroller });

    const lenis = new Lenis({
      wrapper: scroller,
      content,
      lerp: 0.1,
      smoothWheel: true,
      smoothTouch: false,
    });

    ScrollTrigger.scrollerProxy(scroller, {
      scrollTop(value) {
        if (arguments.length) lenis.scrollTo(value, { immediate: true });
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={scrollerRef} className="scrollRoot">
      <div ref={contentRef}>{children}</div>
    </div>
  );
}
