import { getTranslations } from "next-intl/server";
import classes from "./BespokeFaq.module.css";

const faqIds = [
  "booking-q1",
  "booking-q2",
  "booking-q3",
  "general-q2",
  "general-q5",
  "general-q1",
];

export default async function BespokeFaq({ locale }) {
  const t = await getTranslations({ locale, namespace: "faq" });

  const items = faqIds
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
    <section className={classes.wrap} aria-label="Booking questions">
      <div className={`container grid ${classes.container}`}>
        <div className={classes.head}>
          <p className={classes.eyebrow}>Booking questions</p>
          <h2 className={classes.heading}>What people ask before they book</h2>
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
