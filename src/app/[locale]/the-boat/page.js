import { getTranslations } from "next-intl/server";
import Messages from "@/i18n/Messages";
import { breadcrumb, JsonLd, boatProduct, pageMetadata } from "@/lib/schema";
import BoatHero from "@/sections/boat/BoatHero/BoatHero";
import BoatSections from "@/sections/boat/BoatSections/BoatSections";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.boat" });
  return pageMetadata({
    locale,
    path: "/the-boat",
    title: t("title"),
    description: t("description"),
  });
}

export default async function TheBoatPage({ params }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });

  return (
    <Messages route="boat">
      <JsonLd data={boatProduct()} id="boat-jsonld" />
      <JsonLd
        data={breadcrumb([{ name: tNav("theBoat"), url: "/the-boat" }], locale, tNav("home"))}
        id="breadcrumb-jsonld"
      />
      <BoatHero />
      <BoatSections />
    </Messages>
  );
}
