import { getFaq } from "@/settings/faqs";
import { notFound } from "next/navigation";
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
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) return {};

  return pageMetadata({
    path: `/tours/${slug}`,
    // The layout template appends " | Rebelde Boats", so this stays short:
    // full titles were running to 90 characters and truncating in results.
    title: `${tour.label} — Private Tour from Split`,
    description: tour.intro,
    image: `${SITE_URL}${tour.hero || tour.thumb}`,
    imageAlt: tour.thumbAlt,
    type: "article",
  });
}

export default async function TourDetailPage({ params }) {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) notFound();

  // Every section below stays a dumb presentational component.
  const view = buildTourView(tour);

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
    <>
      <JsonLd data={tourTrip(view)} id="tour-jsonld" />
      <JsonLd data={faqPage((tour.faqIds || []).map(getFaq))} id="tour-faq-jsonld" />
      <JsonLd
        data={breadcrumb(
          [
            { name: "Our Tours", url: "/tours" },
            { name: view.label, url: `/tours/${slug}` },
          ],
          "Home",
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
      <TourFaq tour={view} />
      <TourRelated tour={view} />
    </>
  );
}
