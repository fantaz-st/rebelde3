"use client";

import { useEffect, useState } from "react";

/**
 * Scroll state read off the Lenis wrapper.
 *
 * The page doesn't scroll — `.scrollRoot` does — so `window.scrollY` is always
 * 0 here and every scroll-reactive component has to read the container
 * instead. This centralises that, rAF-throttled.
 *
 * @param {number} threshold px scrolled before `scrolled` flips true
 * @returns {{ scrolled: boolean, atBottom: boolean }}
 */
export function useScrollPosition(threshold = 300) {
  const [state, setState] = useState({ scrolled: false, atBottom: false });

  useEffect(() => {
    const el = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot");
    const scroller = el || window;
    const read = () =>
      scroller === window
        ? { y: window.scrollY || 0, max: document.body.scrollHeight - window.innerHeight }
        : { y: scroller.scrollTop || 0, max: scroller.scrollHeight - scroller.clientHeight };

    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const { y, max } = read();
        setState({ scrolled: y > threshold, atBottom: max > 0 && y >= max - 4 });
        raf = null;
      });
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      scroller.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [threshold]);

  return state;
}

/** Scroll back to the top through Lenis, falling back to the raw container. */
export function scrollToTop() {
  const lenis = window.__RBD_LENIS__;
  if (lenis) return lenis.scrollTo(0, { duration: 1.2 });

  const el = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  (el || window).scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
}
