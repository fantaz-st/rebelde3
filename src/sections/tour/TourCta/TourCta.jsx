"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import classes from "./TourCta.module.css";

export default function TourCta() {
  const t = useTranslations("tourDetail");

  return (
    <section className={classes.wrap} aria-label={t("ctaHeading")}>
      <div className={`container ${classes.container}`}>
        <div className={classes.inner}>
          {/* Headline used to splice the first word out of the English tour
              label ("Ready for your Blue day?"). That doesn't survive
              translation, so it's a single translated string now. */}
          <h2 className={classes.heading}>{t("ctaHeading")}</h2>
          <p className={classes.body}>{t("ctaBody")}</p>

          <Link href="/contact" className={classes.button}>
            <span>{t("ctaButton")}</span>
            <span aria-hidden="true" className={classes.buttonArrow}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
