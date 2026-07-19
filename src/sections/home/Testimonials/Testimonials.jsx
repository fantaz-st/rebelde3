"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import TestimonialCard from "@/components/TestimonialCard/TestimonialCard";
import "swiper/css";
import "swiper/css/scrollbar";
import classes from "./Testimonials.module.css";
import items from "@/settings/testimonials";
import Button from "@/components/Button/Button";

export default function Testimonials() {
  return (
    <section className={classes.wrap} aria-labelledby="tours-heading">
      <div className={`grid ${classes.container}`}>
        <header className={classes.text}>
          <h2 id="tours-heading" className={classes.title}>What our guests say</h2>
          <div className={classes.platforms}>
            <div className={classes.platform}>
              <span className={classes.platformText}>Rated 5.0 on</span>
              <img src="/images/logos/tripadvisor.svg" alt="Tripadvisor logo" />
            </div>
            <div className={classes.platform}>
              <span className={classes.platformText}>Rated 5.0 on</span>
              <img src="/images/logos/google.svg" alt="Google logo" />
            </div>
          </div>
        </header>

        <Swiper
          className={classes.swiper}
          modules={[Scrollbar]}
          slidesPerView={1.2}
          spaceBetween={12}
          breakpoints={{ 992: { slidesPerView: 4, spaceBetween: 16 } }}
          speed={450}
          scrollbar={{ draggable: true, el: `.${classes.scrollbar}` }}
          a11y={{ enabled: true }}
        >
          <SwiperSlide key="null-tour-slide" className={classes.nullSlide} aria-hidden="true">
            <div className={classes.inner}>
              <p className={classes.swipeHint}>Swipe to read reviews →</p>
            </div>
          </SwiperSlide>

          {items.map((test) => (
            <SwiperSlide key={test.id} className={classes.slide}>
              <TestimonialCard
                title={test.title}
                text={test.text}
                name={test.name}
                tour={test.tour}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Scrollbar renders outside swiper so it's not clipped */}
        <div className={classes.scrollbar} />
      </div>
<div className={classes.ctaInner}>
                <Button href="/https://www.tripadvisor.com/Attraction_Review-g295370-d28042808-Reviews-Rebelde_boats_Private_Boat_Tours_from_Split-Split_Split_Dalmatia_County_Dalmatia.html" variant="white" size="lg">Read all reviews</Button>
                </div>
      
    </section>
  );
}
