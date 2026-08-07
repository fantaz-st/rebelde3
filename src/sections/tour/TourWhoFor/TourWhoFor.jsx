"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import classes from "./TourWhoFor.module.css";

export default function TourWhoFor({ tour }) {
  const t = useTranslations("tourDetail");
  const w = tour.whoItsFor;
  if (!w) return null;

  return (
    <section className={classes.wrap} aria-label={t("whoForHeading")}>
      <div className={`container grid ${classes.container}`}>
        <div className={classes.head}>
          <p className={classes.eyebrow}>{t("whoForEyebrow")}</p>
          <h2 className={classes.heading}>{t("whoForHeading")}</h2>
        </div>

        <div className={classes.body}>
          <p className={classes.para}>{w.paragraph}</p>

          {w.tags && w.tags.length > 0 && (
            <ul className={classes.tags}>
              {w.tags.map((tag) => (
                <li key={tag} className={classes.tag}>{tag}</li>
              ))}
            </ul>
          )}

          {w.compareLink && (
            <p className={classes.compare}>
              <span className={classes.compareLabel}>{t("compareLabel")}</span>
              <Link href={`/tours/${w.compareLink.slug}`} className={classes.compareLink}>
                <span>{w.compareLink.label}</span>
                <span aria-hidden="true" className={classes.compareArrow}>→</span>
              </Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
