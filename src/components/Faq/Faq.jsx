"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useRef } from "react";
import classes from "./Faq.module.css";
import faqs from "@/settings/faqs";
import SectionNav from "@/components/SectionNav/SectionNav";

export default function Faq() {
  const t  = useTranslations("faq");
  const tc = useTranslations("faqCategories");

  const contentRef = useRef(null);

  // settings/faqs.js is ids only now — every string comes from messages,
  // so /hr/faq, /de/faq etc. render translated copy instead of English.
  const translatedFaqs = faqs.map((section) => ({
    id: section.id,
    title: tc(section.id),
    qa: section.qa.map((id) => ({
      id,
      question: t(`${id}.question`),
      answer:   t(`${id}.answer`),
    })),
  }));

  const sections = translatedFaqs.map((s) => ({ id: s.id, label: s.title }));

  return (
    <section className={classes.wrap}>
      <div className={`container ${classes.head}`}>
        {/*
          H1 upgraded from bare "FAQ" to a descriptive, keyword-rich heading.
          Pulls from faq.heading translation key with a sensible fallback.
        */}
        <h1 className={classes.title}>{t("heading")}</h1>
        <p className={classes.subtitle}>
          {t("subtitle")}{" "}
          <Link href="/contact" className={classes.subtitleLink}>{t("subtitleLink")}</Link>
          {t("subtitleSuffix")}
        </p>
      </div>

      <div className={`container grid ${classes.grid}`}>
        <SectionNav
          sections={sections}
          containerRef={contentRef}
          topOffset={140}
          variant="rail"
        />

        <div className={classes.content} ref={contentRef}>
          {translatedFaqs.map((section) => (
            <div
              key={section.id}
              id={section.id}
              className={classes.section}
            >
              <h2 className={classes.sectionTitle}>{section.title}</h2>

              <dl className={classes.qaList}>
                {section.qa.map((item) => (
                  <div key={item.id} className={classes.qa}>
                    <dt className={classes.question}>{item.question}</dt>
                    <dd className={classes.answer}>{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
