import { Playfair_Display, DM_Sans } from "next/font/google";
import "./styles/reset.css";
import "./styles/globals.css";
import "./styles/typography.css";
import "./styles/grid.css";
import "./styles/swiper.css";

export const viewport = {
  // Brand navy so mobile Chrome/Safari tint the address bar to match the site.
  // Was "#ffffff" — invisible against Chrome's default white theme.
  themeColor: "#003357",
};

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style:  ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html
      suppressHydrationWarning
      className={`${playfair.variable} ${dmSans.variable}`}
    >
      <head>
        {/* Preconnect for third-party origins we always hit early */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body>{children}</body>
    </html>
  );
}
