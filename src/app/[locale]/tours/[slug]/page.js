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
import TourNav from "@/sections/tour/TourNav/TourNav";
import TourOverview from "@/sections/tour/TourOverview/TourOverview";
import TourItinerary from "@/sections/tour/TourItinerary/TourItinerary";
import TourGallery from "@/sections/tour/TourGallery/TourGallery";
import TourIncluded from "@/sections/tour/TourIncluded/TourIncluded";
import TourWhoFor from "@/sections/tour/TourWhoFor/TourWhoFor";
import TourLogistics from "@/sections/tour/TourLogistics/TourLogistics";
import TourTestimonials from "@/sections/tour/TourTestimonials/TourTestimonials";
import TourFaq from "@/sections/tour/TourFaq/TourFaq";
import TourRelated from "@/sections/tour/TourRelated/TourRelated";

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

  /* Section lead images. Falls back through the gallery so a tour with fewer
     dedicated images still gets a different picture per section rather than
     the same one five times. */
  const g = (i) => view.gallery?.[i]?.src;
  const leads = {
    overview: view.mainImg || g(0),
    itinerary: g(1) || view.subImg,
    included: view.ctaImg || g(2),
    whoFor: view.subImg || g(3),
    logistics: g(4) || view.mainImg,
  };

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

      {/* Lead images for the five content sections. Kept here rather than
          inside each section so the pairing is visible in one place and can
          be reshuffled without touching five components. */}
      <TourHero tour={view} />
      <TourNav />
      <TourOverview tour={view} lead={leads.overview} />
      <TourItinerary tour={view} lead={leads.itinerary} />
      <TourGallery tour={view} />
      <TourIncluded tour={view} lead={leads.included} />
      <TourWhoFor tour={view} lead={leads.whoFor} />
      <TourLogistics tour={view} lead={leads.logistics} />
      <TourTestimonials tour={view} />
      <TourFaq tour={view} locale={locale} />
      <TourRelated tour={view} />
    </Messages>
  );
}
