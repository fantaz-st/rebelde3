"use client";

import { useTranslations } from "next-intl";
import GallerySlider from "@/components/GallerySlider/GallerySlider";
import classes from "./TourGallery.module.css";

export default function TourGallery({ tour }) {
  const t = useTranslations("tourDetail");
  const tc = useTranslations("common");
  if (!tour.gallery || tour.gallery.length === 0) return null;

  return (
    <section className={classes.wrap} aria-label={t("galleryEyebrow")}>
      <div className={`container grid ${classes.container}`}>
        <div className={classes.head}>
          <h2 className={classes.heading}>{t("galleryHeading")}</h2>
        </div>
      </div>

      {/* Same swipeable rail + Fancybox lightbox as the boat page.
          The group id keeps each tour's slides in their own lightbox. */}
      <GallerySlider
        images={tour.gallery}
        group={`tour-${tour.key}`}
        prevLabel={tc("previous")}
        nextLabel={tc("next")}
      />
    </section>
  );
}
