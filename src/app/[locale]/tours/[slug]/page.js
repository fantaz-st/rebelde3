import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Messages from "@/i18n/Messages";
import tours, { getTour } from "@/settings/tours";
import { buildTourView } from "@/lib/tourView";
import {
  breadcrumb,
  JsonLd,
  tourTrip,
  faqPage,
  pageMetadata,
  SITE_URL,
} from "@/lib/schema";

import TourHero from "@/sections/tour/TourHero/TourHero";
import TourOverview from "@/sections/tour/TourOverview/TourOverview";
import TourItinerary from "@/sections/tour/TourItinerary/TourItinerary";
import TourGallery from "@/sections/tour/TourGallery/TourGallery";
import TourIncluded from "@/sections/tour/TourIncluded/TourIncluded";
import TourWhoFor from "@/sections/tour/TourWhoFor/TourWhoFor";
import TourLogistics from "@/sections/tour/TourLogistics/TourLogistics";
import TourTestimonials from "@/sections/tour/TourTestimonials/TourTestimonials";
import TourFaq from "@/sections/tour/TourFaq/TourFaq";
import TourRelated from "@/sections/tour/TourRelated/TourRelated";
import TourCta from "@/sections/tour/TourCta/TourCta";

export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.key }));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const tour = getTour(slug);
  if (!tour) return {};

  const tItems = await getTranslations({ locale, namespace: "tourItems" });
  const tMeta = await getTranslations({ locale, namespace: "metadata.tour" });

  const label = tItems(`${slug}.label`);
  const intro = tItems(`${slug}.intro`);

  return pageMetadata({
    locale,
    path: `/tours/${slug}`,
    title: tMeta("title", { label }),
    description: tMeta("description", { label, intro }),
    image: `${SITE_URL}${tour.hero || tour.thumb}`,
    imageAlt: tItems(`${slug}.thumbAlt`),
    type: "article",
  });
}

export default async function TourDetailPage({ params }) {
  const { locale, slug } = await params;
  const tour = getTour(slug);
  if (!tour) notFound();

  const tItems = await getTranslations({ locale, namespace: "tourItems" });
  const tFaq = await getTranslations({ locale, namespace: "faq" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  // Structure (settings) + copy (messages) merged once, here.
  // Every section below stays a dumb presentational component.
  const view = buildTourView(tour, tItems);

  return (
    <Messages route="tour">
      <JsonLd data={tourTrip(tour, tItems, locale)} id="tour-jsonld" />
      <JsonLd data={faqPage(tour.faqIds || [], tFaq)} id="tour-faq-jsonld" />
      <JsonLd
        data={breadcrumb(
          [
            { name: tNav("toursIndex"), url: "/tours" },
            { name: view.label, url: `/tours/${slug}` },
          ],
          locale,
          tNav("home"),
        )}
        id="breadcrumb-jsonld"
      />

      <TourHero tour={view} />
      <TourOverview tour={view} />
      <TourItinerary tour={view} />
      <TourGallery tour={view} />
      <TourIncluded tour={view} />
      <TourWhoFor tour={view} />
      <TourLogistics tour={view} />
      <TourTestimonials tour={view} />
      <TourFaq tour={view} locale={locale} />
      <TourRelated tour={view} />
      <TourCta tour={view} />
    </Messages>
  );
}
