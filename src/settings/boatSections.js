/**
 * The Boat page — section imagery, copy and technical specs.
 *
 * `gallery` entries are { src, caption } objects; they used to be bare paths
 * with captions matched by index from a separate message array.
 */

const boatSections = [
  {
    "key": "the-boat",
    "heroImg": "/images/boat/felix 37 drone shot 1.jpeg",
    "imgLarge": "/images/boat/felix 37 Rebelde boats.jpg",
    "imgSmall": "/images/boat/boat1.jpg",
    "ctaImg": "/images/boat/felix 37 Rebelde boats contact section.jpg",
    "gallery": [
      {
        "src": "/images/boat/felix 37 drone shot 3.jpg",
        "caption": "Buenaventura at rest in a quiet Adriatic bay"
      },
      {
        "src": "/images/boat/boat1.jpg",
        "caption": "Cutting across open water between the islands"
      },
      {
        "src": "/images/boat/felix 37 drone shot 1.jpg",
        "caption": "Aerial view of the Felix 37's clean lines"
      },
      {
        "src": "/images/boat/felix 37 buoy1.jpg",
        "caption": "Buenaventura moored in the shallows"
      }
    ],
    "label": "The Boat",
    "intro": "The Felix 37 Buenaventura is a custom-built speedboat designed for the Croatian coast — quick across open water, stable in a swell, and genuinely comfortable for a full day aboard.",
    "subText": "At 37 feet with a large 500HP engine, she carries up to 12 guests with room to spread out — no cramped benches, no fighting for shade.",
    "ctaText": "Whether you're crossing to Vis for the Blue Cave or drifting between the Pakleni islands, the ride is smooth, dry, and fast. Less time in transit means more time swimming, exploring, and lingering over lunch."
  },
  {
    "key": "comfort-deck",
    "heroImg": "/images/boat/boat5.jpg",
    "imgLarge": "/images/boat/boat4.jpg",
    "imgSmall": "/images/boat/boat2.jpg",
    "ctaImg": "/images/boat/boat7.jpg",
    "gallery": [
      {
        "src": "/images/boat/boat2.jpg",
        "caption": "The shaded helm and cockpit seating"
      },
      {
        "src": "/images/boat/boat3.jpg",
        "caption": "Teak deck and cushioned sun pads"
      },
      {
        "src": "/images/boat/boat4.jpg",
        "caption": "Generous space for every guest"
      },
      {
        "src": "/images/boat/boat5.jpg",
        "caption": "Sunbathing on the bow deck"
      },
      {
        "src": "/images/boat/boat6.jpg",
        "caption": "Afternoon light on the open water"
      },
      {
        "src": "/images/boat/boat7.jpg",
        "caption": "Sunset from the stern"
      }
    ],
    "label": "Comfort & Deck",
    "intro": "An extra-large sundeck, shaded cabin, and generous seating make Buenaventura as comfortable at anchor as she is underway.",
    "subText": "Stretch out on the sun pads, take cover under the hardtop when you want a break from the sun, or settle into the cockpit seating with a cold drink from the onboard fridge.",
    "ctaText": "Teak detailing, deep cushioned seating, and a layout that flows from helm to bow — the deck is built for long, slow lunches, spontaneous dives, and watching the coastline drift by."
  }
];

export default boatSections;

export const boatSpecs = [
  {
    "key": "name",
    "value": "Buenaventura",
    "label": "Name"
  },
  {
    "key": "model",
    "value": "Felix 37",
    "label": "Model"
  },
  {
    "key": "type",
    "value": "Motor Speedboat",
    "label": "Type"
  },
  {
    "key": "overallLength",
    "value": "12m",
    "label": "Overall Length"
  },
  {
    "key": "overallWidth",
    "value": "3.85m",
    "label": "Overall Width"
  },
  {
    "key": "chassis",
    "value": "Aluminium",
    "label": "Chassis"
  },
  {
    "key": "engine",
    "value": "Cummins QSB7 for Marine",
    "label": "Engine"
  },
  {
    "key": "horsepower",
    "value": "500 HP",
    "label": "Horsepower"
  },
  {
    "key": "fuelType",
    "value": "Diesel",
    "label": "Fuel Type"
  },
  {
    "key": "fuelTankSize",
    "value": "2×400l",
    "label": "Fuel Tank Size"
  },
  {
    "key": "cruisingSpeed",
    "value": "25 knots",
    "label": "Cruising Speed"
  },
  {
    "key": "maxSpeed",
    "value": "30 knots",
    "label": "Max Speed"
  }
];
