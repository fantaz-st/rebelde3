"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { heroGrid, HERO_INDEX, tileFor } from "@/settings/heroGrid";
import { useLineReveal } from "@/hooks/useLineReveal";
import { TIME_SCALE, T, realSeconds } from "@/lib/introTiming";
import classes from "./GridHero.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const COLS = 5;
const ROWS = 5;
/** A tile is 1/5 of its column, so it needs ~5 of its own heights to clear it. */
const OFF = 520;

/** How far the wall zooms. The centre tile fills the viewport at this scale. */
const HERO_SCALE = 6;

/** The old hero crept from 1 to 1.08 as it blurred; same drift, applied on top. */
const SCROLL_DRIFT = 1.08;

/**
 * How long to hold the timeline waiting for tiles, in ms.
 *
 * Deliberately short. Nothing is on screen for the first timeline second —
 * the columns are rising but their tiles are off screen too — so the
 * choreography already contains its own loading buffer. This only guards the
 * pathological case where the very first frame would be empty rectangles.
 *
 * Set to 0 to start the instant the component hydrates.
 */
const TILE_WAIT_MS = 200;

/** The image the zoom lands on — this IS the hero photograph. */
const HERO_IMAGE = heroGrid[HERO_INDEX];

/**
 * The hero.
 *
 * A wall of images assembles itself, then the whole grid scales 6x into the
 * centre tile — and stays there. That tile is the hero image: it is not a
 * curtain over a hero underneath, there is nothing underneath. The zoom ends
 * and the page simply is a full-bleed photograph with the copy over it.
 *
 * From that point it behaves exactly as the old hero did: sticky for a
 * viewport and a half, blurring and darkening as you scroll while the copy
 * fades, so the Gallery scrolls over a blurred backdrop.
 */
export default function GridHero() {
  const wrapRef = useRef(null);
  const gridRef = useRef(null);
  const blurRef = useRef(null);
  const backdropRef = useRef(null);
  const textRef = useRef(null);

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useLineReveal(textRef, {
    delay: realSeconds(T.copy),
    enabled: !reducedMotion,
  });

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const grid = gridRef.current;
      if (!wrap || !grid) return;

      const scroller =
        window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot") || window;

      /* ── Scroll behaviour, identical to the hero it replaces ────────── */
      const scrollTl = () => {
        gsap.set(blurRef.current, { autoAlpha: 0, scale: 1 });
        gsap.set(backdropRef.current, { autoAlpha: 0 });
        gsap.set(textRef.current, { autoAlpha: 1 });

        return gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: wrap,
              scroller: scroller === window ? undefined : scroller,
              start: "top top",
              end: "+=80%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          })
          // The old hero scaled its .bg wrapper 1 -> 1.08, and that wrapper
          // held both the sharp image and the blur, so the whole thing drifted
          // forward together as it softened. Here the two are siblings, so
          // both get the drift to keep them locked.
          .to(gridRef.current, { scale: HERO_SCALE * SCROLL_DRIFT }, 0)
          .to(blurRef.current, { scale: SCROLL_DRIFT }, 0)
          .to(blurRef.current, { autoAlpha: 1 }, 0)
          .to(backdropRef.current, { autoAlpha: 1 }, 0)
          .to(textRef.current, { autoAlpha: 0 }, 0);
      };

      /* ── Reduced motion: land on the final frame, no assembly ───────── */
      const clearIntroMarker = () =>
        wrap.querySelector("[data-intro]")?.removeAttribute("data-intro");

      if (reducedMotion) {
        clearIntroMarker();
        // Explicitly, not via a CSS media query: GSAP owns these transforms
        // the moment it touches them, so clear them here too.
        gsap.set(".gh-col", { y: 0, yPercent: 0 });
        gsap.set(".gh-item", { y: 0, yPercent: 0 });
        gsap.set(grid, { scale: HERO_SCALE });
        document.documentElement.classList.remove("is-loading");
        scrollTl();
        return;
      }

      document.documentElement.classList.add("is-loading");

      // Re-assert the stylesheet's start state — and note `y: 0` on every one
      // of these. It is load-bearing.
      //
      // GSAP seeds its transform cache from the element's COMPUTED transform
      // the first time it touches it. The stylesheet sets translateY(520%),
      // which computes to a pixel matrix, so GSAP reads it as `y: <px>` rather
      // than as a percentage — and then adds our yPercent on top of it. The
      // tiles end up at roughly double the offset, and animating yPercent to 0
      // leaves those parsed pixels behind, stranding them off screen.
      // Zeroing `y` explicitly makes yPercent the only translate in play.
      gsap.set(".gh-col-odd", { y: 0, yPercent: 100 });
      gsap.set(".gh-col-even", { y: 0, yPercent: 0 });
      gsap.set(".gh-col-odd .gh-item", { y: 0, yPercent: OFF });
      gsap.set(".gh-col-even .gh-item", { y: 0, yPercent: -OFF });
      gsap.set(grid, { scale: 1 });

      const tl = gsap.timeline({
        paused: true,
        onComplete: () => {
          clearIntroMarker();
          document.documentElement.classList.remove("is-loading");
          // The grid holds at scale 6 — the centre tile IS the hero now.
          scrollTl();
          ScrollTrigger.refresh(true);
        },
      });
      tl.timeScale(TIME_SCALE);

      // Absolute start times: relative "-=n" offsets resolve against the
      // growing timeline end and turn the simultaneous column move into a wave.
      tl.to(".gh-col", { y: 0, yPercent: 0, duration: 3, ease: "power4.inOut" }, T.columnsIn);

      tl.to(".gh-c1 .gh-item", { y: 0, yPercent: 0, stagger: 0.25, duration: 3, ease: "power4.inOut" }, T.tilesIn);
      tl.to(".gh-c2 .gh-item", { y: 0, yPercent: 0, stagger: -0.25, duration: 3, ease: "power4.inOut" }, T.tilesIn);
      tl.to(".gh-c3 .gh-item", { y: 0, yPercent: 0, stagger: 0.25, duration: 3, ease: "power4.inOut" }, T.tilesIn);
      tl.to(".gh-c4 .gh-item", { y: 0, yPercent: 0, stagger: -0.25, duration: 3, ease: "power4.inOut" }, T.tilesIn);
      tl.to(".gh-c5 .gh-item", { y: 0, yPercent: 0, stagger: 0.25, duration: 3, ease: "power4.inOut" }, T.tilesIn);

      // The wall rushes forward and stops. No fade, no handoff, no removal.
      tl.to(grid, { scale: HERO_SCALE, duration: 4, ease: "power4.inOut" }, T.zoom);

      // Start now if the tiles are already decoded, otherwise give them a very
      // short grace period. The old 900ms cap was the delay before the wall
      // began moving — and it was buying insurance the timeline already has.
      const pending = Array.from(wrap.querySelectorAll("img")).filter((i) => !i.complete);

      if (!pending.length || TILE_WAIT_MS === 0) {
        tl.play();
      } else {
        Promise.race([
          Promise.all(
            pending.map(
              (img) =>
                new Promise((res) => {
                  img.addEventListener("load", res, { once: true });
                  img.addEventListener("error", res, { once: true });
                }),
            ),
          ),
          new Promise((res) => setTimeout(res, TILE_WAIT_MS)),
        ]).then(() => tl.play());
      }
    },
    { scope: wrapRef },
  );

  return (
    <div className={classes.wrap} ref={wrapRef}>
      <section
        className={classes.hero}
        data-hero
        // Present in the server-rendered HTML and removed when the intro
        // finishes. CSS keys the header off it, so the header is hidden from
        // the first painted frame — a class added by JS arrives too late and
        // the header flashes before it applies.
        data-intro
        aria-label="Private boat tours from Split, Croatia"
      >
        <div className={classes.inner}>
          {/* The wall. After the zoom the centre tile fills the viewport. */}
          <div ref={gridRef} className={classes.grid} aria-hidden="true">
            {Array.from({ length: COLS }, (_, c) => (
              <div
                key={c}
                className={`gh-col gh-c${c + 1} ${
                  c % 2 === 0 ? "gh-col-odd" : "gh-col-even"
                } ${classes.col} ${c % 2 === 0 ? classes.colOdd : classes.colEven}`}
              >
                {Array.from({ length: ROWS }, (_, r) => {
                  const isHero = c === 2 && r === 2;
                  return (
                    <div key={r} className={`gh-item ${classes.item}`}>
                      <img
                        src={isHero ? HERO_IMAGE : tileFor(c, r)}
                        alt=""
                        className={classes.img}
                        {...(isHero
                          ? { fetchPriority: "high" }
                          : { loading: "eager", decoding: "async" })}
                        onError={(e) => {
                          if (process.env.NODE_ENV !== "production") {
                            console.warn(
                              `[GridHero] tile failed: ${e.currentTarget.getAttribute("src")} — check src/settings/heroGrid.js`,
                            );
                          }
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Blur + darken layers over the settled hero, driven by scroll. */}
          <div ref={blurRef} className={classes.blur} aria-hidden="true">
            <img src={HERO_IMAGE} alt="" className={classes.img} />
          </div>
          <div ref={backdropRef} className={classes.backdrop} aria-hidden="true" />

          <div className={classes.main}>
            <div className={`container grid ${classes.textGrid}`}>
              <div ref={textRef} className={classes.text} data-hero-content>
                <h1 className={classes.title} data-line-reveal>
                  Rules are for ferries.
                </h1>
                <p className={classes.subtitle} data-line-reveal>
                  Private tours from Split. One boat, one group a day, and a route
                  we&rsquo;ll change halfway through if you want.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.innerEmptyBlock} />
      </section>
      <div className={classes.outerEmptyBlock} />
    </div>
  );
}
