import Header from "@/components/Header/Header";
import SmallFooter from "@/components/SmallFooter/SmallFooter";

export const metadata = {
  title: "Contact & Bookings",
  description:
    "Book a private boat tour or send an enquiry to Rebelde Boats. Reach us via the form, WhatsApp, or email — we respond within a few hours during the season.",
  alternates: {
    canonical: "https://www.rebelde.hr/contact",
  },
  openGraph: {
    url: "https://www.rebelde.hr/contact",
    title: "Contact & Bookings | Rebelde Boats",
    description:
      "Get in touch with Rebelde Boats to book a private tour or ask a question. Fast response guaranteed.",
  },
};

export default function InnerLayout({ children }) {
  return (
    <>
      <Header variant="white" />
      <main>{children}</main>
      <SmallFooter />
    </>
  );
}
