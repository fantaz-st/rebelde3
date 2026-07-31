import Image from "next/image";
import { reviewPlatforms } from "@/settings/reviews-meta";
import classes from "./ReviewsLeave.module.css";

/**
 * "Leave a review" block — the whole reason this page exists as an SEO play.
 * Sends past guests to TripAdvisor / Google / GetYourGuide to add a review
 * there, which is where reviews actually move rankings and LLM signal.
 */
export default function ReviewsLeave() {
  return (
    <section className={classes.wrap} aria-label="Leave a review">
      <div className={`container grid ${classes.container}`}>

        <div className={classes.textWrap}>
          <p className={classes.eyebrow}>Been out with us?</p>
          <h2 className={classes.title}>
            Your review means the world to us
          </h2>
          <p className={classes.desc}>
            A few words from you helps other travellers find us, and helps
            our crew keep making days on the Adriatic that live up to what
            you experienced.
          </p>
        </div>

        <ul className={classes.platforms}>
          {reviewPlatforms.map((p) => (
            <li key={p.id} className={classes.platform}>
              <a
                href={p.leaveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.platformLink}
              >
                <div className={classes.platformLogo}>
                  <Image
                    src={p.logo}
                    alt={p.logoAlt}
                    width={120}
                    height={28}
                    className={classes.platformLogoImg}
                  />
                </div>
                <span className={classes.platformCta}>
                  Write a review
                  <span className={classes.platformArrow} aria-hidden="true">→</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}
