import classes from "./JournalHero.module.css";

export default function JournalHero({ title, description }) {
  return (
    <section className={classes.wrap} aria-label="Journal">
      <div className={`container grid ${classes.container}`}>
        <div className={classes.titleWrap}>
          <h1 className={classes.title}>{title}</h1>
        </div>
        {description && (
          <div className={classes.descWrap}>
            <p className={classes.desc}>{description}</p>
          </div>
        )}
      </div>
    </section>
  );
}
