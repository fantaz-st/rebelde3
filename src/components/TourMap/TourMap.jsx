"use client";

import { ORIGIN, getRoute } from "@/settings/routes";
import classes from "./TourMap.module.css";

/**
 * A minimal route map, drawn as inline SVG.
 *
 * Inline rather than a .png/.svg file so it inherits brand colour from CSS
 * instead of being baked
 * into an export. It still costs nothing at runtime — no map library, no
 * tiles, no API key, no network request.
 *
 * Geometry: real lat/lng from settings/routes.js, equirectangular
 * projection with a cos(lat) correction on x so east–west distances aren't
 * stretched. At this latitude that's about a 27% squeeze, and without it
 * the Adriatic looks noticeably wider than it is.
 */

const W = 1000;
const H = 620;
const PAD = { top: 56, right: 96, bottom: 60, left: 96 };

/** Equirectangular with longitude corrected for latitude. */
function project(points) {
  const meanLat = points.reduce((a, p) => a + p.lat, 0) / points.length;
  const k = Math.cos((meanLat * Math.PI) / 180);

  const raw = points.map((p) => ({ ...p, px: p.lng * k, py: -p.lat }));

  const xs = raw.map((p) => p.px);
  const ys = raw.map((p) => p.py);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const availW = W - PAD.left - PAD.right;
  const availH = H - PAD.top - PAD.bottom;

  // One scale for both axes, or the coastline geometry shears.
  const scale = Math.min(
    availW / (maxX - minX || 1),
    availH / (maxY - minY || 1),
  );

  const offX = PAD.left + (availW - (maxX - minX) * scale) / 2;
  const offY = PAD.top + (availH - (maxY - minY) * scale) / 2;

  return raw.map((p) => ({
    ...p,
    x: offX + (p.px - minX) * scale,
    y: offY + (p.py - minY) * scale,
  }));
}

/**
 * Straight legs between stops.
 *
 * This started as a Catmull-Rom spline and it was wrong twice over: on a
 * route with a long leg followed by a sharp turn — Split out to the Blue
 * Lagoon, then back north to Trogir — the curve overshot so far it read as
 * a tangled ribbon, and the arrowheads (placed at straight-line midpoints)
 * ended up floating off the curve entirely.
 *
 * Straight legs fix both, and they're the honest shape: a course is plotted
 * point to point, not swooped. Where legs cross, they genuinely cross.
 */
function routePath(pts) {
  if (pts.length < 2) return "";
  return pts
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");
}

/** One arrowhead per leg, at the midpoint, pointing along the leg. */
function arrows(pts) {
  const out = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
    if (Math.hypot(b.x - a.x, b.y - a.y) < 70) continue; // too short to read
    out.push({ x: mx, y: my, angle, key: `${i}` });
  }
  return out;
}

export default function TourMap({ tour }) {
  const route = getRoute(tour.key);
  if (!route) return null;

  // Stop names live on the route itself. A route whose stops are unnamed
  // renders nothing rather than a map with blank labels.
  const labels = route.stops.map((s) => s.name);
  if (labels.some((l) => !l)) return null;

  const originLabel = "Split";

  // Out from Split, round the stops, back to Split.
  const points = project([ORIGIN, ...route.stops, ORIGIN]);
  const path = routePath(points);
  const heads = arrows(points);

  // The two ORIGIN entries land on the same pixel; draw it once.
  const origin = points[0];
  const stops = points.slice(1, -1);

  return (
    <figure className={classes.wrap}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={classes.svg}
        role="img"
        aria-label={[originLabel, ...labels, originLabel].join(" → ")}
      >
        <defs>
          <marker id="rbd-arrow" viewBox="0 0 10 10" refX="5" refY="5"
                  markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" className={classes.arrowFill} />
          </marker>
        </defs>

        {/* Course line. Dashed because it's a route, not a road. */}
        <path d={path} className={classes.route} />

        {heads.map((a) => (
          <path
            key={a.key}
            d="M -6 -5 L 6 0 L -6 5 Z"
            className={classes.arrow}
            transform={`translate(${a.x.toFixed(1)} ${a.y.toFixed(1)}) rotate(${a.angle.toFixed(1)})`}
          />
        ))}

        {/* Halos first, as a group: drawn per-stop, a later stop's cream
            halo paints over a nearer neighbour's dot. Stiniva and Budikovac
            are about 1.5 km apart and one was erasing the other. */}
        {stops.map((p, i) => (
          <circle key={`h${i}`} cx={p.x} cy={p.y} r="16" className={classes.stopHalo} />
        ))}
        {stops.map((p, i) => (
          <circle key={`d${i}`} cx={p.x} cy={p.y} r="7" className={classes.stopDot} />
        ))}

        {stops.map((p, i) => (
          <g key={i} className={classes.stop}>
            <text
              x={p.x + (p.dx || 0)}
              y={p.y + (p.dy || 0)}
              textAnchor={p.anchor || "middle"}
              className={classes.stopLabel}
              dominantBaseline="middle"
            >
              {labels[i]}
            </text>
          </g>
        ))}

        {/* Home port, marked differently — it's the only one you return to. */}
        <g>
          <circle cx={origin.x} cy={origin.y} r="11" className={classes.originRing} />
          <circle cx={origin.x} cy={origin.y} r="5" className={classes.originDot} />
          <text
            x={origin.x + ORIGIN.dx}
            y={origin.y + ORIGIN.dy}
            textAnchor={ORIGIN.anchor}
            className={classes.originLabel}
            dominantBaseline="middle"
          >
            {originLabel}
          </text>
        </g>
      </svg>

      <figcaption className={classes.note}>{"Indicative route — the exact order of stops changes with the wind and the day."}</figcaption>
    </figure>
  );
}
