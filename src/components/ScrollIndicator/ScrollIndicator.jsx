"use client";

import { useScrollPosition } from "@/hooks/useScrollPosition";
import classes from "./ScrollIndicator.module.css";

/**
 * Scroll cue at the bottom of the viewport.
 *
 * Persistent: it stays put the whole way down the page and only stands aside
 * at the very bottom, where there is nothing left to scroll to and it would
 * be pointing at the footer.
 *
 * For a cue that shows only over the hero, pass a threshold — it hides once
 * that many pixels have been scrolled.
 */
export default function ScrollIndicator({ label = "Scroll", hideAfter = null }) {
  const { scrolled, atBottom } = useScrollPosition(hideAfter ?? 999999);
  const hidden = atBottom || (hideAfter !== null && scrolled);

  return (
    <div
      className={`${classes.wrap} ${hidden ? classes.hidden : ""}`}
      // Decorative: it tells you nothing a screen reader user needs, and the
      // page is navigable without it.
      aria-hidden="true"
    >
      <span className={classes.label}>{label}</span>
      <span className={classes.track}>
        <span className={classes.dot} />
      </span>
    </div>
  );
}
