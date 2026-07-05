import Image from "next/image";
import classes from "./SectionContentGrid.module.css";

/**
 * Two-column image+text grid used by Team section.
 *
 * Layout (default, flip=false):
 *   Row 1: [text left]        [large image right, spans rows 1-2]
 *   Row 2: [small image left] [                                  ]
 *   Row 3:                    [subContent right]
 *
 * Layout (flip=true):
 *   Row 1: [large image left, spans rows 1-2] [text right       ]
 *   Row 2: [                                ] [small image right ]
 *   Row 3: [subContent left]
 */
export default function SectionContentGrid({
  children    = null,
  subContent  = null,
  imgLarge,
  imgSmall,
  imgLargeAlt = "",
  imgSmallAlt = "",
  paddingTop  = "8rem",
  priority    = false,
  flip        = false,
}) {
  return (
    <div
      className={`container grid ${classes.grid} ${flip ? classes.flip : ""}`}
      style={{ "--grid-pt": paddingTop }}
    >
      <div className={classes.textPrimary}>
        {children}
      </div>

      <div className={classes.imgLarge} data-parallax-block>
        <div className={classes.imgLargeInner} data-parallax-inner>
          <Image
            src={imgLarge}
            alt={imgLargeAlt}
            fill
            priority={priority}
            sizes="(max-width: 767px) 92vw, (max-width: 991px) 50vw, 40vw"
            className={classes.img}
          />
        </div>
      </div>

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

      {subContent && (
        <div className={classes.textSecondary}>
          {subContent}
        </div>
      )}
    </div>
  );
}
