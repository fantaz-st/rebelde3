import { Link } from "@/i18n/navigation";
import Image from "next/image";
import classes from "./JournalGrid.module.css";

/**
 * Journal grid — mirrors Kudanil's .journal-main-other exactly.
 *
 * Kudanil's structure has the grid nested inside a 16-column parent, with
 * the grid itself constrained to cols 4/-4 (a 10-of-16 middle inset). That
 * inset is what keeps cards small and gives the section its editorial feel.
 * Without it, cards fill the whole viewport width and look bloated.
 */
export default function JournalGrid({ posts }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className={classes.wrap} aria-label="More stories">
      <div className={`container grid ${classes.container}`}>
        <ul className={classes.list}>
          {posts.map((post) => (
            <li key={post.slug} className={classes.item}>
              <Link href={`/journal/${post.slug}`} className={classes.link}>
                <div className={classes.img}>
                  <div className={classes.imgInner}>
                    {post.hero?.src ? (
                      <Image
                        src={post.hero.src}
                        alt={post.hero.alt ?? ""}
                        fill
                        sizes="(max-width: 767px) 100vw, (max-width: 991px) 45vw, 30vw"
                        quality={80}
                        className={classes.imgEl}
                      />
                    ) : null}
                  </div>
                </div>
                <div className={classes.content}>
                  <h3 className={classes.title}>{post.title}</h3>
                  {post.description && (
                    <p className={classes.desc}>{post.description}</p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
