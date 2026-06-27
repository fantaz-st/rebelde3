"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import TourCard from "@/components/TourCard/TourCard";
import "swiper/css";
import { useTranslations } from "next-intl";
import classes from "./Tours.module.css";
import items from "@/settings/tours";

function useBreakpoints() {
  const [bp, setBp] = useState({ mobile: false, small: false });
  const mqMobileRef = useRef(null);
  const mqSmallRef  = useRef(null);

  useEffect(() => {
    mqMobileRef.current = window.matchMedia("(max-width: 991px)");
    mqSmallRef.current  = window.matchMedia("(max-width: 767px)");
    const sync = () => setBp({ mobile: mqMobileRef.current.matches, small: mqSmallRef.current.matches });
    sync();
    mqMobileRef.current.addEventListener("change", sync);
    mqSmallRef.current.addEventListener("change", sync);
    return () => {
      mqMobileRef.current.removeEventListener("change", sync);
      mqSmallRef.current.removeEventListener("change", sync);
    };
  }, []);

  return bp;
}

export default function Tours() {
  const t  = useTranslations("tours");
  const ti = useTranslations("tourItems");
  const { mobile, small } = useBreakpoints();

  const tours = useMemo(
    () =>
      items.map((it) => ({
        key:      it.key,
        href:     `/bespoke-tours#${it.key}`,
        imageSrc: it.thumb,
        imageAlt: it.thumbAlt || "",
        kicker:   ti(`${it.key}.kicker`),
        title:    ti(`${it.key}.label`),
      })),
    [ti],
  );

  return (
    <section className={classes.wrap} aria-labelledby="tours-heading">
      <div className={`grid ${classes.container}`}>
        <header className={classes.text}>
          <h2 id="tours-heading" className={classes.title}>{t("heading")}</h2>
          <p className={classes.desc}>{t("desc")}</p>
        </header>

        <Swiper
          className={classes.swiper}
          slidesPerView={mobile ? 1.2 : 4}
          spaceBetween={small ? 12 : 16}
          speed={450}
          a11y={{ enabled: true }}
        >
          <SwiperSlide key="null-tour-slide" className={classes.nullSlide} aria-hidden="true">
            <div className={classes.inner}>
              <p className={classes.swipeHint}>{t("swipeHint")}</p>
            </div>
          </SwiperSlide>

          {tours.map((tour) => (
            <SwiperSlide key={tour.key} className={classes.slide}>
              <TourCard
                href={tour.href}
                imageSrc={tour.imageSrc}
                imageAlt={tour.imageAlt}
                kicker={tour.kicker}
                title={tour.title}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
