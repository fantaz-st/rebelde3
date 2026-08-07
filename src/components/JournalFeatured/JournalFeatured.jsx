import { Link } from "@/i18n/navigation";
import Image from "next/image";
import classes from "./JournalFeatured.module.css";

export default function JournalFeatured({ post, readMoreLabel = "Read the story" }) {
  if (!post) return null;

  const href = `/journal/${post.slug}`;

  return (
    <section className={classes.wrap} aria-label="Featured story">
      <div className={classes.item}>
        {/*
          Thumb + content are both in the same grid cell (grid-area: 1 / 1 / 2 / 2),
          overlapping. Thumb sits underneath with a brightness filter; content
          floats on top with white text. Same technique as Kudanil.
        */}
        <Link href={href} className={classes.thumb} aria-hidden="true" tabIndex={-1}>
          <div className={classes.thumbInner} data-thumb-inner>
            {post.hero?.src ? (
              <Image
                src={post.hero.src}
                alt={post.hero.alt ?? ""}
                fill
                sizes="100vw"
                priority
                quality={85}
                className={classes.img}
              />
            ) : null}
          </div>
        </Link>

        <div className={classes.content}>
          <div className={`container ${classes.contentContainer}`}>
            <Link href={href} className={classes.contentInner}>
              <h2 className={classes.title}>{post.title}</h2>
              {post.description && <p className={classes.desc}>{post.description}</p>}
              <span className={classes.btn}>
                <span className={classes.btnLabel}>{readMoreLabel}</span>
                <span className={classes.btnArrow} aria-hidden="true">→</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
