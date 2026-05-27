import Image from "next/image";
import ContactForm from "@/components/ContactForm/ContactForm";
import classes from "./page.module.css";

export const metadata = {
  title: "Contact — Rebelde Boats",
  description: "Get in touch with the Rebelde Boats team for bookings, custom tours, and inquiries.",
};

export default function ContactPage() {
  return (
    <main className={classes.wrap}>
      {/* Faded sea backdrop */}
      <div className={classes.bg} aria-hidden="true">
        <Image
          src="/images/contact.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className={classes.bgImg}
        />
        <div className={classes.bgOverlay} />
      </div>

      <div className={`container ${classes.inner}`}>
        <div className={classes.card}>
          <ContactForm   />
        </div>
      </div>
    </main>
  );
}
