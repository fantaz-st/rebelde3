import Image from "next/image";
import classes from "./SectionContentGrid.module.css";

/**
 * Reusable two-column image+text grid.
 *
 * Left column accepts either:
 *   - intro (string)   → renders a single <p>
 *   - children         → renders whatever you pass (title, paragraphs, etc.)
 *
 * Props:
 *   intro       string | null
 *   children    ReactNode | null   — overrides intro if provided
 *   subText     string | null      — bottom-right paragraph (optional)
 *   imgLarge    string             — large image src (right, spans rows 1–2)
 *   imgSmall    string             — small image src (left, row 2)
 *   imgLargeAlt string
 *   imgSmallAlt string
 *   paddingTop  string             — CSS value, default "8rem"
 *   priority    boolean
 */
export default function SectionContentGrid({
  intro       = null,
  children    = null,
  subText     = null,
  imgLarge,
  imgSmall,
  imgLargeAlt = "",
  imgSmallAlt = "",
  paddingTop  = "8rem",
  priority    = false,
}) {
  return (
    <div
      className={`container grid ${classes.grid}`}
      style={{ "--grid-pt": paddingTop }}
    >
      {/* Left col row 1: text */}
      <div className={classes.left}>
        {children ?? <p className={classes.intro}>{intro}</p>}
      </div>

      {/* Right: large image — cols 9–15, rows 1–2 */}
      <div className={classes.imgLarge} data-parallax-block>
        <div className={classes.imgLargeInner} data-parallax-inner>
          <Image
            src={imgLarge}
            alt={imgLargeAlt}
            fill
            priority={priority}
            sizes="(max-width: 767px) 50vw, (max-width: 991px) 50vw, 40vw"
            className={classes.img}
          />
        </div>
      </div>

      {/* Left col row 2: small image */}
      <div className={classes.imgSmall} data-parallax-block>
        <div className={classes.imgSmallInner} data-parallax-inner>
          <Image
            src={imgSmall}
            alt={imgSmallAlt}
            fill
            sizes="(max-width: 767px) 65vw, (max-width: 991px) 40vw, 28vw"
            className={classes.img}
          />
        </div>
      </div>

      {/* Right col row 3: optional sub-text */}
      {subText && (
        <div className={classes.subText}>
          <p className={classes.subTextP}>{subText}</p>
        </div>
      )}
    </div>
  );
}
