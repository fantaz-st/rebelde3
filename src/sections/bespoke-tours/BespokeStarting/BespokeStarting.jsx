"use client";

import { useTranslations } from "next-intl";
import TourSlider from "@/components/TourSlider/TourSlider";

/**
 * Four tour cards as "starting points" — links to /tours/[slug].
 */
export default function BespokeStarting() {
  const t = useTranslations("bespokeStarting");

  return (
    <TourSlider
      headingId="bespoke-starting-heading"
      eyebrow={t("eyebrow")}
      heading={t("heading")}
      lede={t("lede")}
      align="start"
    />
  );
}
