import Image from "next/image";
import { getTranslations } from "next-intl/server";
import ContactForm from "@/components/ContactForm/ContactForm";
import classes from "./page.module.css";
import { breadcrumb, JsonLd, SITE_URL, BUSINESS_ID, WEBSITE_ID } from "@/lib/schema";

export default async function ContactPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.contact" });

  const localePrefix = locale === "en" ? "" : `/${locale}`;

  const contactPageJsonLd = {
    "@context":  "https://schema.org",
    "@type":     "ContactPage",
    url:         `${SITE_URL}${localePrefix}/contact`,
    name:        t("title"),
    description: t("description"),
    inLanguage:  locale,
    isPartOf:    { "@id": WEBSITE_ID },
    mainEntity:  { "@id": BUSINESS_ID },
  };

  const crumbsJsonLd = breadcrumb([{ name: "Contact", url: "/contact" }], locale);

  return (
    <>
      <JsonLd data={contactPageJsonLd} id="contact-jsonld" />
      <JsonLd data={crumbsJsonLd}      id="breadcrumb-jsonld" />

      <main className={classes.wrap}>
        {/*
          Visually-hidden but semantically present H1.
          Contact page has no visible H1 because the form's own heading
          plays that role visually — but Google wants a keyword-rich H1.
        */}
        <h1
          style={{
            position: "absolute",
            width:    "1px",
            height:   "1px",
            padding:  0,
            margin:   "-1px",
            overflow: "hidden",
            clip:     "rect(0,0,0,0)",
            whiteSpace: "nowrap",
            border:   0,
          }}
        >
          {t("title")}
        </h1>

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
      </main>
    </>
  );
}
