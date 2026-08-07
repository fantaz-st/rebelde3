"use client";

import { useTranslations } from "next-intl";
import classes from "./TourIncluded.module.css";

export default function TourIncluded({ tour }) {
  const t = useTranslations("tourDetail");

  return (
    <section className={classes.wrap} aria-label={t("includedHeading")}>
      <div className={`container grid ${classes.container}`}>
        <div className={classes.head}>
          <p className={classes.eyebrow}>{t("includedEyebrow")}</p>
          <h2 className={classes.heading}>{t("includedHeading")}</h2>
        </div>

        <div className={classes.columns}>
          <div className={classes.column}>
            <h3 className={classes.columnTitle}>{t("includedTitle")}</h3>
            <ul className={classes.list}>
              {tour.included.map((it, i) => (
                <li key={i} className={classes.item}>
                  <span className={classes.check} aria-hidden="true">✓</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${classes.column} ${classes.columnNot}`}>
            <h3 className={classes.columnTitle}>{t("notIncludedTitle")}</h3>
            <ul className={classes.list}>
              {tour.notIncluded.map((it, i) => (
                <li key={i} className={classes.item}>
                  <span className={classes.cross} aria-hidden="true">–</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
