import BoatHero from "@/sections/boat/BoatHero/BoatHero";
import BoatSections from "@/sections/boat/BoatSections/BoatSections";
import { breadcrumb, JsonLd, SITE_URL, BUSINESS_ID } from "@/lib/schema";

export default async function TheBoatPage({ params }) {
  const { locale } = await params;

  // Product schema for the boat — Google can display featured snippets
  // with name, image, and aggregate rating (inherited from LocalBusiness).
  const boatJsonLd = {
    "@context":  "https://schema.org",
    "@type":     "Product",
    "@id":       `${SITE_URL}/the-boat#boat`,
    name:        "Felix 37 Buenaventura — Private Speedboat",
    brand:       { "@type": "Brand", name: "Felix Boats" },
    description:
      "Buenaventura is a custom-built Felix 37 speedboat operated by Rebelde Boats — 500HP, 12-guest capacity, extra-large sundeck, onboard fridge and restroom. Available for private boat tours from Split, Croatia.",
    image:    `${SITE_URL}/images/boat/felix 37 drone shot 1.jpg`,
    category: "Boat Charter",
    offers: {
      "@type":       "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice:      600,
      highPrice:     2200,
      offerCount:    4,
      availability:  "https://schema.org/InStock",
      seller:        { "@id": BUSINESS_ID },
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Length",       value: "37 ft" },
      { "@type": "PropertyValue", name: "Engine Power", value: "500 HP" },
      { "@type": "PropertyValue", name: "Capacity",     value: "12 guests" },
      { "@type": "PropertyValue", name: "Manufacturer", value: "Felix Boats" },
    ],
  };

  const crumbsJsonLd = breadcrumb([{ name: "The Boat", url: "/the-boat" }], locale);

  return (
    <div>
      <JsonLd data={boatJsonLd}   id="boat-jsonld" />
      <JsonLd data={crumbsJsonLd} id="breadcrumb-jsonld" />
      <BoatHero />
      <BoatSections />
    </div>
  );
}
