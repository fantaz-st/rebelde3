"use client";

import TourSlider from "@/components/TourSlider/TourSlider";

/**
 * Four tour cards as "starting points" — links to /tours/[slug].
 */
export default function BespokeStarting() {

  return (
    <TourSlider
      headingId="bespoke-starting-heading"
      eyebrow="Starting points"
      heading="Where your day begins"
      lede="We pick you up wherever suits you — Split promenade, Trogir, or your hotel's nearest jetty."
      align="start"
    />
  );
}
