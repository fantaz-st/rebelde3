"use client";

import { useTranslations } from "next-intl";
import TourSlider from "@/components/TourSlider/TourSlider";

export default function TourRelated({ tour }) {
  const t = useTranslations("tourDetail");

  return (
    <TourSlider
      headingId="tour-related-heading"
      eyebrow={t("relatedEyebrow")}
      heading={t("relatedHeading")}
      keys={tour.relatedTourKeys}
      exclude={tour.key}
      align="start"
      tone="plain"
    />
  );
}
