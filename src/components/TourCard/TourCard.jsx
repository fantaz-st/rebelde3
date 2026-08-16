"use client";

import Image from "next/image";
import Link from "next/link";
import classes from "./TourCard.module.css";

/**
 * Takes a single `tour` object built by `buildTourCard()` — struct fields from
 * settings/tours.js merged with translated copy from `tourItems`.
 *
 * Price formatting is pinned to en-GB — the site is English-only.
 */
export default function TourCard({ tour }) {

  const { href, thumb, thumbAlt, kicker, pin, label, depositEur, restEur } = tour;

  const cents = depositEur && restEur ? depositEur + restEur : depositEur;
  const price = cents
    ? `Starting from ${new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }).format(cents / 100)}`
    : null;

  return (
    <Link href={href} className={classes.card}>
      <Image
        src={thumb}
        alt={thumbAlt || label}
        fill
        sizes="(max-width: 767px) 92vw, (max-width: 991px) 60vw, 25vw"
        className={classes.img}
      />

      <div className={classes.overlay} aria-hidden="true" />

      {price && <span className={classes.depositPill}>{price}</span>}

      <div className={classes.bottom}>
        <h3 className={classes.title}>{label}</h3>

        {kicker && <p className={classes.kicker}>{kicker}</p>}

        {pin && (
          <div className={classes.location}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 1a5 5 0 0 1 5 5c0 3.5-5 9-5 9S3 9.5 3 6a5 5 0 0 1 5-5Z" fill="currentColor" fillOpacity=".9"/>
              <circle cx="8" cy="6" r="1.75" fill="white"/>
            </svg>
            <span>{pin}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
