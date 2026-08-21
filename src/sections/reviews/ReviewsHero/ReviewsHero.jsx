import Image from "next/image";
import classes from "./ReviewsHero.module.css";
import {
  reviewPlatforms,
  totalReviews,
  averageRating,
  yearsOperating,
} from "@/settings/reviews-meta";

/**
 * Reviews hero — title, aggregate stat block, platform badges.
 *
 * Stat block leans on `reviewPlatforms` from settings so the counts stay
 * in sync with the "leave a review" section below. Same 16-col grid setup
 * as the journal hero: title inset to cols 3–7, stats + platforms below.
 */
export default function ReviewsHero() {
  return (
    <section className={classes.wrap} aria-label="Reviews">
      <div className={`container grid ${classes.container}`}>

        <div className={classes.titleWrap}>
          <p className={classes.eyebrow}>What guests say</p>
          <h1 className={classes.title}>
            Guest reviews
          </h1>
          <p className={classes.desc}>
            Every review below is real, from a real day on the water — collected
            across TripAdvisor, Google, and GetYourGuide over our three seasons
            in Split.
          </p>
        </div>

        <div className={classes.statsWrap}>
          <ul className={classes.stats}>
            <li className={classes.stat}>
              <span className={classes.statValue}>{averageRating.toFixed(1)} ★</span>
              <span className={classes.statLabel}>Average rating</span>
            </li>
            <li className={classes.stat}>
              <span className={classes.statValue}>{totalReviews}+</span>
              <span className={classes.statLabel}>Guest reviews</span>
            </li>
            <li className={classes.stat}>
              <span className={classes.statValue}>{yearsOperating}</span>
              <span className={classes.statLabel}>Seasons in Split</span>
            </li>
            <li className={classes.stat}>
              <span className={classes.statValue}>100%</span>
              <span className={classes.statLabel}>Would recommend</span>
            </li>
          </ul>

          <ul className={classes.platforms}>
            {reviewPlatforms.map((p) => (
              <li key={p.id} className={classes.platform}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.platformLink}
                  aria-label={`Read reviews on ${p.name}`}
                >
                  <span className={classes.platformRating}>
                    {p.rating.toFixed(1)} ★
                  </span>
                  <span className={classes.platformDot} aria-hidden="true">·</span>
                  <span className={classes.platformCount}>
                    {p.count}+ reviews on
                  </span>
                  <span className={classes.platformLogo}>
                    <Image
                      src={p.logo}
                      alt={p.logoAlt}
                      width={100}
                      height={20}
                      className={classes.platformLogoImg}
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* Award + ranking. Both are Tripadvisor's assertions rather than
              ours, which is what makes them worth more than the star count
              directly above. */}
          <a
            className={classes.award}
            href="https://www.tripadvisor.com/Attraction_Review-g295370-d28042808-Reviews-Rebelde_Boats-Split_Split_Dalmatia_County_Dalmatia.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/logos/travelers-choice-2026.svg"
              alt="Tripadvisor Travellers' Choice 2026 award"
              width={80}
              height={80}
              className={classes.awardImg}
            />
            <span className={classes.awardText}>
              <strong>Travellers&rsquo; Choice 2026</strong>
              <span>#20 of 398 boat tours in Split</span>
            </span>
          </a>
        </div>

      </div>
    </section>
  );
}
