import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import SmoothScroll from "../SmoothScroll";
import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";
import Script from "next/script";
import testimonials from "@/settings/testimonials";
import tours from "@/settings/tours";

const SITE_URL = "https://www.rebelde.hr";
const SITE_NAME = "Rebelde Boats";
const BUSINESS_ID = `${SITE_URL}/#business`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const ORG_ID = `${SITE_URL}/#organization`;

const BUSINESS_TELEPHONE = "+385953933125";

// Combined reviews across TripAdvisor + Google + Booking.
// ★ TODO: replace with the actual live combined count — refresh quarterly.
// The `RATING_VALUE` matches your current 5.0 rating; adjust if it drifts.
const REVIEW_COUNT = 220;
const RATING_VALUE = "5.0";

// ── Metadata ───────────────────────────────────────────────

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });
  const canonical = locale === "en" ? SITE_URL : `${SITE_URL}/${locale}`;
  const ogLocales = {
    en: "en_US",
    hr: "hr_HR",
    de: "de_DE",
    es: "es_ES",
    it: "it_IT",
    fr: "fr_FR",
  };

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("title"), template: `%s | ${SITE_NAME}` },
    description: t("description"),
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "travel",
    alternates: {
      canonical,
      languages: {
        "x-default": SITE_URL,
        en: SITE_URL,
        hr: `${SITE_URL}/hr`,
        de: `${SITE_URL}/de`,
        es: `${SITE_URL}/es`,
        it: `${SITE_URL}/it`,
        fr: `${SITE_URL}/fr`,
      },
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: ogLocales[locale],
      alternateLocale: Object.values(ogLocales).filter(
        (l) => l !== ogLocales[locale],
      ),
      url: canonical,
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: `${SITE_URL}/opengraph-image.jpg`,
          width: 1200,
          height: 630,
          alt: "Rebelde Boats — Private Boat Tours from Split, Croatia",
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${SITE_URL}/opengraph-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined,
      other: {
        "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION || undefined,
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// ── JSON-LD graph ──────────────────────────────────────────
// Site-wide business + website + organisation nodes. Every page renders these
// once, so search engines see a stable business identity regardless of entry.
// Per-page schemas (BreadcrumbList, FAQPage, Product, ItemList) live in each
// page file and reference this business via `@id`.

// Tour pricing brackets — ★ TODO: verify against your live pricing.
// AggregateOffer.lowPrice / highPrice come from the min & max of these.
const tourOffers = [
  {
    id: "blue-lagoon-three-islands",
    name: "Blue Lagoon & Three Islands Escape",
    description:
      "Half-day private boat tour from Split to the Blue Lagoon, Trogir, and Šolta.",
    image: `${SITE_URL}/images/tours/lagoon.jpg`,
    touristType: ["Family", "Couple", "Group"],
    minPrice: 800,
    maxPrice: 1100,
    itinerary: [
      "Split, Croatia",
      "Blue Lagoon, Drvenik Veli, Croatia",
      "Trogir, Croatia",
      "Šolta, Croatia",
    ],
  },
  {
    id: "blue-cave-five-islands",
    name: "Blue Cave & Five Islands Expedition",
    description:
      "Full-day private boat tour from Split to the Blue Cave on Biševo, Vis, Hvar, Stiniva Cove, and Budikovac.",
    image: `${SITE_URL}/images/tours/cave.jpg`,
    touristType: ["Adventurer", "Group"],
    minPrice: 1500,
    maxPrice: 1750,
    itinerary: [
      "Split, Croatia",
      "Blue Cave, Biševo, Croatia",
      "Vis, Croatia",
      "Stiniva Cove, Vis, Croatia",
      "Budikovac, Croatia",
      "Hvar, Croatia",
    ],
  },
  {
    id: "hvar-pakleni-islands",
    name: "Hvar & Pakleni Islands Experience",
    description:
      "Private boat tour from Split to Hvar Town and the Pakleni archipelago.",
    image: `${SITE_URL}/images/tours/hvar-pakleni/hero.jpg`,
    touristType: ["Couple", "Group"],
    minPrice: 1400,
    maxPrice: 1650,
    itinerary: ["Split, Croatia", "Hvar, Croatia", "Pakleni Islands, Croatia"],
  },
  {
    id: "bol-hvar-pakleni",
    name: "Bol, Hvar & Pakleni Islands Coastal Journey",
    description:
      "Private boat tour from Split to Zlatni Rat beach in Bol on Brač, Hvar, and the Pakleni Islands.",
    image: `${SITE_URL}/images/tours/zlatni-rat.jpg`,
    touristType: ["Family", "Group"],
    minPrice: 1400,
    maxPrice: 1650,
    itinerary: [
      "Split, Croatia",
      "Bol, Brač, Croatia",
      "Zlatni Rat, Brač, Croatia",
      "Hvar, Croatia",
      "Pakleni Islands, Croatia",
    ],
  },
];

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
  email: "info@rebelde.hr",
  priceRange: "€€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Credit Card, Cash, Bank Transfer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Split",
    addressRegion: "Split-Dalmatia County",
    addressCountry: "HR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.5081,
    longitude: 16.4402,
  },
  areaServed: [
    { "@type": "Place", name: "Hvar, Croatia" },
    { "@type": "Place", name: "Vis, Croatia" },
    { "@type": "Place", name: "Brač, Croatia" },
    { "@type": "Place", name: "Šolta, Croatia" },
    { "@type": "Place", name: "Trogir, Croatia" },
    { "@type": "Place", name: "Pakleni Islands, Croatia" },
    { "@type": "Place", name: "Blue Cave, Biševo, Croatia" },
    { "@type": "Place", name: "Split, Croatia" },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: RATING_VALUE,
    reviewCount: REVIEW_COUNT,
    bestRating: "5",
    worstRating: "1",
  },
  // Individual review nodes — the top 8 testimonials from settings/testimonials.js.
  // Review titles are the tour name (used as `name` here), authors are the
  // guest name. These are what unlock star ratings in SERPs.
  review: testimonials.slice(0, 8).map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.name },
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
    },
    itemReviewed: { "@id": BUSINESS_ID },
    name: r.tour,
  })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Private Boat Tours from Split",
    itemListElement: tourOffers.map((o) => ({
      "@type": "Offer",
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: o.minPrice,
        maxPrice: o.maxPrice,
        priceCurrency: "EUR",
      },
      itemOffered: {
        "@type": "TouristTrip",
        name: o.name,
        description: o.description,
        image: o.image,
        touristType: o.touristType,
        provider: { "@id": BUSINESS_ID },
        itinerary: o.itinerary.map((name) => ({ "@type": "Place", name })),
      },
    })),
  },
  sameAs: [
    "https://www.tripadvisor.com/Attraction_Review-g295370-d28042808-Reviews-Rebelde_boats_Private_Boat_Tours_from_Split-Split_Split_Dalmatia_County_Dalmatia.html",
    "https://www.instagram.com/rebeldeboats",
    "https://maps.app.goo.gl/Nxsof1ARrP7Stw9a9",
  ],
};

// WebSite node — enables sitelinks searchbox in some Google SERPs.
const websiteNode = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { "@id": ORG_ID },
  inLanguage: ["en", "hr", "de", "es", "it", "fr"],
};

// Organisation node — helps Google's Knowledge Graph link this site to
// the operating entity.
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
  sameAs: businessNode.sameAs,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [orgNode, websiteNode, businessNode],
};

// ── Layout ─────────────────────────────────────────────────

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-17322617143"
        strategy="afterInteractive"
      />
      <Script
        id="google-ads"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-17322617143');
      `,
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SmoothScroll>{children}</SmoothScroll>
      <WhatsAppButton />
    </NextIntlClientProvider>
  );
}
