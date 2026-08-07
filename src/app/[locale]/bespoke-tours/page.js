import { getTranslations } from "next-intl/server";
import Messages from "@/i18n/Messages";
import { tourKeys } from "@/settings/tours";
import {
  breadcrumb,
  JsonLd,
  bespokeService,
  faqPage,
  pageMetadata,
} from "@/lib/schema";

import BespokeHero from "@/sections/bespoke-tours/BespokeHero/BespokeHero";
import BespokePillars from "@/sections/bespoke-tours/BespokePillars/BespokePillars";
import BespokeProcess from "@/sections/bespoke-tours/BespokeProcess/BespokeProcess";
import BespokeCustom from "@/sections/bespoke-tours/BespokeCustom/BespokeCustom";
import BespokeStarting from "@/sections/bespoke-tours/BespokeStarting/BespokeStarting";
import BespokeFaq from "@/sections/bespoke-tours/BespokeFaq/BespokeFaq";
import BespokeCta from "@/sections/bespoke-tours/BespokeCta/BespokeCta";
import HashRedirect from "@/sections/bespoke-tours/HashRedirect";

const BESPOKE_FAQ_IDS = [
  "booking-q1",
  "booking-q2",
  "booking-q3",
  "general-q2",
  "general-q5",
  "general-q1",
];

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.bespokeTours" });
  return pageMetadata({
    locale,
    path: "/bespoke-tours",
    title: t("title"),
    description: t("description"),
  });
}

export default async function BespokeToursPage({ params }) {
  const { locale } = await params;
  const tTours = await getTranslations({ locale, namespace: "tourItems" });
  const tFaq = await getTranslations({ locale, namespace: "faq" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  return (
    <Messages route="bespoke">
      <JsonLd data={bespokeService(tTours, locale)} id="service-jsonld" />
      <JsonLd data={faqPage(BESPOKE_FAQ_IDS, tFaq)} id="bespoke-faq-jsonld" />
      <JsonLd
        data={breadcrumb(
          [{ name: tNav("tours"), url: "/bespoke-tours" }],
          locale,
          tNav("home"),
        )}
        id="breadcrumb-jsonld"
      />

      {/* Legacy /bespoke-tours#slug URLs → /tours/slug */}
      <HashRedirect knownKeys={tourKeys} />

      <BespokeHero />
      <BespokePillars />
      <BespokeProcess />
      <BespokeCustom />
      <BespokeStarting />
      <BespokeFaq locale={locale} />
      <BespokeCta />
    </Messages>
  );
}
