import { Archivo, DM_Sans } from "next/font/google";
import Script from "next/script";

import {
  JsonLd,
  siteGraph,
  pageMetadata,
  SITE_NAME,
  SITE_URL,
} from "@/lib/schema";

import SmoothScroll from "./SmoothScroll";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";
import BackToTop from "@/components/BackToTop/BackToTop";
import ScrollIndicator from "@/components/ScrollIndicator/ScrollIndicator";

import "./styles/reset.css";
import "./styles/globals.css";
import "./styles/typography.css";
import "./styles/grid.css";

/**
 * The one and only layout.
 *
 * Was split in two while the site was multilingual — a root layout owning
 * <html>/<body> and a [locale] layout owning the shell. With one language
 * there is no [locale] segment, so they are a single file again.
 */

export const viewport = {
  // Brand navy so mobile Chrome/Safari tint the address bar to match the site.
  themeColor: "#003357",
};

const display = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export function generateMetadata() {
  return {
    metadataBase: new URL(SITE_URL),
    ...pageMetadata({
      path: "",
      title:
        "Rebelde Boats — Private Boat Tours Split, Croatia | Island Hopping & Day Trips",
      description:
        "Private boat tours from Split, Croatia. Hvar, the Blue Cave, the Blue Lagoon and Vis aboard a 12-guest Felix 37 speedboat.",
    }),
    title: {
      default:
        "Rebelde Boats — Private Boat Tours Split, Croatia | Island Hopping & Day Trips",
      template: `%s | ${SITE_NAME}`,
    },
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

export default function RootLayout({ children }) {
  return (
    <html
      suppressHydrationWarning
      className={`${display.variable} ${dmSans.variable}`}
      hrefLang="en"
    >
      <head>
        {/*
          No fonts.* preconnects: next/font downloads the faces at build time
          and serves them from our own origin, so the browser never contacts
          Google Fonts.
        */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body>
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

        <JsonLd data={siteGraph()} id="site-jsonld" />

        <SmoothScroll>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>

        <WhatsAppButton />
        <BackToTop />
        <ScrollIndicator />
      </body>
    </html>
  );
}
