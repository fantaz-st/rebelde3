/**
 * Home page team section — layout + imagery.
 *
 * Copy and alt text live under the `team.<key>` namespace in messages.
 *
 * STRUCTURE ONLY — no user-facing copy lives here.
 * Every string a visitor reads is in src/messages/<locale>.json.
 */

const team = [
  {
    "key": "t1",
    "layout": "double",
    "img": "/images/team/image-1.jpg",
    "img2": "/images/team/team-1.jpg"
  },
  {
    "key": "t2",
    "layout": "left",
    "img": "/images/team/image-3.jpg"
  },
  {
    "key": "t3",
    "layout": "right",
    "img": "/images/team/image-4.jpeg"
  }
];

export default team;

export const thumb = {
  "img": "/images/team/team-main.webp",
  "imgMobile": "/images/team/team-main-portrait.webp",
  "alt": "Rebelde Boats crew and guests on deck during a private Adriatic charter from Split"
};
