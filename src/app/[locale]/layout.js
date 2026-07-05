import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import SmoothScroll from "../SmoothScroll";
import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";
import Script from "next/script";

const SITE_URL = "https://www.rebelde.hr";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });
  const canonical = locale === "en" ? SITE_URL : `${SITE_URL}/${locale}`;
  const ogLocales = { en:"en_US", hr:"hr_HR", de:"de_DE", es:"es_ES", it:"it_IT", fr:"fr_FR" };

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("title"), template: `%s | Rebelde Boats` },
    description: t("description"),
    keywords: [
      "private boat tour Split","Split boat tours","Blue Cave tour",
      "Blue Lagoon Croatia","Hvar boat tour","Pakleni Islands",
      "island hopping Croatia","private charter Split","speedboat Split",
    ],
    authors: [{ name: "Rebelde Boats", url: SITE_URL }],
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
      siteName: "Rebelde Boats",
      locale: ogLocales[locale],
      url: canonical,
      title: t("title"),
      description: t("description"),
      images: [{
        url: `${SITE_URL}/opengraph-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Rebelde Boats — Private Boat Tours from Split, Croatia",
        type: "image/jpeg",
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${SITE_URL}/opengraph-image.jpg`],
    },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const SITE_URL_CONST = "https://www.rebelde.hr";
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [{
    "@type": ["LocalBusiness", "TouristInformationCenter"],
    "@id": `${SITE_URL_CONST}/#business`,
    name: "Rebelde Boats",
    url: SITE_URL_CONST,
    logo: `${SITE_URL_CONST}/android-chrome-512x512.png`,
    image: `${SITE_URL_CONST}/opengraph-image.jpg`,
    description: "Private speedboat tours from Split, Croatia. Island-hopping to Hvar, Vis, Blue Cave, Blue Lagoon, Brač, Šolta, and Pakleni Islands.",
    telephone: "+385953933125",
    priceRange: "€€€",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Split",
      addressRegion: "Split-Dalmatia County",
      addressCountry: "HR",
    },
    geo: { "@type": "GeoCoordinates", latitude: 43.5081, longitude: 16.4402 },
  }],
};

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Script src="https://www.googletagmanager.com/gtag/js?id=AW-17322617143" strategy="afterInteractive" />
      <Script id="google-ads" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-17322617143');
      ` }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SmoothScroll>{children}</SmoothScroll>
      <WhatsAppButton />
    </NextIntlClientProvider>
  );
}
