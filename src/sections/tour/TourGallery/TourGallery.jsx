"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import classes from "./TourGallery.module.css";

export default function TourGallery({ tour }) {
  const t = useTranslations("tourDetail");
  if (!tour.gallery || tour.gallery.length === 0) return null;

  return (
    <section className={classes.wrap} aria-label={t("galleryEyebrow")}>
      <div className={`container grid ${classes.container}`}>
        <div className={classes.head}>
          <p className={classes.eyebrow}>{t("galleryEyebrow")}</p>
          <h2 className={classes.heading}>{t("galleryHeading")}</h2>
        </div>
      </div>

      <ul className={classes.gallery}>
        {tour.gallery.map((img, i) => (
          <li key={i} className={classes.item}>
            <figure className={classes.figure}>
              <div className={classes.imgWrap}>
                <Image
                  src={img.src}
                  alt={img.caption || ""}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 33vw"
                  quality={80}
                  className={classes.img}
                />
              </div>
              {img.caption && (
                <figcaption className={classes.caption}>{img.caption}</figcaption>
              )}
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
