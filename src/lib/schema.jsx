/**
 * Structured data — every JSON-LD graph the site emits lives here.
 *
 * Pages import builders instead of hand-rolling schema objects, so the
 * business identity, IDs, and pricing are defined exactly once.
 *
 * ★ TODO (quarterly): refresh the counts in settings/reviews-meta.js, which is
 *   now the single source for the rating shown on /reviews.
 */

import tours from "@/settings/tours";
import testimonials from "@/settings/testimonials";

export const SITE_URL = "https://www.rebelde.hr";
export const SITE_NAME = "Rebelde Boats";
export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const ORG_ID = `${SITE_URL}/#organization`;

export const BUSINESS_TELEPHONE = "+385953933125";
export const BUSINESS_EMAIL = "rebeldeboats@gmail.com";

// Kept as exports for now, but nothing reads them: the rating on /reviews is
// computed from settings/reviews-meta.js instead. Delete once you have
// confirmed Search Console is clean.
export const REVIEW_COUNT = 288;
export const RATING_VALUE = "5.0";

export const businessRef = { "@id": BUSINESS_ID };

export const reviewedItem = {
  "@type": "LocalBusiness",
  "@id": BUSINESS_ID,
  name: SITE_NAME,
};

// ── URL helpers ────────────────────────────────────────────

export const absoluteUrl = (path = "") =>
  `${SITE_URL}${path === "/" ? "" : path}`;

/**
 * Standard page metadata. Every page calls this so canonical + hreflang +
 * OG are consistent and never drift between routes.
 */
export function pageMetadata({
  path = "",
  title,
  description,
  image = `${SITE_URL}/opengraph-image.jpg`,
  type = "website",
  imageAlt = `${SITE_NAME} — private boat tours from Split, Croatia`,
}) {
  const canonical = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type,
      siteName: SITE_NAME,
      locale: "en_US",
      url: canonical,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

// ── Rendering ──────────────────────────────────────────────

export function JsonLd({ data, id }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      {...(id ? { id } : {})}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const graph = (nodes) => ({
  "@context": "https://schema.org",
  "@graph": nodes.filter(Boolean),
});

const doc = (node) => ({ "@context": "https://schema.org", ...node });

// ── Site-wide nodes ────────────────────────────────────────

const SAME_AS = [
  "https://www.tripadvisor.com/Attraction_Review-g295370-d28042808-Reviews-Rebelde_boats_Private_Boat_Tours_from_Split-Split_Split_Dalmatia_County_Dalmatia.html",
  "https://www.instagram.com/rebeldeboats",
  "https://maps.app.goo.gl/Nxsof1ARrP7Stw9a9",
];

export function siteGraph() {
  const businessNode = {
    "@type": ["LocalBusiness", "TouristInformationCenter"],
    "@id": BUSINESS_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/android-chrome-512x512.png`,
    image: `${SITE_URL}/opengraph-image.jpg`,
    description:
      "Private speedboat tours from Split, Croatia. Island-hopping to Hvar, Vis, Blue Cave, Blue Lagoon, Brač, Šolta, and Pakleni Islands aboard a luxury Felix 37 speedboat.",
    telephone: BUSINESS_TELEPHONE,
    email: BUSINESS_EMAIL,
    priceRange: "€€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Credit Card, Cash, Bank Transfer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Split",
      addressRegion: "Split-Dalmatia County",
      addressCountry: "HR",
    },
    geo: { "@type": "GeoCoordinates", latitude: 43.5081, longitude: 16.4402 },
    areaServed: [
      "Hvar, Croatia",
      "Vis, Croatia",
      "Brač, Croatia",
      "Šolta, Croatia",
      "Trogir, Croatia",
      "Pakleni Islands, Croatia",
      "Blue Cave, Biševo, Croatia",
      "Split, Croatia",
    ].map((name) => ({ "@type": "Place", name })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Private Boat Tours from Split",
      itemListElement: tours.map((tour) => ({
        "@type": "Offer",
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: tour.minPrice,
          maxPrice: tour.maxPrice,
          priceCurrency: "EUR",
        },
        itemOffered: {
          "@type": "TouristTrip",
          name: tour.label,
          description: tour.intro,
          image: `${SITE_URL}${tour.hero}`,
          touristType: tour.touristType,
          provider: businessRef,
          itinerary: (tour.itinerary ?? []).map((stop) => ({
            "@type": "Place",
            name: stop.title,
          })),
        },
      })),
    },
    sameAs: SAME_AS,
  };

  const websiteNode = {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };

  const orgNode = {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/android-chrome-512x512.png`,
      width: 512,
      height: 512,
    },
    sameAs: SAME_AS,
  };

  return graph([orgNode, websiteNode, businessNode]);
}

// ── Per-page builders ──────────────────────────────────────

export function breadcrumb(crumbs = [], homeLabel = "Home") {
  const items = [{ name: homeLabel, url: "/" }, ...crumbs];
  return doc({
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.url),
    })),
  });
}

export function faqPage(questions) {
  const mainEntity = questions.filter(Boolean).map((q) => ({
    "@type": "Question",
    name: q.question,
    acceptedAnswer: { "@type": "Answer", text: q.answer },
  }));

  if (mainEntity.length === 0) return null;
  return doc({ "@type": "FAQPage", mainEntity });
}

export function tourTrip(tour) {
  const canonical = absoluteUrl(`/tours/${tour.key}`);
  return doc({
    "@type": "TouristTrip",
    "@id": `${canonical}#trip`,
    name: tour.label,
    description: tour.intro,
    image: `${SITE_URL}${tour.hero}`,
    touristType: tour.touristType,
    provider: businessRef,
    itinerary: (tour.itinerary ?? []).map((stop) => ({
      "@type": "Place",
      name: stop.title,
    })),
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: tour.minPrice,
        maxPrice: tour.maxPrice,
        priceCurrency: "EUR",
      },
      availability: "https://schema.org/InStock",
      seller: businessRef,
      url: canonical,
    },
  });
}

/** ItemList for the /tours index. */
export function tourList() {
  return doc({
    "@type": "ItemList",
    "@id": `${absoluteUrl("/tours")}#list`,
    itemListElement: tours.map((tour, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/tours/${tour.key}`),
      name: tour.label,
    })),
  });
}

/** Product node for the boat. */
export function boatProduct() {
  return doc({
    "@type": "Product",
    "@id": `${SITE_URL}/the-boat#boat`,
    name: "Felix 37 Buenaventura — Private Speedboat",
    brand: { "@type": "Brand", name: "Felix Boats" },
    description:
      "Buenaventura is a custom-built Felix 37 speedboat operated by Rebelde Boats — 500HP, 12-guest capacity, extra-large sundeck, onboard fridge and restroom. Available for private boat tours from Split, Croatia.",
    image: `${SITE_URL}/images/boat/felix 37 drone shot 1.jpg`,
    category: "Boat Charter",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: Math.min(...tours.map((t) => t.minPrice)),
      highPrice: Math.max(...tours.map((t) => t.maxPrice)),
      offerCount: tours.length,
      availability: "https://schema.org/InStock",
      seller: businessRef,
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Length", value: "37 ft" },
      { "@type": "PropertyValue", name: "Engine Power", value: "500 HP" },
      { "@type": "PropertyValue", name: "Capacity", value: "12 guests" },
      { "@type": "PropertyValue", name: "Manufacturer", value: "Felix Boats" },
    ],
  });
}

/** ContactPage node. */
export function contactPage({ title, description }) {
  return doc({
    "@type": "ContactPage",
    url: absoluteUrl("/contact"),
    name: title,
    description,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: businessRef,
  });
}

/** ReviewPage node with every testimonial as an individual Review. */
export function reviewPage({ totalReviews, averageRating }) {
  const canonical = absoluteUrl("/reviews");
  return doc({
    "@type": "ReviewPage",
    "@id": `${canonical}#reviewpage`,
    url: canonical,
    name: `${SITE_NAME} — Guest Reviews`,
    description:
      "Guest reviews of Rebelde Boats private boat tours from Split, Croatia, collected across TripAdvisor, Google, and GetYourGuide.",
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    about: businessRef,
    mainEntity: {
      "@type": "LocalBusiness",
      "@id": BUSINESS_ID,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: Number(averageRating.toFixed(1)),
        reviewCount: totalReviews,
        bestRating: 5,
        worstRating: 1,
      },
      review: testimonials.map((r) => ({
        "@type": "Review",
        author: { "@type": "Person", name: r.name },
        reviewRating: {
          "@type": "Rating",
          // Numbers, not strings — the validator is stricter about
          // ratingValue than about the bestRating/worstRating bounds.
          ratingValue: 5,
          bestRating: 5,
          worstRating: 1,
        },
        name: r.title,
        reviewBody: r.text,
        itemReviewed: reviewedItem,
        ...(r.tour && { positiveNotes: r.tour }),
      })),
    },
  });
}
