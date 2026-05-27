import Image from "next/image";
import classes from "./TourCard.module.css";

export default function TourCard({ targetId, imageSrc, imageAlt = "", kicker, title, onClick }) {
  const handleClick = (e) => {
    e.preventDefault();
    onClick?.();
  };

  return (
    <a
      href={`#${targetId}`}
      className={classes.card}
      aria-label={title}
      onClick={handleClick}
    >
      <div className={classes.inner}>
        {!!kicker && (
          <div className={classes.kicker} data-swipe-kicker>
            {kicker}
          </div>
        )}
        <h4 className={classes.headline} data-swipe-title>
          {title}
        </h4>
        <div className={classes.bg}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 767px) 92vw, (max-width: 991px) 60vw, 25vw"
            className={classes.img}
            data-swipe-img
          />
          <div className={classes.overlay} />
        </div>
      </div>
    </a>
  );
}
