import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export const metadata = {
  title: "The Boat – Felix 37 Buenaventura",
  description:
    "Meet Buenaventura — our custom Felix 37 speedboat. 500HP, 12-guest capacity, full amenities. Built for private Adriatic tours from Split.",
  alternates: {
    canonical: "https://www.rebelde.hr/the-boat",
  },
  openGraph: {
    url: "https://www.rebelde.hr/the-boat",
    title: "The Boat – Felix 37 Buenaventura | Rebelde Boats",
    description:
      "500HP Felix 37 speedboat for private tours from Split, Croatia. Sundeck, sound system, SUP boards, and up to 12 guests.",
  },
};

export default function InnerLayout({ children }) {
  return (
    <>
      <Header variant="blue" />
      <main>{children}</main>
      <Footer />
    </>
  );
}
