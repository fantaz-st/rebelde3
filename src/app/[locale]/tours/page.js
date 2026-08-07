import { getTranslations } from "next-intl/server";
import Messages from "@/i18n/Messages";
import { breadcrumb, JsonLd, tourList, pageMetadata } from "@/lib/schema";

import ToursHero from "@/sections/tours/ToursHero/ToursHero";
import ToursList from "@/sections/tours/ToursList/ToursList";
import Facts from "@/sections/tours/Facts/Facts";

/**
 * /tours — the index of our template tours.
 *
 * Distinct from /bespoke-tours: this page lists the four (soon five) fixed
 * itineraries we sell, each linking to its own detail page. The bespoke page
 * pitches the fully-custom charter instead.
 */

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.tours" });
  return pageMetadata({
    locale,
    path: "/tours",
    title: t("title"),
    description: t("description"),
  });
}

export default async function ToursIndexPage({ params }) {
  const { locale } = await params;
  const tTours = await getTranslations({ locale, namespace: "tourItems" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  return (
    <Messages route="tours">
      <JsonLd data={tourList(tTours, locale)} id="tourlist-jsonld" />
      <JsonLd
        data={breadcrumb([{ name: tNav("tours"), url: "/tours" }], locale, tNav("home"))}
        id="breadcrumb-jsonld"
      />

      <ToursHero />
      <ToursList />
      <Facts />
    </Messages>
  );
}
