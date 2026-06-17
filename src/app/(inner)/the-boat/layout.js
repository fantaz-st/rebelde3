import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export const metadata = {
  title: "The Boat – Felix 37 Buenaventura | Rebelde Boats",
  description:
    "Meet Buenaventura — our Felix 37 custom speedboat built for the Adriatic. 500HP, 12 guests, extra-large sundeck, onboard fridge and restroom. Private boat tours from Split, Croatia.",
  alternates: {
    canonical: "https://www.rebelde.hr/the-boat",
  },
  openGraph: {
    url: "https://www.rebelde.hr/the-boat",
    title: "The Boat – Felix 37 Buenaventura | Rebelde Boats",
    description:
      "Our Felix 37 Buenaventura is custom-built for the Adriatic — 500HP, 12 guests, and every comfort for a full day on the water.",
  },
};

export default function TheBoatLayout({ children }) {
  return (
    <>
      <Header variant="white" />
      <main>{children}</main>
      <Footer />
    </>
  );
}
