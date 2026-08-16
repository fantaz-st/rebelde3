"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { useRailNav } from "@/hooks/useRailNav";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import Rail from "@/components/Rail/Rail";
import classes from "./GallerySlider.module.css";

/**
 * Horizontal gallery: a CSS scroll-snap rail, Fancybox for the lightbox.
 *
 * This was written inline in SectionItem (the boat page) and nowhere else,
 * so tour pages had a static grid instead. Both use this now.
 *
 * Props
 *   images  [{ src, caption }]
 *   group   unique id for the Fancybox group — slides only group with
 *           their own gallery, so two galleries on one page don't merge
 *   prevLabel / nextLabel  accessible names for the arrows
 */
export default function GallerySlider({
  images = [],
  group,
  prevLabel = "Previous",
  nextLabel = "Next",
  className = "",
}) {
  const galleryRef = useRef(null);
  const { railRef, atStart, atEnd, scrollPrev, scrollNext } = useRailNav();

  useEffect(() => {
    const container = galleryRef.current;
    if (!container) return;

    Fancybox.bind(container, `[data-fancybox="${group}"]`, {
      Thumbs: { type: "modern" },
      Carousel: { infinite: true },
    });

    return () => {
      Fancybox.unbind(container);
      Fancybox.close();
    };
  }, [group]);

  if (images.length === 0) return null;

  return (
    <div className={`container ${classes.wrap} ${className}`.trim()}>
      <div className={classes.control}>
        <button
          type="button"
          onClick={scrollPrev}
          disabled={atStart}
          className={`${classes.btn} ${atStart ? classes.navDisabled : ""}`}
          aria-label={prevLabel}
        >
          <svg viewBox="0 0 18 18" fill="none" width="18" height="18" aria-hidden="true">
            <path d="M7.875 3.938 2.813 9l5.062 5.063M15.188 9H3.5"
              stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={scrollNext}
          disabled={atEnd}
          className={`${classes.btn} ${atEnd ? classes.navDisabled : ""}`}
          aria-label={nextLabel}
        >
          <svg viewBox="0 0 18 18" fill="none" width="18" height="18" aria-hidden="true">
            <path d="M11 3.938 16.063 9 11 14.063M15.188 9H3.5"
              stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className={classes.main} ref={galleryRef}>
        <Rail
          railRef={railRef}
          className={classes.rail}
          ariaLabel="Gallery"
        >
          {images.map((g, i) => (
            <li key={i} className={classes.slide}>
              <a
                href={g.src}
                data-fancybox={group}
                data-caption={g.caption}
                className={classes.slideLink}
                aria-label={g.caption}
              >
                <div className={classes.slideImg}>
                  <Image
                    src={g.src}
                    alt={g.caption || ""}
                    fill
                    sizes="(max-width: 767px) 80vw, 30vw"
                    className={classes.img}
                  />
                </div>
                {g.caption && <div className={classes.slideCap}>{g.caption}</div>}
              </a>
            </li>
          ))}
        </Rail>
      </div>
    </div>
  );
}
