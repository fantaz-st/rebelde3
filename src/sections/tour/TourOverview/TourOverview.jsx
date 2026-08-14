"use client";

import Image from "next/image";
import RevealImage from "@/components/RevealImage/RevealImage";
import classes from "./TourOverview.module.css";

export default function TourOverview({ tour, lead }) {

  return (
    <section
      id="overview"
      className={classes.wrap}
      aria-label={"The day"}
    >
      {lead && (
        <RevealImage
          src={lead}
          alt=""
          title={"The Adriatic, beyond the postcards"}
          height="62vh"
          sizes="100vw"
          className={classes.lead}
        />
      )}

      <div className={`container grid ${classes.container}`}>
        <div className={classes.body}>
          {tour.overview.map((para, i) => (
            <p key={i} className={classes.para}>
              {para}
            </p>
          ))}
        </div>

        <aside className={classes.facts}>
          {tour.subImg && (
            <div className={classes.subImg}>
              <div className={classes.subImgInner}>
                <Image
                  src={tour.subImg}
                  alt=""
                  fill
                  sizes="(max-width: 991px) 100vw, 30vw"
                  quality={85}
                  className={classes.subImgEl}
                />
              </div>
            </div>
          )}
          <dl className={classes.factsList}>
            {tour.keyFacts.map((f) => (
              <div key={f.label} className={classes.fact}>
                <dt className={classes.factLabel}>{f.label}</dt>
                <dd className={classes.factValue}>{f.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
