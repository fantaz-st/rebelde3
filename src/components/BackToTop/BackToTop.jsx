"use client";

import { useScrollPosition, scrollToTop } from "@/hooks/useScrollPosition";
import classes from "./BackToTop.module.css";

/**
 * Back to top.
 *
 * Sits directly above the WhatsApp button, which appears at the same 300px
 * threshold — the two rise together as one stack rather than one shoving the
 * other around.
 */
export default function BackToTop({ label = "Back to top" }) {
  const { scrolled } = useScrollPosition(300);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`${classes.button} ${scrolled ? classes.visible : ""}`}
      aria-label={label}
      // Hidden from the tab order until it's on screen, so keyboard users
      // don't land on an invisible control at the top of the page.
      tabIndex={scrolled ? 0 : -1}
      aria-hidden={!scrolled}
    >
      <svg viewBox="0 0 18 18" width="18" height="18" fill="none" aria-hidden="true">
        <path
          d="M9 15V3M3.938 8.063 9 3l5.063 5.063"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
