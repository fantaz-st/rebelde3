import { breadcrumb, JsonLd, boatProduct, pageMetadata } from "@/lib/schema";
import BoatHero from "@/sections/boat/BoatHero/BoatHero";
import BoatSections from "@/sections/boat/BoatSections/BoatSections";

export async function generateMetadata() {
  return pageMetadata({
    path: "/the-boat",
    title: "The Boat – Felix 37 Buenaventura",
    description: "Meet Buenaventura — our Felix 37 custom speedboat built for the Adriatic. 500HP, 12 guests, extra-large sundeck, onboard fridge and restroom.",
  });
}

export default async function TheBoatPage({ params }) {

  return (
    <>
      <JsonLd data={boatProduct()} id="boat-jsonld" />
      <JsonLd
        data={breadcrumb([{ name: "The Boat", url: "/the-boat" }], "Home")}
        id="breadcrumb-jsonld"
      />
      <BoatHero />
      <BoatSections />
    </>
  );
}
