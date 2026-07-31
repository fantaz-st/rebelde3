import ReviewsHero from "@/sections/reviews/ReviewsHero/ReviewsHero";
import ReviewsWall from "@/sections/reviews/ReviewsWall/ReviewsWall";
import ReviewsLeave from "@/sections/reviews/ReviewsLeave/ReviewsLeave";
import ReviewsCta from "@/sections/reviews/ReviewsCta/ReviewsCta";
import {
  breadcrumb,
  JsonLd,
  SITE_URL,
  BUSINESS_ID,
  ORG_ID,
} from "@/lib/schema";
import testimonials from "@/settings/testimonials";
import { totalReviews, averageRating } from "@/settings/reviews-meta";

export default async function ReviewsPage({ params }) {
  const { locale } = await params;
  const localePrefix = locale === "en" ? "" : `/${locale}`;
  const canonical = `${SITE_URL}${localePrefix}/reviews`;

  // Full ReviewPage schema — includes AggregateRating for the business PLUS
  // every individual testimonial as a Review node with reviewBody + author.
  // This is the strongest possible signal to Google that this page shows
  // real reviews of a specific business.
  const reviewPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ReviewPage",
    "@id": `${canonical}#reviewpage`,
    url: canonical,
    name: "Rebelde Boats — Guest Reviews",
    description:
      "Guest reviews of Rebelde Boats private boat tours from Split, Croatia, collected across TripAdvisor, Google, and GetYourGuide.",
    inLanguage: "en",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": BUSINESS_ID },
    mainEntity: {
      "@type": "LocalBusiness",
      "@id": BUSINESS_ID,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: averageRating.toFixed(1),
        reviewCount: totalReviews,
        bestRating: "5",
        worstRating: "1",
      },
      review: testimonials.map((t) => ({
        "@type": "Review",
        author: { "@type": "Person", name: t.name },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
          worstRating: "1",
        },
        name: t.title,
        reviewBody: t.text,
        itemReviewed: { "@id": BUSINESS_ID },
        ...(t.tour && { positiveNotes: t.tour }),
      })),
    },
  };

  const crumbsJsonLd = breadcrumb(
    [{ name: "Reviews", url: "/reviews" }],
    locale,
  );

  return (
    <>
      <JsonLd data={reviewPageJsonLd} id="reviewpage-jsonld" />
      <JsonLd data={crumbsJsonLd} id="breadcrumb-jsonld" />

      <ReviewsHero />
      <ReviewsWall />
      <ReviewsLeave />
      {/* <ReviewsCta /> */}
    </>
  );
}
