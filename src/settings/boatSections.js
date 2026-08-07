/**
 * The Boat page — section imagery and technical spec values.
 *
 * Copy lives under `boatSectionItems.<key>`; spec labels under `specs.<key>`.
 *
 * STRUCTURE ONLY — no user-facing copy lives here.
 * Every string a visitor reads is in src/messages/<locale>.json.
 */

const boatSections = [
  {
    "key": "the-boat",
    "heroImg": "/images/boat/felix 37 drone shot 1.jpeg",
    "imgLarge": "/images/boat/felix 37 Rebelde boats.jpg",
    "imgSmall": "/images/boat/boat1.jpg",
    "ctaImg": "/images/boat/felix 37 Rebelde boats contact section.jpg",
    "gallery": [
      "/images/boat/felix 37 drone shot 3.jpg",
      "/images/boat/boat1.jpg",
      "/images/boat/felix 37 drone shot 1.jpg",
      "/images/boat/felix 37 buoy1.jpg"
    ]
  },
  {
    "key": "comfort-deck",
    "heroImg": "/images/boat/boat5.jpg",
    "imgLarge": "/images/boat/boat4.jpg",
    "imgSmall": "/images/boat/boat2.jpg",
    "ctaImg": "/images/boat/boat7.jpg",
    "gallery": [
      "/images/boat/boat2.jpg",
      "/images/boat/boat3.jpg",
      "/images/boat/boat4.jpg",
      "/images/boat/boat5.jpg",
      "/images/boat/boat6.jpg",
      "/images/boat/boat7.jpg"
    ]
  }
];

export default boatSections;

export const boatSpecs = [
  {
    "key": "name",
    "value": "Buenaventura"
  },
  {
    "key": "model",
    "value": "Felix 37"
  },
  {
    "key": "type",
    "value": "Motor Speedboat"
  },
  {
    "key": "overallLength",
    "value": "12m"
  },
  {
    "key": "overallWidth",
    "value": "3.85m"
  },
  {
    "key": "chassis",
    "value": "Aluminium"
  },
  {
    "key": "engine",
    "value": "Cummins QSB7 for Marine"
  },
  {
    "key": "horsepower",
    "value": "500 HP"
  },
  {
    "key": "fuelType",
    "value": "Diesel"
  },
  {
    "key": "fuelTankSize",
    "value": "2×400l"
  },
  {
    "key": "cruisingSpeed",
    "value": "25 knots"
  },
  {
    "key": "maxSpeed",
    "value": "30 knots"
  }
];
