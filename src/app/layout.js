import { Inter, Fraunces } from "next/font/google";
import "./styles/reset.css";
import "./styles/globals.css";
import "./styles/typography.css";
import "./styles/grid.css";
import "./styles/swiper.css";
import SmoothScroll from "./SmoothScroll";
// import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";
import Script from "next/script";

const SITE_URL = "https://www.rebelde.hr";

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Rebelde Boats | Private Boat Tours Split, Croatia",
    template: "%s | Rebelde Boats",
  },
  description:
    "Private boat tours from Split to Hvar, Vis, Blue Cave, Blue Lagoon, Brač, Šolta & Pakleni Islands. Luxury Felix 37 speedboat, personalised itinerary, up to 12 guests.",

  keywords: [
    "boat tours Split",
    "private boat tour Croatia",
    "island hopping Split",
    "Blue Cave tour Split",
    "Hvar boat trip",
    "Blue Lagoon Split",
    "speedboat tour Dalmatia",
    "Vis island tour",
    "Brač boat tour",
    "Šolta boat trip",
    "Pakleni islands tour",
    "Biševo Blue Cave",
    "Zlatni Rat boat tour",
    "private charter Split",
    "Rebelde Boats",
  ],

  authors: [{ name: "Rebelde Boats", url: SITE_URL }],
  creator: "Rebelde Boats",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Rebelde Boats",
    title: "Rebelde Boats | Private Boat Tours Split, Croatia",
    description:
      "Private boat tours from Split to Hvar, Vis, Blue Cave, Blue Lagoon, Brač, Šolta & Pakleni Islands. Luxury speedboat, up to 12 guests.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rebelde Boats – private Adriatic speedboat tours from Split",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Rebelde Boats | Private Boat Tours Split, Croatia",
    description:
      "Private boat tours from Split to Hvar, Vis, Blue Cave, Blue Lagoon, Brač, Šolta & Pakleni Islands. Luxury speedboat, up to 12 guests.",
    images: ["/og-image.jpg"],
  },

  alternates: {
    canonical: SITE_URL,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  themeColor: "#ffffff",
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
  variable: "--font-display",
  display: "swap",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "TouristInformationCenter"],
      "@id": `${SITE_URL}/#business`,
      name: "Rebelde Boats",
      url: SITE_URL,
      logo: `${SITE_URL}/android-chrome-512x512.png`,
      image: `${SITE_URL}/og-image.jpg`,
      description:
        "Private speedboat tours from Split, Croatia. Island-hopping to Hvar, Vis, Blue Cave, Blue Lagoon, Brač, Šolta, and Pakleni Islands.",
      telephone: "+385",
      priceRange: "€€€",
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
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Private Boat Tours from Split",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "TouristTrip",
              name: "Blue Lagoon & Three Islands Escape",
              description:
                "Half-day private boat tour from Split to the Blue Lagoon, Trogir, and Šolta.",
              touristType: ["Family", "Couple", "Group"],
              itinerary: [
                { "@type": "Place", name: "Split, Croatia" },
                { "@type": "Place", name: "Blue Lagoon, Drvenik Mali, Croatia" },
                { "@type": "Place", name: "Trogir, Croatia" },
                { "@type": "Place", name: "Šolta, Croatia" },
              ],
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "TouristTrip",
              name: "Blue Cave & Five Islands Expedition",
              description:
                "Full-day private boat tour from Split to the Blue Cave on Biševo, Vis, Hvar, Stiniva Cove, and Budikovac.",
              touristType: ["Adventurer", "Group"],
              itinerary: [
                { "@type": "Place", name: "Split, Croatia" },
                { "@type": "Place", name: "Blue Cave, Biševo, Croatia" },
                { "@type": "Place", name: "Vis, Croatia" },
                { "@type": "Place", name: "Stiniva Cove, Vis, Croatia" },
                { "@type": "Place", name: "Budikovac, Croatia" },
                { "@type": "Place", name: "Hvar, Croatia" },
              ],
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "TouristTrip",
              name: "Hvar & Pakleni Islands Experience",
              description:
                "Private boat tour from Split to Hvar Town and the Pakleni archipelago.",
              touristType: ["Couple", "Group"],
              itinerary: [
                { "@type": "Place", name: "Split, Croatia" },
                { "@type": "Place", name: "Hvar, Croatia" },
                { "@type": "Place", name: "Pakleni Islands, Croatia" },
              ],
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "TouristTrip",
              name: "Bol, Hvar & Pakleni Islands Coastal Journey",
              description:
                "Private boat tour from Split to Zlatni Rat beach in Bol on Brač, Hvar, and the Pakleni Islands.",
              touristType: ["Family", "Group"],
              itinerary: [
                { "@type": "Place", name: "Split, Croatia" },
                { "@type": "Place", name: "Bol, Brač, Croatia" },
                { "@type": "Place", name: "Zlatni Rat, Brač, Croatia" },
                { "@type": "Place", name: "Hvar, Croatia" },
                { "@type": "Place", name: "Pakleni Islands, Croatia" },
              ],
            },
          },
        ],
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <head>
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
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        {/* <WhatsAppButton /> */}
      </body>
    </html>
  );
}