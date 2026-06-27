import { Inter, Fraunces } from "next/font/google";
import "./styles/reset.css";
import "./styles/globals.css";
import "./styles/typography.css";
import "./styles/grid.css";
import "./styles/swiper.css";

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

// suppressHydrationWarning on <html> prevents the hydration error caused by
// [locale]/layout.js setting lang={locale} on the same element server-side.
// The attribute change is expected and safe — both layouts agree on the structure.
export default function RootLayout({ children }) {
  return (
    <html
      suppressHydrationWarning
      className={`${inter.variable} ${fraunces.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
