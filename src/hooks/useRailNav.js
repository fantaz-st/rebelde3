"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Prev/next controls for a CSS scroll-snap rail.
 *
 * Replaces Swiper's Navigation module. The rail scrolls natively — this only
 * moves it by one page on click and reports whether either end is reached, so
 * the arrows can be disabled.
 *
 * Usage:
 *   const { railRef, atStart, atEnd, scrollPrev, scrollNext } = useRailNav();
 *   <ul ref={railRef}> … </ul>
 *   <button onClick={scrollPrev} disabled={atStart}>
 */
export function useRailNav(externalRef) {
  const internalRef = useRef(null);
  const railRef = externalRef ?? internalRef;
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 1);
    // 1px of slack: fractional widths mean scrollLeft rarely equals max exactly.
    setAtEnd(el.scrollLeft >= max - 1);
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    sync();
    el.addEventListener("scroll", sync, { passive: true });

    // Card widths are percentage-based, so a resize changes where the end is.
    const ro = new ResizeObserver(sync);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", sync);
      ro.disconnect();
    };
  }, [sync]);

  // One "page" is the visible width, matching Swiper's slidesPerGroup default
  // closely enough that the arrows feel the same.
  const scrollBy = useCallback((direction) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth, behavior: "smooth" });
  }, []);

  const scrollPrev = useCallback(() => scrollBy(-1), [scrollBy]);
  const scrollNext = useCallback(() => scrollBy(1), [scrollBy]);

  return { railRef, atStart, atEnd, scrollPrev, scrollNext };
}
