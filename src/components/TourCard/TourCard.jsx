import Link from "next/link";
import Image from "next/image";
import classes from "./TourCard.module.css";

export default function TourCard({
  href = "/",
  imageSrc,
  imageAlt = "",
  kicker,
  title,
  depositEur,    // cents, e.g. 30000 = €300
  restEur,       // cents, e.g. 110000 = €1,100
}) {
  const fullPrice = depositEur && restEur
    ? `Starting from €${((depositEur + restEur) / 100).toLocaleString('en')}`
    : depositEur
    ? `Starting from €${(depositEur / 100).toLocaleString('en')}`
    : null;

  return (
    <Link href={href} className={classes.card}>
      {/* Full-bleed photo */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="(max-width: 767px) 92vw, (max-width: 991px) 60vw, 25vw"
        className={classes.img}
      />

      {/* Gradient overlay */}
      <div className={classes.overlay} aria-hidden="true" />

      {/* Deposit pill — top right */}
      {fullPrice && (
        <span className={classes.depositPill}>
          {fullPrice}
        </span>
      )}

      {/* Bottom content */}
      <div className={classes.bottom}>
        <h4 className={classes.title}>{title}</h4>

        {kicker && (
          <p className={classes.kicker}>{kicker}</p>
        )}

        <div className={classes.location}>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 1a5 5 0 0 1 5 5c0 3.5-5 9-5 9S3 9.5 3 6a5 5 0 0 1 5-5Z" fill="currentColor" fillOpacity=".9"/>
            <circle cx="8" cy="6" r="1.75" fill="white"/>
          </svg>
          <span>Split, Croatia</span>
        </div>
      </div>
    </Link>
  );
}