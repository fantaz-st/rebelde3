"use client";

import { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslations } from "next-intl";
import "swiper/css";

import tours, { getTour } from "@/settings/tours";
import { buildTourCard } from "@/lib/tourView";
import TourCard from "@/components/TourCard/TourCard";
import classes from "./TourSlider.module.css";

/**
 * The one way tours get listed anywhere on the site.
 *
 * Home, /tours and the "other days you might like" block on
 * tour detail pages all render this — same Swiper, same TourCard. Each call
 * site passes its own copy and picks a background tone; nothing else varies.
 *
 * Props
 *   eyebrow, heading, lede  optional head copy (already translated)
 *   keys                    optional tour keys to show, in order (default: all)
 *   exclude                 tour key to leave out (used on detail pages)
 *   tone                    "cream" (default) | "plain" — section background
 *   align                   "center" (default) | "start" — head alignment
 *   pullUp                  home page only: the -130vh overlap onto the hero
 */
export default function TourSlider({
  eyebrow,
  heading,
  lede,
  keys,
  exclude,
  tone = "cream",
  align = "center",
  pullUp = false,
  headingId,
}) {
  const t = useTranslations("common");
  const ti = useTranslations("tourItems");

  const cards = useMemo(() => {
    const source = keys ? keys.map(getTour).filter(Boolean) : tours;
    return source
      .filter((tour) => tour.key !== exclude)
      .map((tour) => buildTourCard(tour, ti));
  }, [keys, exclude, ti]);

  if (cards.length === 0) return null;

  const wrapClass = [
    classes.wrap,
    classes[tone],
    pullUp && classes.pullUp,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={wrapClass} aria-labelledby={headingId}>
      <div className={`container grid ${classes.container}`}>
        {(eyebrow || heading || lede) && (
          <header className={`${classes.text} ${classes[align]}`}>
            {eyebrow && <p className={classes.eyebrow}>{eyebrow}</p>}
            {heading && (
              <h2 id={headingId} className={classes.title}>
                {heading}
              </h2>
            )}
            {lede && <p className={classes.desc}>{lede}</p>}
          </header>
        )}

        <Swiper
          className={classes.swiper}
          slidesPerView={1.2}
          spaceBetween={12}
          breakpoints={{
            768: { slidesPerView: 2.2, spaceBetween: 16 },
            992: { slidesPerView: Math.min(cards.length, 4), spaceBetween: 16 },
          }}
          speed={450}
          a11y={{ enabled: true }}
        >
          {/* Mobile-only lead-in slide — hidden at desktop where all cards fit. */}
          <SwiperSlide className={classes.nullSlide} aria-hidden="true">
            <div className={classes.inner}>
              <p className={classes.swipeHint}>{t("swipeHint")}</p>
            </div>
          </SwiperSlide>

          {cards.map((tour) => (
            <SwiperSlide key={tour.key} className={classes.slide}>
              <TourCard tour={tour} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
