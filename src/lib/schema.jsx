/**
 * Structured data — every JSON-LD graph the site emits lives here.
 *
 * Pages import builders instead of hand-rolling schema objects, so the
 * business identity, IDs, and pricing are defined exactly once.
 *
 * ★ TODO (quarterly): refresh REVIEW_COUNT / RATING_VALUE.
 */

import tours from "@/settings/tours";
import testimonials from "@/settings/testimonials";

export const SITE_URL = "https://www.rebelde.hr";
export const SITE_NAME = "Rebelde Boats";
export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const ORG_ID = `${SITE_URL}/#organization`;

export const BUSINESS_TELEPHONE = "+385953933125";
export const BUSINESS_EMAIL = "info@rebelde.hr";

export const REVIEW_COUNT = 220;
export const RATING_VALUE = "5.0";

export const LOCALES = ["en", "hr", "de", "es", "it", "fr"];

export const OG_LOCALES = {
  en: "en_US",
  hr: "hr_HR",
  de: "de_DE",
  es: "es_ES",
  it: "it_IT",
  fr: "fr_FR",
};

export const businessRef = { "@id": BUSINESS_ID };

// ── URL helpers ────────────────────────────────────────────

/** "" for English (root), "/de" etc. for prefixed locales. */
export const localePrefix = (locale) => (locale === "en" ? "" : `/${locale}`);

export const absoluteUrl = (path = "", locale = "en") =>
  `${SITE_URL}${localePrefix(locale)}${path === "/" ? "" : path}`;

/** hreflang map for `alternates.languages`, x-default pointing at English. */
export function languageAlternates(path = "") {
  const clean = path === "/" ? "" : path;
  return Object.fromEntries([
    ["x-default", `${SITE_URL}${clean}`],
    ...LOCALES.map((l) => [l, `${SITE_URL}${localePrefix(l)}${clean}`]),
  ]);
}

/**
 * Standard page metadata. Every page calls this so canonical + hreflang +
 * OG are consistent and never drift between routes.
 */
export function pageMetadata({
  locale,
  path = "",
  title,
  description,
  image = `${SITE_URL}/opengraph-image.jpg`,
  type = "website",
  imageAlt = `${SITE_NAME} — private boat tours from Split, Croatia`,
}) {
  const canonical = absoluteUrl(path, locale);
  return {
    title,
    description,
    alternates: { canonical, languages: languageAlternates(path) },
    openGraph: {
      type,
      siteName: SITE_NAME,
      locale: OG_LOCALES[locale],
      url: canonical,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
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

/**
 * The site-wide Organization + WebSite + LocalBusiness graph.
 *
 * `t` is a translator scoped to the `tourItems` namespace, so the offer
 * catalogue is described in the visitor's language rather than always English.
 */
export function siteGraph(t) {
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: RATING_VALUE,
      reviewCount: REVIEW_COUNT,
      bestRating: "5",
      worstRating: "1",
    },
    review: testimonials.slice(0, 8).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
        worstRating: "1",
      },
      itemReviewed: businessRef,
      name: r.tour,
    })),
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
          name: t(`${tour.key}.label`),
          description: t(`${tour.key}.intro`),
          image: `${SITE_URL}${tour.hero}`,
          touristType: tour.touristType,
          provider: businessRef,
          itinerary: t
            .raw(`${tour.key}.itinerary`)
            .map((stop) => ({ "@type": "Place", name: stop.title })),
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
    inLanguage: LOCALES,
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

export function breadcrumb(crumbs = [], locale = "en", homeLabel = "Home") {
  const items = [{ name: homeLabel, url: "/" }, ...crumbs];
  return doc({
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.url, locale),
    })),
  });
}

/**
 * FAQPage node built from translated strings, so /de/faq emits German
 * questions rather than English ones.
 *
 * `t` is scoped to the `faq` namespace. Ids that have no message are skipped.
 */
export function faqPage(ids, t) {
  const mainEntity = ids
    .map((id) => {
      try {
        return {
          "@type": "Question",
          name: t(`${id}.question`),
          acceptedAnswer: { "@type": "Answer", text: t(`${id}.answer`) },
        };
      } catch {
        return null;
      }
    })
    .filter(Boolean);

  if (mainEntity.length === 0) return null;
  return doc({ "@type": "FAQPage", mainEntity });
}

/** TouristTrip + Offer for a single tour detail page. `t` is scoped to `tourItems`. */
export function tourTrip(tour, t, locale) {
  const canonical = absoluteUrl(`/tours/${tour.key}`, locale);
  return doc({
    "@type": "TouristTrip",
    "@id": `${canonical}#trip`,
    name: t(`${tour.key}.label`),
    description: t(`${tour.key}.intro`),
    image: `${SITE_URL}${tour.hero}`,
    touristType: tour.touristType,
    provider: businessRef,
    itinerary: t
      .raw(`${tour.key}.itinerary`)
      .map((stop) => ({ "@type": "Place", name: stop.title })),
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

/** ItemList for the /tours index. `t` is scoped to `tourItems`. */
export function tourList(t, locale) {
  return doc({
    "@type": "ItemList",
    "@id": `${absoluteUrl("/tours", locale)}#list`,
    itemListElement: tours.map((tour, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/tours/${tour.key}`, locale),
      name: t(`${tour.key}.label`),
    })),
  });
}

/** Service node for the bespoke charter page. */
export function bespokeService(t, locale) {
  const canonical = absoluteUrl("/bespoke-tours", locale);
  return doc({
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: "Private Bespoke Boat Charter from Split",
    serviceType: "Private Boat Charter",
    provider: businessRef,
    areaServed: { "@type": "Place", name: "Split, Croatia" },
    audience: {
      "@type": "PeopleAudience",
      suggestedMinAge: 0,
      audienceType: "Couples, families, small groups",
    },
    description:
      "Private, single-charter boat tours from Split — one boat, one group per day. Route, timing, and lunch shaped around each guest. Operated by the owners aboard Buenaventura, a Felix 37 speedboat.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Private Boat Tour Starting Points",
      itemListElement: tours.map((tour) => ({
        "@type": "Offer",
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: tour.minPrice,
          maxPrice: tour.maxPrice,
          priceCurrency: "EUR",
        },
        url: absoluteUrl(`/tours/${tour.key}`, locale),
        itemOffered: {
          "@type": "TouristTrip",
          name: t(`${tour.key}.label`),
          image: `${SITE_URL}${tour.thumb}`,
        },
      })),
    },
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
export function contactPage({ locale, title, description }) {
  return doc({
    "@type": "ContactPage",
    url: absoluteUrl("/contact", locale),
    name: title,
    description,
    inLanguage: locale,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: businessRef,
  });
}

/** ReviewPage node with every testimonial as an individual Review. */
export function reviewPage({ locale, totalReviews, averageRating }) {
  const canonical = absoluteUrl("/reviews", locale);
  return doc({
    "@type": "ReviewPage",
    "@id": `${canonical}#reviewpage`,
    url: canonical,
    name: `${SITE_NAME} — Guest Reviews`,
    description:
      "Guest reviews of Rebelde Boats private boat tours from Split, Croatia, collected across TripAdvisor, Google, and GetYourGuide.",
    inLanguage: locale,
    isPartOf: { "@id": WEBSITE_ID },
    about: businessRef,
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
      review: testimonials.map((r) => ({
        "@type": "Review",
        author: { "@type": "Person", name: r.name },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
          worstRating: "1",
        },
        name: r.title,
        reviewBody: r.text,
        itemReviewed: businessRef,
        ...(r.tour && { positiveNotes: r.tour }),
      })),
    },
  });
}
