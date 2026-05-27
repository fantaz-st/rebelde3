"use client";

import { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import classes from "./Tours.module.css";
import items from "@/settings/tours";
import TourCard from "./TourCard/TourCard";

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
      imageSrc: it.thumb,
      kicker: it.kicker,
      title: it.label,
    }));
  }, []);

  const handleScrollTo = (targetKey) => {
    const target = document.getElementById(targetKey);
    if (!target) return;

    const scroller = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot");

    if (scroller && scroller !== window) {
      const targetTop =
        target.getBoundingClientRect().top -
        scroller.getBoundingClientRect().top +
        scroller.scrollTop;
      scroller.scrollTo({ top: targetTop, behavior: "smooth" });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className={classes.wrap}>
      <div className={`grid ${classes.container}`}>
        <header className={classes.text}>
          <h2 className={classes.title}>Tailored Journeys. Island by Island.</h2>
          <p className={classes.desc}>
            No two days on the Adriatic should ever be the same. Choose your path — hidden coves, sunlit harbors, secret beaches. We design each journey around you, your pace, your spirit.
          </p>
        </header>

        <Swiper
          className={classes.swiper}
          slidesPerView={mobile ? 1.2 : 4}
          spaceBetween={small ? 12 : 16}
          speed={450}
        >
          <SwiperSlide key="null-tour-slide" className={classes.nullSlide}>
            <div className={classes.inner}>
              <h3>Swipe to explore →</h3>
            </div>
          </SwiperSlide>

          {tours.map((t) => (
            <SwiperSlide key={t.key} className={classes.slide}>
              <TourCard
                targetId={t.key}
                imageSrc={t.imageSrc}
                kicker={t.kicker}
                title={t.title}
                onClick={() => handleScrollTo(t.key)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
