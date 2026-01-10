"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Swiper, SwiperSlide, useSwiperSlide } from "swiper/react";
import "swiper/css";
import classes from "./HomeMap.module.css";
import Button from "../Button/Button";
import items from "./items";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function PinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 25 24" fill="none">
      <path
        d="M12.5 6a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5m0 6a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5m0-10.5a8.26 8.26 0 0 0-8.25 8.25c0 2.944 1.36 6.064 3.938 9.023a23.8 23.8 0 0 0 3.885 3.591.75.75 0 0 0 .861 0 23.8 23.8 0 0 0 3.879-3.59c2.573-2.96 3.937-6.08 3.937-9.024A8.26 8.26 0 0 0 12.5 1.5m0 19.313c-1.55-1.22-6.75-5.696-6.75-11.063a6.75 6.75 0 0 1 13.5 0c0 5.365-5.2 9.844-6.75 11.063"
        fill="currentColor"
      />
    </svg>
  );
}

function MobileCard({ slide, index }) {
  const { isActive } = useSwiperSlide();
  const num = String(index + 1).padStart(2, "0");

  if (slide.isFullMap) {
    return (
      <div className={[classes.card, classes.fullMapCard, isActive ? classes.active : ""].join(" ")}>
        <div className={classes.cardInner}>
          <div className={classes.cardInfo}>
            <h2 className={classes.fullMapTitle}>
              Swipe
              <br />
              to explore →
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <a href="/bespoke-expeditions" className={[classes.card, isActive ? classes.active : ""].join(" ")}>
      <div className={classes.cardInner}>
        <div className={classes.cardNum}>{num}</div>

        <div className={classes.cardInfo}>
          <div className={classes.cardLabel}>{slide.label}</div>
          <div className={classes.cardTitle}>{slide.title}</div>
        </div>

        <div className={classes.cardThumb}>
          <Image src={slide.thumb} alt="" fill className={classes.imgCover} sizes="84vw" />
          <div className={classes.cardThumbOverlay} />
        </div>
      </div>
    </a>
  );
}

export default function HomeMap() {
  const wrapRef = useRef(null);
  const swiperRef = useRef(null);

  const [bp, setBp] = useState({ mobile: false, small: false });
  const [desktopActive, setDesktopActive] = useState(null);

  const mobileActiveRef = useRef(0);
  const [mobileActive, setMobileActive] = useState(0);

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

  const slides = useMemo(() => {
    if (!bp.mobile) return items;
    return [{ key: "__full_map__", isFullMap: true }, ...items];
  }, [bp.mobile]);

  const activeDesktopIdx = bp.mobile ? null : desktopActive;

  const activeMobileIdx = useMemo(() => {
    if (!bp.mobile) return null;
    return mobileActive === 0 ? null : mobileActive - 1;
  }, [bp.mobile, mobileActive]);

  useGSAP(
    () => {
      const scroller = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot");
      const el = wrapRef.current;
      if (!scroller || !el) return;

      const mapImg = el.querySelector(`.${classes.mapImg}`);
      if (!mapImg) return;

      gsap.fromTo(
        mapImg,
        { autoAlpha: 0, scale: 1.4 },
        {
          autoAlpha: 1,
          scale: 1,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: "top 85%",
            end: "top top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    },
    { scope: wrapRef }
  );

  useEffect(() => {
    if (!bp.mobile) return;

    requestAnimationFrame(() => {
      swiperRef.current?.slideTo(0, 0);
      mobileActiveRef.current = 0;
      setMobileActive(0);
    });
  }, [bp.mobile]);

  const clearDesktopHover = () => {
    if (!bp.mobile) setDesktopActive(null);
  };

  const onPinActivate = (idx) => {
    setDesktopActive(idx);
  };

  const onSwiperActive = (idx) => {
    if (mobileActiveRef.current === idx) return;
    mobileActiveRef.current = idx;
    setMobileActive(idx);
  };

  return (
    <section ref={wrapRef} className={classes.mapWrap} onMouseLeave={clearDesktopHover}>
      <div className={classes.map}>
        <div className={classes.container}>
          <div className={classes.mapText}>
            <h2 className={classes.title}>Tailored Journeys. Island by Island.</h2>
            <p className={classes.desc}>No two days on the Adriatic should ever be the same. Choose your path — hidden coves, sunlit harbors, secret beaches. We design each journey around you, your pace, your spirit.</p>
            <div className={classes.cta}>
              <Button variant="ghost" size="lg" href="/bespoke-expeditions">
                EXPLORE TOURS
              </Button>
            </div>
          </div>

          <div className={classes.mapInner}>
            <div className={classes.mapHead}>
              <div className={classes.mapImg}>
                <div className={classes.mapImgInner}>
                  <Image src="/images/map/home-map.png" alt="" width={1920} height={1138} className={classes.imgDefault} sizes="90vmax" priority={false} />
                </div>

                <div className={classes.mapOverlay}>
                  <div className={classes.location}>
                    <div className={classes.locationList}>
                      {items.map((it, idx) => {
                        const isActive = activeDesktopIdx === idx;
                        return (
                          <div key={it.key} className={[classes.locationItem, isActive ? classes.active : ""].join(" ")}>
                            <button type="button" className={classes.locationIc} style={{ left: `${it.leftPct}%`, top: `${it.topPct}%` }} onMouseEnter={() => (!bp.mobile ? onPinActivate(idx) : null)} aria-label={it.title}>
                              <div className={classes.locationIcInner}>
                                <PinIcon />
                              </div>
                              <div className={classes.locationIcBg}>
                                <div className={[classes.locationIcInner, classes.clone].join(" ")}>
                                  <PinIcon />
                                </div>
                              </div>
                            </button>

                            <div className={classes.locationMap}>
                              <div className={classes.mapLayer}>
                                <Image src={it.mapDesktop} alt="" fill className={classes.imgContain} sizes="90vmax" />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className={classes.mobileMaps}>
                  <div className={[classes.mobileMapItem, mobileActive === 0 ? classes.active : ""].join(" ")}>
                    <div className={classes.mapLayer}>
                      <Image src="/images/map/full-map-mb.png" alt="" fill className={classes.imgContain} sizes="100vw" />
                    </div>
                  </div>

                  {items.map((it, idx) => (
                    <div key={it.key} className={[classes.mobileMapItem, activeMobileIdx === idx ? classes.active : ""].join(" ")}>
                      <div className={classes.mapLayer}>
                        <Image src={it.mapMobile} alt="" fill className={classes.imgContain} sizes="100vw" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={classes.destin}>
              {!bp.mobile ? (
                <div className={classes.destinGrid}>
                  {items.map((it, idx) => {
                    const isActive = desktopActive === idx;
                    const num = String(idx + 1).padStart(2, "0");

                    return (
                      <a key={it.key} href="/bespoke-expeditions" className={[classes.card, isActive ? classes.active : ""].join(" ")} onMouseEnter={() => setDesktopActive(idx)}>
                        <div className={classes.cardInner}>
                          <div className={classes.cardPin}>
                            <div className={classes.pinBox}>
                              <div className={classes.pinBoxInner}>
                                <PinIcon />
                              </div>
                              <div className={classes.pinWave}>
                                <div className={[classes.pinBoxInner, classes.clone].join(" ")}>
                                  <PinIcon />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className={classes.cardInfo}>
                            <span className={classes.cardLabel}>{it.label}</span>
                            <h4 className={classes.cardTitle}>{it.title}</h4>
                          </div>

                          <div className={classes.cardThumb}>
                            <Image src={it.thumb} alt="" fill className={classes.imgCover} sizes="25vw" />
                            <div className={classes.cardThumbOverlay} />
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              ) : (
                <Swiper
                  className={classes.swiper}
                  slidesPerView="auto"
                  spaceBetween={bp.small ? 12 : 16}
                  speed={450}
                  centeredSlides={false}
                  onSwiper={(sw) => {
                    swiperRef.current = sw;
                    mobileActiveRef.current = sw.activeIndex;
                    setMobileActive(sw.activeIndex);
                    sw.slideTo(0, 0);
                  }}
                  onActiveIndexChange={(sw) => onSwiperActive(sw.activeIndex)}
                >
                  {slides.map((s, i) => (
                    <SwiperSlide key={s.key} className={classes.swiperSlide}>
                      <MobileCard slide={s} index={i === 0 ? 0 : i - 1} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>

            {bp.mobile && <div className={classes.mapGradient} />}
          </div>
        </div>
      </div>
    </section>
  );
}
