import Link from "next/link";
import Image from "next/image";
import classes from "./JournalPostNav.module.css";

/**
 * Prev / next post navigation — mirrors Kudanil's .journal-content-nav.
 *
 * Two columns separated by a 1px vertical rule:
 *   Prev (right-aligned, label on top, then thumbnail, then title)
 *   Next (left-aligned, same stack)
 *
 * If prev or next is missing (start/end of the list), the empty column
 * still holds its space so the divider stays centered.
 */
export default function JournalPostNav({ prev, next }) {
  if (!prev && !next) return null;

  return (
    <nav className={classes.wrap} aria-label="More stories">
      {/* ── Prev ─────────────────────────────────── */}
      <div className={`${classes.item} ${classes.prev}`}>
        {prev ? (
          <>
            <div className={classes.label}>Previous</div>
            <Link
              href={`/journal/${prev.slug}`}
              className={classes.thumb}
              aria-label={`Previous story: ${prev.title}`}
            >
              {prev.hero?.src ? (
                <Image
                  src={prev.hero.src}
                  alt={prev.hero.alt ?? ""}
                  fill
                  sizes="15rem"
                  quality={75}
                  className={classes.thumbImg}
                />
              ) : null}
            </Link>
            <Link href={`/journal/${prev.slug}`} className={classes.title}>
              <h4>{prev.title}</h4>
            </Link>
          </>
        ) : (
          <div className={classes.empty} aria-hidden="true" />
        )}
      </div>

      {/* ── Divider ───────────────────────────────── */}
      <div className={classes.line} aria-hidden="true" />

      {/* ── Next ─────────────────────────────────── */}
      <div className={`${classes.item} ${classes.next}`}>
        {next ? (
          <>
            <div className={classes.label}>Next</div>
            <Link
              href={`/journal/${next.slug}`}
              className={classes.thumb}
              aria-label={`Next story: ${next.title}`}
            >
              {next.hero?.src ? (
                <Image
                  src={next.hero.src}
                  alt={next.hero.alt ?? ""}
                  fill
                  sizes="15rem"
                  quality={75}
                  className={classes.thumbImg}
                />
              ) : null}
            </Link>
            <Link href={`/journal/${next.slug}`} className={classes.title}>
              <h4>{next.title}</h4>
            </Link>
          </>
        ) : (
          <div className={classes.empty} aria-hidden="true" />
        )}
      </div>
    </nav>
  );
}
