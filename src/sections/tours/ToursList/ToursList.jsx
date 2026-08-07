"use client";

import { useTranslations } from "next-intl";
import TourSlider from "@/components/TourSlider/TourSlider";

export default function ToursList() {
  const t = useTranslations("toursIndex");

  return (
    <TourSlider
      headingId="tours-list-heading"
      eyebrow={t("eyebrow")}
      heading={t("browseHeading")}
      lede={t("intro")}
      align="start"
    />
  );
}
