import classes from "./BespokeCustom.module.css";

const flexible = [
  "Route and stops",
  "Timing (early start, sunset return, half-day, full-day)",
  "Lunch venue and drinks",
  "Music playlist",
  "Special occasions (birthdays, engagements, anniversaries — tell us and we'll set it up)",
];

const fixed = [
  "Maximum 12 guests",
  "Licensed skipper always onboard",
  "Snorkel gear and towels (standard on every trip)",
  "Weather calls made the evening before",
  "The boat itself (there's only one Buenaventura — you're always on it)",
];

export default function BespokeCustom() {
  return (
    <section className={classes.wrap} aria-label="What you can shape">
      <div className={`container grid ${classes.container}`}>
        <div className={classes.head}>
          <p className={classes.eyebrow}>Fully yours vs fully ours</p>
          <h2 className={classes.heading}>
            What you can shape, and what stays fixed
          </h2>
          <p className={classes.lede}>
            Some things are yours to decide. Others are non-negotiable —
            usually because they&apos;re about safety or the standards we hold
            ourselves to. Both lists are short and honest.
          </p>
        </div>

        <div className={classes.columns}>
          <div className={classes.column}>
            <h3 className={classes.columnTitle}>Fully yours to shape</h3>
            <ul className={classes.list}>
              {flexible.map((item, i) => (
                <li key={i} className={classes.item}>
                  <span className={classes.dot} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${classes.column} ${classes.columnFixed}`}>
            <h3 className={classes.columnTitle}>Fixed for safety and quality</h3>
            <ul className={classes.list}>
              {fixed.map((item, i) => (
                <li key={i} className={classes.item}>
                  <span className={classes.dot} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
