"use client";

import Link from "next/link";
import RevealImage from "@/components/RevealImage/RevealImage";
import classes from "./TourWhoFor.module.css";

export default function TourWhoFor({ tour, lead }) {
  const w = tour.whoItsFor;
  if (!w) return null;

  return (
    <section
      id="who-for"
      className={classes.wrap}
      aria-label={"Who this tour suits"}
    >
      {lead && (
        <RevealImage
          src={lead}
          alt=""
          title={"Who this tour suits"}
          height="62vh"
          sizes="100vw"
          className={classes.lead}
        />
      )}

      <div className={`container grid ${classes.container}`}>
        <div className={classes.body}>
          <p className={classes.para}>{w.paragraph}</p>

          {w.tags && w.tags.length > 0 && (
            <ul className={classes.tags}>
              {w.tags.map((tag) => (
                <li key={tag} className={classes.tag}>
                  {tag}
                </li>
              ))}
            </ul>
          )}

          {w.compareLink && (
            <p className={classes.compare}>
              <span className={classes.compareLabel}>{"Compare with"}</span>
              <Link
                href={`/tours/${w.compareLink.slug}`}
                className={classes.compareLink}
              >
                <span>{w.compareLink.label}</span>
                <span aria-hidden="true" className={classes.compareArrow}>
                  →
                </span>
              </Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
