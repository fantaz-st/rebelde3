import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export const metadata = {
  title: "Private Boat Tours Split, Croatia – Island Hopping & Day Trips",
  description:
    "Book a private boat tour from Split, Croatia. Explore Hvar, Blue Cave, Blue Lagoon, Vis & more on a luxury Felix 37 speedboat. Up to 12 guests, fully personalised.",
  alternates: {
    canonical: "https://www.rebelde.hr",
  },
  openGraph: {
    url: "https://www.rebelde.hr",
    title: "Rebelde Boats | Private Boat Tours Split, Croatia",
    description:
      "Explore the Adriatic on a private speedboat from Split. Hvar, Blue Cave, Blue Lagoon & more — fully tailored to your group.",
  },
};

export default function HomeLayout({ children }) {
  return (
    <>
      <Header variant="white" />
      <main>{children}</main>
      <Footer />
    </>
  );
}
