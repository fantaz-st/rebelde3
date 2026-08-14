"use client";

import TourSlider from "@/components/TourSlider/TourSlider";

export default function TourRelated({ tour }) {

  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      <TourSlider
        headingId="tour-related-heading"
        eyebrow={"More tours"}
        heading={"Other days you might like"}
        keys={tour.relatedTourKeys}
        exclude={tour.key}
        align="start"
        tone="plain"
      />
    </div>
  );
}
