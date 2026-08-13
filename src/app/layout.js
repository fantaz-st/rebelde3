import { Archivo, DM_Sans } from "next/font/google";
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

export default function RootLayout({ children }) {
  return (
    <html
      suppressHydrationWarning
      className={`${display.variable} ${dmSans.variable}`}
    >
      <head>
        {/*
          No fonts.* preconnects: next/font downloads the faces at build time
          and serves them from our own origin, so the browser never contacts
          Google Fonts. PageSpeed was reporting them as unused, and an unused
          preconnect holds a connection slot a real request could have used.
        */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body>{children}</body>
    </html>
  );
}
