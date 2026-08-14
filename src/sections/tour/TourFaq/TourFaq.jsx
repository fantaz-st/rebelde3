import { getFaq } from "@/settings/faqs";
import classes from "./TourFaq.module.css";

export default async function TourFaq({ tour }) {
  if (!tour.faqIds || tour.faqIds.length === 0) return null;

  const items = tour.faqIds
    .map(getFaq)
    .filter(Boolean);

  if (items.length === 0) return null;

  return (
    <section className={classes.wrap} aria-label={"Common questions about this tour"}>
      <div className={`container grid ${classes.container}`}>
        <div className={classes.head}>
          <h2 className={classes.heading}>{"Common questions about this tour"}</h2>
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
