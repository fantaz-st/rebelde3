"use client";

import RevealImage from "@/components/RevealImage/RevealImage";
import classes from "./TourItinerary.module.css";

export default function TourItinerary({ tour, lead }) {

  return (
    <section
      id="itinerary"
      className={classes.wrap}
      aria-label={"Route"}
    >
      {lead && (
        <RevealImage
          src={lead}
          alt=""
          title={"Where the day takes you"}
          height="62vh"
          sizes="100vw"
          className={classes.lead}
        />
      )}

      <div className={`container grid ${classes.container}`}>
        <ol className={classes.stops}>
          {tour.itinerary.map((stop, i) => (
            <li key={i} className={classes.stop}>
              <span className={classes.stopNumber} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className={classes.stopContent}>
                <h3 className={classes.stopTitle}>{stop.title}</h3>
                <p className={classes.stopDesc}>{stop.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
