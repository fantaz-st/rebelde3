import { Inter, DM_Serif_Display } from "next/font/google";
import "./styles/reset.css";
import "./styles/globals.css";
import "./styles/typography.css";
import "./styles/grid.css";
import "./styles/swiper.css";
import SmoothScroll from "./SmoothScroll";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export const metadata = {
  title: "Rebelde Boats | Split Island-Hopping Day Trips & Exclusive Charters",
  description: "Private boat tours in Split, Croatia. Rebelde boats offers luxury island-hopping experiences.",
  keywords: ["Rebelde", "Boat Tours Split", "Croatia Private Tour", "Island Hopping", "Hvar", "Blue Cave", "Blue lagoon"],
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

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable}`}>
      <body>
        <SmoothScroll>
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
