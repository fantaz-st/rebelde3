
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

const playfair={variable:"--font-display"};

const dmSans={variable:"--font-body"};

export default function RootLayout({ children }) {
  return (
    <html
      suppressHydrationWarning
      className={`${playfair.variable} ${dmSans.variable}`}
    >
      <head>
        {/*
          The two fonts.* preconnects are gone. `next/font/google` downloads
          the fonts at build time and serves them from our own origin, so the
          browser never contacts Google Fonts — PageSpeed was reporting them
          as unused, and an unused preconnect holds open a connection slot
          that a real request could have used.

          Google Tag Manager is genuinely third-party and loads early enough
          to be worth the hint.
        */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body>{children}</body>
    </html>
  );
}
