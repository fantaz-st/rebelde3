"use client";

import { useRef } from "react";
import classes from "./Faq.module.css";
import faqs from "@/settings/faqs";
import SectionNav from "@/components/SectionNav/SectionNav";

export default function Faq() {
  const contentRef = useRef(null);

  const sections = faqs.map((s) => ({ id: s.id, label: s.title }));

  return (
    <section className={classes.wrap}>
      <div className={`container ${classes.head}`}>
        <h1 className={classes.title}>FAQ</h1>
        <p className={classes.subtitle}>
          Everything you might want to know before stepping aboard. Can&apos;t find your
          answer?{" "}
          <a href="/contact" className={classes.subtitleLink}>
            Reach out
          </a>{" "}
          and we&apos;ll help.
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
          {faqs.map((section) => (
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
