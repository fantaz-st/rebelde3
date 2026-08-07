"use client";

import { useTranslations } from "next-intl";
import classes from "./TourItinerary.module.css";

export default function TourItinerary({ tour }) {
  const t = useTranslations("tourDetail");

  return (
    <section className={classes.wrap} aria-label={t("itineraryEyebrow")}>
      <div className={`container grid ${classes.container}`}>
        <div className={classes.head}>
          <p className={classes.eyebrow}>{t("itineraryEyebrow")}</p>
          <h2 className={classes.heading}>{t("itineraryHeading")}</h2>
        </div>

        <ol className={classes.stops}>
          {tour.itinerary.map((stop, i) => (
            <li key={i} className={classes.stop}>
              <span className={classes.stopNumber} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className={classes.stopContent}>
                <h3 className={classes.stopTitle}>{stop.title}</h3>
                <p className={classes.stopDesc}>{stop.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
