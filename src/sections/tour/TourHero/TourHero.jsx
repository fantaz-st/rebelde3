import classes from "./TourHero.module.css";

export default function TourHero({ tour }) {
  return (
    <section className={classes.wrap} aria-label={tour.label}>
      <div className={`container grid ${classes.container}`}>
        <div className={classes.text}>
          <p className={classes.kicker}>
            <span>{tour.durationLabel}</span>
            <span aria-hidden="true" className={classes.kickerSep}>
              ·
            </span>
            <span>{tour.capacityLabel}</span>
            <span aria-hidden="true" className={classes.kickerSep}>
              ·
            </span>
            <span>{tour.priceLabel}</span>
          </p>
          <h1 className={classes.title}>{tour.label}</h1>
          <p className={classes.subtitle}>{tour.intro}</p>
        </div>
      </div>
    </section>
  );
}
