import { breadcrumb, JsonLd, tourList, pageMetadata } from "@/lib/schema";

import ToursHero from "@/sections/tours/ToursHero/ToursHero";
import ToursList from "@/sections/tours/ToursList/ToursList";
import Facts from "@/sections/tours/Facts/Facts";

/**
 * /tours — the index of our template tours.
 *
 * Lists all five tours we offer, each linking to its own detail page.
 * The bespoke charter is one of them rather than a separate page — it's the
 * same kind of thing as the other four, just without a fixed route.
 */

export async function generateMetadata() {
  return pageMetadata({
    path: "/tours",
    title: "Our Tours — Private Boat Trips from Split, Croatia",
    description: "Our four signature private boat tours from Split: Blue Lagoon & Three Islands, Blue Cave & Five Islands, Hvar & Pakleni, and Bol, Hvar & Pakleni.",
  });
}

export default async function ToursIndexPage({ params }) {

  return (
    <>
      <JsonLd data={tourList()} id="tourlist-jsonld" />
      <JsonLd
        data={breadcrumb([{ name: "Our Tours", url: "/tours" }], "Home")}
        id="breadcrumb-jsonld"
      />

      <ToursHero />
      <ToursList />
      <Facts />
    </>
  );
}
