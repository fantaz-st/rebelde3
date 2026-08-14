"use client";

import testimonials from "@/settings/testimonials";
import classes from "./TourTestimonials.module.css";

/**
 * Filter testimonials whose `tour` string matches this tour.
 *
 * Matched against the tour KEY rather than the translated label — the old
 * substring match on `tour.label` silently returned zero results on every
 * non-English locale once the label started coming from messages.
 */
export default function TourTestimonials({ tour }) {

  const slug = (s) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const tourWords = tour.key.split("-").filter((w) => w.length > 3);

  const matches = testimonials
    .filter((r) => {
      if (!r.tour) return false;
      const s = slug(r.tour);
      return tourWords.some((w) => s.includes(w));
    })
    .slice(0, 3);

  if (matches.length === 0) return null;

  return (
    <section className={classes.wrap} aria-label={"Guest voices"}>
      <div className={`container grid ${classes.container}`}>
        <div className={classes.head}>
          <h2 className={classes.heading}>{"What guests say about this tour"}</h2>
        </div>

        <ul className={classes.quotes}>
          {matches.map((r) => (
            <li key={r.id} className={classes.quote}>
              <div className={classes.stars} aria-label="5 out of 5 stars">
                <span aria-hidden="true">★★★★★</span>
              </div>
              {r.title && <h3 className={classes.quoteTitle}>{r.title}</h3>}
              <blockquote className={classes.quoteBody}>{r.text}</blockquote>
              <footer className={classes.quoteFooter}>
                <cite className={classes.quoteAuthor}>— {r.name}</cite>
                {r.tour && <span className={classes.quoteTour}>{r.tour}</span>}
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
