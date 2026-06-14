import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

export const metadata = {
  title: "Bespoke Tours – Private Adriatic Day Trips from Split",
  description:
    "Choose your private boat tour from Split: Blue Lagoon & Three Islands, Blue Cave & Five Islands, Hvar & Pakleni, or Bol & Hvar. All routes personalised for your group.",
  alternates: {
    canonical: "https://www.rebelde.hr/bespoke-tours",
  },
  openGraph: {
    url: "https://www.rebelde.hr/bespoke-tours",
    title: "Bespoke Tours | Rebelde Boats",
    description:
      "Four private boat tour routes from Split — Blue Lagoon, Blue Cave, Hvar, Bol. Fully customisable, up to 12 guests.",
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
