"use client";

import { useRef } from "react";
import { useRailNav } from "@/hooks/useRailNav";
import styles from "./Rail.module.css";

function Arrow({ dir }) {
  return (
    <svg viewBox="0 0 18 18" fill="none" width="18" height="18" aria-hidden="true">
      <path
        d={dir === "prev" ? "M7.875 3.938 2.813 9l5.062 5.063M15.188 9H3.5" : "M11 3.938 16.063 9 11 14.063M15.188 9H3.5"}
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * The scroll-snap rail every slider sits in.
 *
 * A thin client component on purpose: the arrows need state, but the cards
 * inside don't. Because they're passed as `children`, TourSlider and
 * Testimonials stay server components and their cards ship no JS — only this
 * wrapper hydrates.
 *
 * With `arrows`, the rail is wrapped in a column. The wrapper — not the <ul> —
 * takes the parent's grid slot via `wrapClassName`, because a wrapper that
 * isn't placed leaves the buttons with nowhere to go.
 *
 * `arrows` is for rails that have no controls of their own. GallerySlider and
 * SectionItem place their own buttons in a header row and drive them with
 * useRailNav directly, so they leave it off and pass their own `railRef`.
 *
 * No explicit `role` on the <ul>: it would override the implicit role="list"
 * and orphan the <li> children in the accessibility tree.
 */
export default function Rail({
  railRef,
  className,
  wrapClassName,
  ariaLabel,
  style,
  arrows = false,
  prevLabel = "Previous",
  nextLabel = "Next",
  children,
}) {
  const internal = useRef(null);
  const ref = railRef ?? internal;
  const nav = useRailNav(ref);

  // Cards are <a> wrapping <img>; without this you can pick one up and
  // ghost-drag it around the page.
  const onDragStart = (e) => e.preventDefault();

  const list = (
    <ul
      ref={ref}
      className={className}
      tabIndex={0}
      aria-label={ariaLabel}
      style={style}
      onDragStart={onDragStart}
    >
      {children}
    </ul>
  );

  if (!arrows) return list;

  return (
    <div className={wrapClassName ? `${styles.wrap} ${wrapClassName}` : styles.wrap}>
      {list}
      <div className={styles.nav}>
        <button
          type="button"
          onClick={nav.scrollPrev}
          disabled={nav.atStart}
          className={styles.btn}
          aria-label={prevLabel}
        >
          <Arrow dir="prev" />
        </button>
        <button
          type="button"
          onClick={nav.scrollNext}
          disabled={nav.atEnd}
          className={styles.btn}
          aria-label={nextLabel}
        >
          <Arrow dir="next" />
        </button>
      </div>
    </div>
  );
}
