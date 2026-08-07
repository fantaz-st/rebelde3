import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";

import { routing } from "@/i18n/routing";
import { SHARED, pickMessages } from "@/i18n/namespaces";
import { JsonLd, siteGraph, pageMetadata, SITE_NAME, SITE_URL } from "@/lib/schema";

import SmoothScroll from "../SmoothScroll";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";

/**
 * The one and only page shell.
 *
 * Previously ten near-identical layouts (one per route) each rendered
 * Header + main + Footer and re-declared its own metadata. The header
 * colour now comes from the pathname inside Header itself, so a single
 * layout covers every route.
 */

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });

  return {
    metadataBase: new URL(SITE_URL),
    ...pageMetadata({
      locale,
      path: "",
      title: t("title"),
      description: t("description"),
    }),
    title: { default: t("title"), template: `%s | ${SITE_NAME}` },
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "travel",
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

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const messages = await getMessages();
  const tTours = await getTranslations({ locale, namespace: "tourItems" });

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={pickMessages(messages, SHARED)}
    >
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-17322617143"
        strategy="afterInteractive"
      />
      <Script id="google-ads" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-17322617143');`}
      </Script>

      <JsonLd data={siteGraph(tTours)} id="site-jsonld" />

      <SmoothScroll>
        <Header />
        <main>{children}</main>
        <Footer />
      </SmoothScroll>

      <WhatsAppButton />
    </NextIntlClientProvider>
  );
}
