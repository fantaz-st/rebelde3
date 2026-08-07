import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Messages from "@/i18n/Messages";
import ContactForm from "@/components/ContactForm/ContactForm";
import classes from "./page.module.css";
import { breadcrumb, JsonLd, contactPage, pageMetadata } from "@/lib/schema";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.contact" });
  return pageMetadata({
    locale,
    path: "/contact",
    title: t("title"),
    description: t("description"),
  });
}

export default async function ContactPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.contact" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  return (
    <Messages route="contact">
      <JsonLd
        data={contactPage({
          locale,
          title: t("title"),
          description: t("description"),
        })}
        id="contact-jsonld"
      />
      <JsonLd
        data={breadcrumb([{ name: tNav("contact"), url: "/contact" }], locale, tNav("home"))}
        id="breadcrumb-jsonld"
      />

      <div className={classes.wrap}>
        {/* Visually hidden but semantically present — the form's own heading
            plays the H1 role visually. */}
        <h1 className="visuallyHidden">{t("title")}</h1>

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
    </Messages>
  );
}
