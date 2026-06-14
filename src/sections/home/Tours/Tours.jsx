"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import TourCard from "@/components/TourCard/TourCard";
import "swiper/css";
import classes from "./Tours.module.css";
import items from "@/settings/tours";

function useBreakpoints() {
  const [bp, setBp] = useState({ mobile: false, small: false });
  const mqMobileRef = useRef(null);
  const mqSmallRef  = useRef(null);

  useEffect(() => {
    mqMobileRef.current = window.matchMedia("(max-width: 991px)");
    mqSmallRef.current  = window.matchMedia("(max-width: 767px)");

    const sync = () =>
      setBp({
        mobile: mqMobileRef.current.matches,
        small:  mqSmallRef.current.matches,
      });

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
  const { mobile, small } = useBreakpoints();

  const tours = useMemo(
    () =>
      items.map((it) => ({
        key:      it.key,
        href:     `/bespoke-tours#${it.key}`,
        imageSrc: it.thumb,
        imageAlt: it.thumbAlt || "",
        kicker:   it.kicker,
        title:    it.label,
      })),
    [],
  );

  return (
    <section className={classes.wrap} aria-labelledby="tours-heading">
      <div className={`grid ${classes.container}`}>
        <header className={classes.text}>
          <h2 id="tours-heading" className={classes.title}>
            Tailored Journeys. Island by Island.
          </h2>
          <p className={classes.desc}>
            No two days on the Adriatic should ever be the same. Choose your path — hidden coves,
            sunlit harbours, secret beaches. We design each journey around you, your pace, your spirit.
          </p>
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
              <p className={classes.swipeHint}>Swipe to explore →</p>
            </div>
          </SwiperSlide>

          {tours.map((t) => (
            <SwiperSlide key={t.key} className={classes.slide}>
              <TourCard
                href={t.href}
                imageSrc={t.imageSrc}
                imageAlt={t.imageAlt}
                kicker={t.kicker}
                title={t.title}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
