import { getTranslations } from "next-intl/server";
import classes from "./TourFaq.module.css";

export default async function TourFaq({ tour, locale }) {
  if (!tour.faqIds || tour.faqIds.length === 0) return null;

  const t = await getTranslations({ locale, namespace: "faq" });
  const td = await getTranslations({ locale, namespace: "tourDetail" });

  const items = tour.faqIds
    .map((id) => {
      try {
        return { id, question: t(`${id}.question`), answer: t(`${id}.answer`) };
      } catch {
        return null;
      }
    })
    .filter(Boolean);

  if (items.length === 0) return null;

  return (
    <section className={classes.wrap} aria-label={td("faqHeading")}>
      <div className={`container grid ${classes.container}`}>
        <div className={classes.head}>
          <p className={classes.eyebrow}>{td("faqEyebrow")}</p>
          <h2 className={classes.heading}>{td("faqHeading")}</h2>
        </div>

        <dl className={classes.list}>
          {items.map((item) => (
            <div key={item.id} className={classes.qa}>
              <dt className={classes.question}>{item.question}</dt>
              <dd className={classes.answer}>{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
