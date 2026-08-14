"use client";

import { useTranslations } from "next-intl";
import SectionNav from "@/components/SectionNav/SectionNav";

/**
 * Floating section rail for a tour page.
 *
 * Same overlay nav the boat page uses, so the two long pages behave the same
 * way. The ids match the `id` attributes on the five content sections; the
 * labels reuse the eyebrows those sections already print, which keeps the rail
 * and the page from drifting apart in six languages.
 */
export default function TourNav() {
  const t = useTranslations("tourDetail");

  const sections = [
    { id: "overview", label: t("overviewEyebrow") },
    { id: "itinerary", label: t("itineraryEyebrow") },
    { id: "included", label: t("includedEyebrow") },
    { id: "who-for", label: t("whoForEyebrow") },
    { id: "logistics", label: t("logisticsEyebrow") },
  ];

  return <SectionNav sections={sections} variant="overlay" color="blue" />;
}
