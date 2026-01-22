"use client";

import classes from "./GridVisualizer.module.css";

export default function GridVisualizer() {
  return (
    <section className={classes.wrap}>
      <div className="container">
        <h2 className={classes.title}>Grid visualizer</h2>
        <p className={classes.note}>Resize: desktop = 16 cols, tablet = 8, mobile = 4. The dashed overlay shows each column.</p>
      </div>

      <div className={`container ${classes.block}`}>
        <div className={`grid ${classes.gridDebug}`}>
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className={classes.cell} />
          ))}
        </div>
      </div>

      <div className={`container ${classes.block}`}>
        <div className={`grid ${classes.gridSpans}`}>
          <div className={`${classes.spanBox} ${classes.s1}`}>
            <strong>grid-column: 1 / -1</strong>
            <span>Full width inside grid</span>
          </div>
          <div className={`${classes.spanBox} ${classes.s2}`}>
            <strong>grid-column: 1 / 9</strong>
            <span>Left half-ish</span>
          </div>
          <div className={`${classes.spanBox} ${classes.s3}`}>
            <strong>grid-column: 9 / -1</strong>
            <span>Right half-ish</span>
          </div>
          <div className={`${classes.spanBox} ${classes.s4}`}>
            <strong>grid-column: 4 / 14</strong>
            <span>Centered block</span>
          </div>
          <div className={`${classes.spanBox} ${classes.s5}`}>
            <strong>grid-column: 6 / -4</strong>
            <span>Inset block</span>
          </div>
        </div>
      </div>

      <section className={`full-width ${classes.fullStrip}`}>
        <div className="container">
          <div className={classes.fullText}>
            This is <code>.full-width</code> (100vw centered). Content stays inside <code>.container</code>.
          </div>
        </div>
      </section>
    </section>
  );
}
