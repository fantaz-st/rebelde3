"use client";

import { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import classes from "./Tours.module.css";
import TourCard from "@/components/TourCard/TourCard";
import Button from "@/components/Button/Button";
import items from "@/settings/tours";

function useBreakpoints() {
  const [bp, setBp] = useState({ mobile: false, small: false });

  useEffect(() => {
    const mqMobile = window.matchMedia("(max-width: 991px)");
    const mqSmall = window.matchMedia("(max-width: 767px)");

    const sync = () => setBp({ mobile: mqMobile.matches, small: mqSmall.matches });

    sync();
    mqMobile.addEventListener("change", sync);
    mqSmall.addEventListener("change", sync);

    return () => {
      mqMobile.removeEventListener("change", sync);
      mqSmall.removeEventListener("change", sync);
    };
  }, []);

  return bp;
}

export default function Tours() {
  const { mobile, small } = useBreakpoints();

  const tours = useMemo(() => {
    return items.map((it) => ({
      key: it.key,
      href: "/bespoke-expeditions",
      imageSrc: it.thumb,
      kicker: it.kicker,
      title: it.title,
    }));
  }, []);

  return (
    <section className={classes.wrap}>
      <div className={`grid ${classes.container}`}>
        <header className={classes.text}>
          <h2 className={classes.title}>Tailored Journeys. Island by Island.</h2>
          <p className={classes.desc}>No two days on the Adriatic should ever be the same. Choose your path — hidden coves, sunlit harbors, secret beaches. We design each journey around you, your pace, your spirit.</p>
        </header>

        {!mobile ? (
          <div className={classes.list}>
            {tours.map((t) => (
              <TourCard key={t.key} href={t.href} imageSrc={t.imageSrc} kicker={t.kicker} title={t.title} />
            ))}
          </div>
        ) : (
          <Swiper className={classes.swiper} slidesPerView="auto" spaceBetween={small ? 12 : 16} speed={450}>
            {tours.map((t) => (
              <SwiperSlide key={t.key} className={classes.slide}>
                <TourCard href={t.href} imageSrc={t.imageSrc} kicker={t.kicker} title={t.title} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
