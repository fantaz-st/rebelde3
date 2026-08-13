/**
 * Route map geography.
 *
 * Plain latitude/longitude — the component projects and frames it, so a stop
 * is moved by pasting real coordinates, never by nudging pixels.
 *
 * `dx` / `dy` / `anchor` position each label relative to its dot. They exist
 * because the maths can't know that Hvar Town and Palmižana are four
 * kilometres apart and their labels would sit on top of each other.
 *
 * Stop NAMES are not here — they're translated, and live under
 * `tourItems.<slug>.mapStops` in the message files, in the same order as
 * `stops` below. The component refuses to render if the two lengths
 * disagree, which is the cheapest way to catch a half-finished edit.
 *
 * A tour with no entry here renders no map. That's deliberate for the
 * bespoke charter and the sunset hours: one has no fixed route, the other
 * is two hours in one direction, and a map of either would be a promise we
 * don't make.
 */

/** Home port. Every route leaves from here and comes back to it. */
export const ORIGIN = {
  lat: 43.508,
  lng: 16.44,
  dx: 0,
  dy: -30,
  anchor: "middle",
};

const ROUTES = {
  "blue-lagoon-three-islands": {
    stops: [
      { key: "blue-lagoon", lat: 43.452, lng: 16.15, dx: -22, dy: 0, anchor: "end" },
      { key: "maslinica", lat: 43.397, lng: 16.205, dx: 0, dy: 30, anchor: "middle" },
      { key: "trogir", lat: 43.517, lng: 16.251, dx: 0, dy: -30, anchor: "middle" },
    ],
  },
  "blue-cave-five-islands": {
    stops: [
      { key: "blue-cave", lat: 42.976, lng: 16.017, dx: 0, dy: 30, anchor: "middle" },
      { key: "stiniva", lat: 43.028, lng: 16.132, dx: 0, dy: -28, anchor: "middle" },
      { key: "budikovac", lat: 43.034, lng: 16.245, dx: 22, dy: 6, anchor: "start" },
      { key: "palmizana", lat: 43.161, lng: 16.398, dx: -22, dy: 18, anchor: "end" },
      { key: "hvar", lat: 43.172, lng: 16.442, dx: -22, dy: -12, anchor: "end" },
    ],
  },
  "hvar-pakleni-islands": {
    stops: [
      { key: "maslinica", lat: 43.397, lng: 16.205, dx: 0, dy: 30, anchor: "middle" },
      { key: "hvar", lat: 43.172, lng: 16.442, dx: -22, dy: -12, anchor: "end" },
      { key: "palmizana", lat: 43.161, lng: 16.398, dx: -22, dy: 18, anchor: "end" },
    ],
  },
  "bol-hvar-pakleni": {
    stops: [
      { key: "bol", lat: 43.262, lng: 16.653, dx: 22, dy: 0, anchor: "start" },
      { key: "hvar", lat: 43.172, lng: 16.442, dx: -22, dy: -12, anchor: "end" },
      { key: "palmizana", lat: 43.161, lng: 16.398, dx: -22, dy: 18, anchor: "end" },
    ],
  },
};

export const getRoute = (slug) => ROUTES[slug] || null;
