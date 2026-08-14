"use client";

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

  const sections = [
    { id: "overview", label: "The day" },
    { id: "itinerary", label: "Route" },
    { id: "included", label: "Details" },
    { id: "who-for", label: "Fit" },
    { id: "logistics", label: "Practicalities" },
  ];

  return <SectionNav sections={sections} variant="overlay" color="blue" />;
}
