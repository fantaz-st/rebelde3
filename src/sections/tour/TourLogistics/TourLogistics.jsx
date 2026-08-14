"use client";

import RevealImage from "@/components/RevealImage/RevealImage";
import classes from "./TourLogistics.module.css";

export default function TourLogistics({ tour, lead }) {
  if (!tour.logistics || tour.logistics.length === 0) return null;

  return (
    <section
      id="logistics"
      className={classes.wrap}
      aria-label={"Practicalities"}
    >
      {lead && (
        <RevealImage
          src={lead}
          alt=""
          title={"Good to know"}
          height="62vh"
          sizes="100vw"
          className={classes.lead}
        />
      )}

      <div className={`container grid ${classes.container}`}>
        <div className={classes.items}>
          {tour.logistics.map((item, i) => (
            <div key={i} className={classes.item}>
              <h3 className={classes.itemTitle}>{item.title}</h3>
              <p className={classes.itemBody}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
