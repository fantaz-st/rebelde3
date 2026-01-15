import Link from "next/link";
import Image from "next/image";
import classes from "./TourCard.module.css";

export default function TourCard({ href = "/", imageSrc, imageAlt = "", kicker, title }) {
  return (
    <Link href={href} className={classes.card}>
      <div className={classes.inner}>
        {!!kicker && (
          <div className={classes.kicker} data-swipe-kicker>
            {kicker}
          </div>
        )}
        <div className={classes.headline} data-swipe-title>
          {title}
        </div>
      </div>

      <div className={classes.bg}>
        <Image src={imageSrc} alt={imageAlt} fill sizes="(max-width: 767px) 92vw, (max-width: 991px) 60vw, 25vw" className={classes.img} data-swipe-img />
        <div className={classes.overlay} />
      </div>
    </Link>
  );
}
