import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

export const metadata = {
  title: "FAQ – Common Questions About Our Boat Tours",
  description:
    "Answers to common questions about Rebelde Boats private tours from Split — what's included, the boat, park fees, weather policy, seasickness, and how to book.",
  alternates: {
    canonical: "https://www.rebelde.hr/faq",
  },
  openGraph: {
    url: "https://www.rebelde.hr/faq",
    title: "FAQ | Rebelde Boats",
    description:
      "Everything you need to know before booking a private boat tour from Split with Rebelde Boats.",
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
