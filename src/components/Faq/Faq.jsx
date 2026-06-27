"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import classes from "./Faq.module.css";
import faqs from "@/settings/faqs";
import SectionNav from "@/components/SectionNav/SectionNav";

export default function Faq() {
  const t  = useTranslations("faq");
  const tc = useTranslations("faqCategories");

  const contentRef = useRef(null);

  // Translate section titles and Q&A
  const translatedFaqs = faqs.map((section) => ({
    ...section,
    title: tc(section.id),
    qa: section.qa.map((item) => ({
      ...item,
      question: t(`${item.id}.question`),
      answer:   t(`${item.id}.answer`),
    })),
  }));

  const sections = translatedFaqs.map((s) => ({ id: s.id, label: s.title }));

  return (
    <section className={classes.wrap}>
      <div className={`container ${classes.head}`}>
        <h1 className={classes.title}>FAQ</h1>
        <p className={classes.subtitle}>
          {t("subtitle")}{" "}
          <a href="/contact" className={classes.subtitleLink}>{t("subtitleLink")}</a>
          {t("subtitleSuffix")}
        </p>
      </div>

      <div className={`container grid ${classes.grid}`}>
        <SectionNav sections={sections} containerRef={contentRef} topOffset={140} variant="rail" />

        <div className={classes.content} ref={contentRef}>
          {translatedFaqs.map((section) => (
            <div key={section.id} id={section.id} className={classes.section}>
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
