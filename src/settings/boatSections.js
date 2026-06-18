export const boatHero = {
  title: "The Boat",
  hero: "/images/boat/felix 37 drone shot 4.jpeg",  desc: "Meet Buenaventura — our Felix 37, custom-built for the Adriatic. Fast enough to reach the outer islands in comfort, spacious enough to make the journey the best part of the day.",
  sub: "From the shaded helm to the extra-large sundeck, every detail is built around one idea: that a day on the water should feel effortless from the first dock line to the last sunset.",
};

const boatSections = [
  {
    key: "the-boat",
    label: "The Boat",
    heroImg: "/images/boat/felix 37 drone shot 1.jpeg",
    intro:
      "The Felix 37 Buenaventura is a custom-built speedboat designed for the Croatian coast — quick across open water, stable in a swell, and genuinely comfortable for a full day aboard.",
    imgLarge: "/images/boat/felix 37 Rebelde boats.jpg",    imgSmall: "/images/boat/boat1.jpg",
    subText:
      "At 37 feet with a large 500HP engine, she carries up to 12 guests with room to spread out — no cramped benches, no fighting for shade.",
    ctaImg: "/images/boat/felix 37 Rebelde boats contact section.jpg",    ctaText:
      "Whether you're crossing to Vis for the Blue Cave or drifting between the Pakleni islands, the ride is smooth, dry, and fast. Less time in transit means more time swimming, exploring, and lingering over lunch.",
    gallery: [
      { src: "/images/boat/felix 37 drone shot 3.jpg", caption: "Buenaventura at rest in a quiet Adriatic bay" },
      { src: "/images/boat/boat1.jpg",                 caption: "Cutting across open water between the islands" },
      { src: "/images/boat/felix 37 drone shot 1.jpg", caption: "Aerial view of the Felix 37's clean lines" },
      { src: "/images/boat/felix 37 buoy1.jpg",        caption: "Buenaventura moored in the shallows" },
    ],
  },
  {
    key: "comfort-deck",
    label: "Comfort & Deck",
    heroImg: "/images/boat/boat5.jpg",
    intro:
      "An extra-large sundeck, shaded cabin, and generous seating make Buenaventura as comfortable at anchor as she is underway.",
    imgLarge: "/images/boat/boat4.jpg",
    imgSmall: "/images/boat/boat2.jpg",
    subText:
      "Stretch out on the sun pads, take cover under the hardtop when you want a break from the sun, or settle into the cockpit seating with a cold drink from the onboard fridge.",
    ctaImg:  "/images/boat/boat7.jpg",
    ctaText:
      "Teak detailing, deep cushioned seating, and a layout that flows from helm to bow — the deck is built for long, slow lunches, spontaneous dives, and watching the coastline drift by.",
    gallery: [
      { src: "/images/boat/boat2.jpg", caption: "The shaded helm and cockpit seating" },
      { src: "/images/boat/boat3.jpg", caption: "Teak deck and cushioned sun pads" },
      { src: "/images/boat/boat4.jpg", caption: "Generous space for every guest" },
      { src: "/images/boat/boat5.jpg", caption: "Sunbathing on the bow deck" },
      { src: "/images/boat/boat6.jpg", caption: "Afternoon light on the open water" },
      { src: "/images/boat/boat7.jpg", caption: "Sunset from the stern" },
    ],
  },
];

export const boatSpecs = [
  { label: "Name",           value: "Buenaventura" },
  { label: "Model",          value: "Felix 37" },
  { label: "Type",           value: "Motor Speedboat" },
  { label: "Overall Length", value: "12m" },
  { label: "Overall Width",  value: "3.85m" },
  { label: "Chassis",        value: "Aluminium" },
  { label: "Engine",         value: "Cummins QSB7 for Marine" },
  { label: "Horsepower",     value: "500 HP" },
  { label: "Fuel Type",      value: "Diesel" },
  { label: "Fuel Tank Size", value: "2×400l" },
  { label: "Cruising Speed", value: "25 knots" },
  { label: "Max Speed",      value: "30 knots" },
];

export default boatSections;
