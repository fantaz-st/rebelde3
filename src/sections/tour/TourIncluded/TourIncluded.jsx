"use client";

import { useTranslations } from "next-intl";
import RevealImage from "@/components/RevealImage/RevealImage";
import classes from "./TourIncluded.module.css";

export default function TourIncluded({ tour, lead }) {
  const t = useTranslations("tourDetail");

  return (
    <section
      id="included"
      className={classes.wrap}
      aria-label={t("includedHeading")}
    >
      {lead && (
        <RevealImage
          src={lead}
          alt=""
          title={t("includedHeading")}
          height="62vh"
          sizes="100vw"
          className={classes.lead}
        />
      )}

      <div className={`container grid ${classes.container}`}>
        <div className={classes.columns}>
          <div className={classes.column}>
            <h3 className={classes.columnTitle}>{t("includedTitle")}</h3>
            <ul className={classes.list}>
              {tour.included.map((it, i) => (
                <li key={i} className={classes.item}>
                  <span className={classes.check} aria-hidden="true">
                    ✓
                  </span>
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
                  <span className={classes.cross} aria-hidden="true">
                    –
                  </span>
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
