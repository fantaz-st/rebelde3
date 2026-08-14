"use client";

import GallerySlider from "@/components/GallerySlider/GallerySlider";
import classes from "./TourGallery.module.css";

export default function TourGallery({ tour }) {
  if (!tour.gallery || tour.gallery.length === 0) return null;

  return (
    <section className={classes.wrap} aria-label={"Photos"}>
      <div className={`container grid ${classes.container}`}>
        <div className={classes.head}>
          <h2 className={classes.heading}>{"A look at the day"}</h2>
        </div>
      </div>

      {/* Same swipeable rail + Fancybox lightbox as the boat page.
          The group id keeps each tour's slides in their own lightbox. */}
      <GallerySlider
        images={tour.gallery}
        group={`tour-${tour.key}`}
        prevLabel={"Previous"}
        nextLabel={"Next"}
      />
    </section>
  );
}
