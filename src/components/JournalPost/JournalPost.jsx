import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import classes from "./JournalPost.module.css";
import JournalPostNav from "@/components/JournalPostNav/JournalPostNav";

/**
 * MDX component overrides.
 *
 * Markdown images (`![alt](/path.jpg)`) render as bare <img> inside a <p> by
 * default. We wrap each in a <figure> so `.body figure` styling applies, and
 * use the alt text as a caption when present.
 *
 * Note: markdown wraps images in <p>, so this produces `<p><figure>...</figure></p>`
 * which is invalid HTML nesting. Browsers auto-repair it and it renders fine,
 * but React logs a hydration warning in dev. To silence it cleanly, add
 * `remark-unwrap-images` to your MDX pipeline — a 2-line change in your MDX
 * config.
 *
 * We render via a plain <img> rather than next/image because we don't have
 * dimensions at author time.
 */
const mdxComponents = {
  img: ({ src, alt = "" }) => (
    <figure>
      <img src={src} alt={alt} loading="lazy" />
      {alt && <figcaption>{alt}</figcaption>}
    </figure>
  ),
};

/**
 * Journal post layout — mirrors Kudanil's .journal-content.
 *
 * Structure (all three grid children live in cols 5/-5 of the 16-col grid):
 *
 *   Row 1  Title
 *   Row 2  Body (optional hero image + rich text MDX)
 *   Row 3  Prev / next navigation
 *
 * The section has 32rem top / 18rem bottom padding, and a 18rem gap between
 * body and nav so the reading rhythm feels editorial.
 *
 * Rich-text styling lives in this file's `.body` selectors — direct child
 * selectors like `.body h2`, `.body figure`, etc. pick up the MDX output
 * without needing individual component overrides.
 */
export default function JournalPost({ post, prev, next }) {
  // If the frontmatter has `showHeroInArticle: false`, we skip rendering the
  // hero image inside the article body — the author is likely embedding their
  // own images in MDX. Defaults to true.
  const showHero =
    post.hero?.src && post.showHeroInArticle !== false;

  return (
    <article className={classes.wrap}>
      <div className={`container grid ${classes.container}`}>

        {/* ── Row 1: Title ───────────────────────── */}
        <div className={classes.titleWrap}>
          <p className={classes.meta}>
            <span>{post.readingTime} min read</span>
          </p>
          <h1 className={classes.title}>{post.title}</h1>
          {post.description && (
            <p className={classes.lede}>{post.description}</p>
          )}
        </div>

        {/* ── Row 2: Body ────────────────────────── */}
        <div className={classes.bodyWrap}>
          {showHero && (
            <figure className={classes.heroFigure}>
              <div className={classes.heroFigureInner}>
                <Image
                  src={post.hero.src}
                  alt={post.hero.alt ?? ""}
                  fill
                  sizes="(max-width: 991px) 100vw, 60vw"
                  quality={85}
                  priority
                  className={classes.heroImg}
                />
              </div>
            </figure>
          )}

          <div className={classes.body}>
            <MDXRemote source={post.body} components={mdxComponents} />
          </div>
        </div>

        {/* ── Row 3: Nav ─────────────────────────── */}
        <div className={classes.navWrap}>
          <JournalPostNav prev={prev} next={next} />
        </div>

      </div>
    </article>
  );
}
