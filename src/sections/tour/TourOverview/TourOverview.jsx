"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import classes from "./TourOverview.module.css";

export default function TourOverview({ tour }) {
  const t = useTranslations("tourDetail");

  return (
    <section className={classes.wrap} aria-label={t("overviewEyebrow")}>
      <div className={`container grid ${classes.container}`}>
        <div className={classes.head}>
          <p className={classes.eyebrow}>{t("overviewEyebrow")}</p>
          <h2 className={classes.heading}>{t("overviewHeading")}</h2>
        </div>

        <div className={classes.body}>
          {tour.overview.map((para, i) => (
            <p key={i} className={classes.para}>{para}</p>
          ))}
        </div>

        <aside className={classes.facts}>
          {tour.subImg && (
            <div className={classes.subImg}>
              <div className={classes.subImgInner}>
                <Image
                  src={tour.subImg}
                  alt=""
                  fill
                  sizes="(max-width: 991px) 100vw, 30vw"
                  quality={80}
                  className={classes.subImgEl}
                />
              </div>
            </div>
          )}
          <dl className={classes.factsList}>
            {tour.keyFacts.map((f) => (
              <div key={f.label} className={classes.fact}>
                <dt className={classes.factLabel}>{f.label}</dt>
                <dd className={classes.factValue}>{f.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
