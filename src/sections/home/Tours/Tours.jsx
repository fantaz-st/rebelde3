"use client";

import { useTranslations } from "next-intl";
import TourSlider from "@/components/TourSlider/TourSlider";

export default function Tours() {
  const t = useTranslations("tours");

  return (
    <TourSlider
      headingId="tours-heading"
      heading={t("heading")}
      lede={t("desc")}
      pullUp
    />
  );
}
