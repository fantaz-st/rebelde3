import Expeditions from "@/sections/tours/Expeditions/Expeditions";
import Tours from "@/sections/tours/Tours/Tours";
import ToursHero from "@/sections/tours/ToursHero/ToursHero";
import Facts from "@/sections/tours/Facts/Facts";
import tours from "@/settings/tours";
import { breadcrumb, JsonLd, SITE_URL } from "@/lib/schema";

export default async function BespokeTours({ params }) {
  const { locale } = await params;
  const localePrefix = locale === "en" ? "" : `/${locale}`;

  // ItemList of tours — helps Google understand this page as a collection
  // listing and can produce a rich carousel/list SERP result.
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type":    "ItemList",
    name:       "Private Boat Tours from Split",
    description:
      "Private boat tour experiences from Split, Croatia — Blue Lagoon, Blue Cave, Hvar & Pakleni, and Bol.",
    itemListElement: tours.map((tour, i) => ({
      "@type":   "ListItem",
      position:  i + 1,
      url:       `${SITE_URL}${localePrefix}/bespoke-tours#${tour.key}`,
      name:      tour.label,
      image:     `${SITE_URL}${tour.thumb}`,
    })),
  };

  const crumbsJsonLd = breadcrumb([{ name: "Bespoke Tours", url: "/bespoke-tours" }], locale);

  return (
    <div>
      <JsonLd data={itemListJsonLd} id="itemlist-jsonld" />
      <JsonLd data={crumbsJsonLd}   id="breadcrumb-jsonld" />
      <ToursHero />
      <Tours />
      <Expeditions />
      <Facts />
    </div>
  );
}
