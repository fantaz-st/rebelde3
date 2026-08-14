import Image from "next/image";
import ContactForm from "@/components/ContactForm/ContactForm";
import classes from "./page.module.css";
import { breadcrumb, JsonLd, contactPage, pageMetadata } from "@/lib/schema";

export async function generateMetadata() {
  return pageMetadata({
    path: "/contact",
    title: "Contact – Get In Touch",
    description: "Get in touch with Rebelde Boats to book a private boat tour from Split, Croatia.",
  });
}

export default async function ContactPage({ params }) {

  return (
    <>
      <JsonLd
        data={contactPage({
          title: "Contact – Get In Touch",
          description: "Get in touch with Rebelde Boats to book a private boat tour from Split, Croatia.",
        })}
        id="contact-jsonld"
      />
      <JsonLd
        data={breadcrumb([{ name: "Contact", url: "/contact" }], "Home")}
        id="breadcrumb-jsonld"
      />

      <div className={classes.wrap}>
        {/* Visually hidden but semantically present — the form's own heading
            plays the H1 role visually. */}
        <h1 className="visuallyHidden">{"Contact – Get In Touch"}</h1>

        <div className={classes.bg} aria-hidden="true">
          <Image
            src="/images/contact.jpg"
            alt=""
            fill
            sizes="100vw"
            className={classes.bgImg}
          />
          <div className={classes.bgOverlay} />
        </div>

        <div className={`container ${classes.inner}`}>
          <div className={classes.card}>
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
}
