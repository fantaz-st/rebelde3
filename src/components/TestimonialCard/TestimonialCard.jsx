import classes from "./TestimonialCard.module.css";

export default function TestimonialCard({ title, text, name, tour, isActive = false }) {
  return (
    <div className={`${classes.card} ${isActive ? classes.cardActive : ""}`}>

      <h3 className={classes.title}>{title}</h3>

      <p className={classes.quote}>{text}</p>

      {/* Pushes stars + footer to the bottom */}
      <div className={classes.spacer} aria-hidden="true" />

      <div className={classes.stars} role="img" aria-label="5 out of 5 stars">★★★★★</div>

      <footer className={classes.footer}>
        <div className={classes.avatar} aria-hidden="true">
          {name.charAt(0).toUpperCase()}
        </div>
        <div className={classes.meta}>
          <p className={classes.name}>{name}</p>
          <p className={classes.tour}>{tour}</p>
        </div>
      </footer>

    </div>
  );
}
