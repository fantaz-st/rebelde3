"use client";

import { useEffect } from "react";

/**
 * Reveal a block of text line by line, each line rising out of its own mask.
 *
 * One mask per LINE is the point. A mask that wraps several lines has a height
 * that changes with viewport width, font size and a late-loading web font, so
 * no percentage offset is ever correct and you end up measuring the box and
 * watching it with a ResizeObserver. Per line, the mask is exactly one line
 * tall and translateY(110%) always clears it — no measurement at all.
 *
 * The CSS fallback must also be translateY(110%) so the copy stays hidden if
 * JS never runs, rather than sitting half-cropped on screen.
 *
 * @param {object} ref       container holding the [data-line-reveal] blocks
 * @param {object} opts
 * @param {number} opts.delay  seconds to wait before revealing
 * @param {boolean} opts.enabled  false = show immediately, no animation
 */
export function useLineReveal(ref, { delay = 0, enabled = true } = {}) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const blocks = Array.from(root.querySelectorAll("[data-line-reveal]"));
    if (!blocks.length) return;

    let timer = null;
    let resizeTimer = null;
    let revealed = false;

    // Wrap each word, read offsetTop to find where the browser actually broke
    // the lines, then rebuild as one mask per line.
    const split = (block) => {
      const text = block.dataset.text || block.textContent.trim();
      block.dataset.text = text;

      block.innerHTML = text
        .split(/\s+/)
        .map((w) => `<span class="lr-w">${w}</span>`)
        .join(" ");

      const words = Array.from(block.querySelectorAll(".lr-w"));
      const lines = [];
      let top = null;
      for (const w of words) {
        if (top === null || Math.abs(w.offsetTop - top) > 2) {
          lines.push([]);
          top = w.offsetTop;
        }
        lines[lines.length - 1].push(w.textContent);
      }

      block.innerHTML = lines
        .map((l) => `<span class="lr-mask"><span class="lr-line">${l.join(" ")}</span></span>`)
        .join("");

      return Array.from(block.querySelectorAll(".lr-line"));
    };

    const layout = () => {
      const lines = blocks.flatMap(split);
      lines.forEach((l) => {
        l.style.transform = revealed ? "translateY(0%)" : "translateY(110%)";
      });
      // Only now is the copy safe to paint: the lines exist and are already
      // pushed out of their masks. The stylesheet keeps the block hidden until
      // this point, otherwise the unsplit text flashes on screen before the
      // effect runs and then vanishes.
      blocks.forEach((b) => {
        b.style.visibility = "visible";
      });
      return lines;
    };

    let lines = layout();

    const reveal = () => {
      revealed = true;
      lines.forEach((line, i) => {
        line.style.transition = "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)";
        line.style.transitionDelay = `${i * 0.09}s`;
        line.style.transform = "translateY(0%)";
      });
    };

    if (!enabled) {
      reveal();
    } else {
      timer = setTimeout(reveal, delay * 1000);
    }

    // Where the lines break changes with width, so re-split — but only while
    // still hidden, or a resize mid-reveal would snap the copy back.
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (revealed) return;
        lines = layout();
      }, 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(timer);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, [ref, delay, enabled]);
}
