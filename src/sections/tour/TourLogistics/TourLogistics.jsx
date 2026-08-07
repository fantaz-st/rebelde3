"use client";

import { useTranslations } from "next-intl";
import classes from "./TourLogistics.module.css";

export default function TourLogistics({ tour }) {
  const t = useTranslations("tourDetail");
  if (!tour.logistics || tour.logistics.length === 0) return null;

  return (
    <section className={classes.wrap} aria-label={t("logisticsEyebrow")}>
      <div className={`container grid ${classes.container}`}>
        <div className={classes.head}>
          <p className={classes.eyebrow}>{t("logisticsEyebrow")}</p>
          <h2 className={classes.heading}>{t("logisticsHeading")}</h2>
        </div>

        <div className={classes.items}>
          {tour.logistics.map((item, i) => (
            <div key={i} className={classes.item}>
              <h3 className={classes.itemTitle}>{item.title}</h3>
              <p className={classes.itemBody}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
