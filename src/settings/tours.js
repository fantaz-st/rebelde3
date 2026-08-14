/**
 * Tours — canonical structure and copy for /tours, /tours/[slug] and the
 * bespoke page.
 *
 * `gallery` entries are { src, caption } objects; captions used to live in a
 * parallel array in messages and be matched by index.
 */

const tours = [
  {
    "key": "blue-lagoon-three-islands",
    "depositEur": 30000,
    "restEur": 60000,
    "minPrice": 800,
    "maxPrice": 1100,
    "durationHours": 6,
    "touristType": [
      "Family",
      "Couple",
      "Group"
    ],
    "thumb": "/images/tours/cards/blue-lagoon.webp",
    "thumbAlt": "Crystal-clear turquoise water of the Blue Lagoon near Split, Croatia",
    "hero": "/images/tours/lagoon/krknjasi-1.jpeg",
    "mainImg": "/images/tours/lagoon/large-thumb.jpg",
    "subImg": "/images/tours/lagoon/gallery/rebelde boats three islands tour 07.jpg",
    "ctaImg": "/images/tours/lagoon/cta-thumb.jpg",
    "gallery": [
      {
        "src": "/images/tours/lagoon/gallery/rebelde boats three islands tour 01.jpeg",
        "caption": "Twin pine-clad islets rising from glassy turquoise water"
      },
      {
        "src": "/images/tours/lagoon/gallery/rebelde boats three islands tour 02.jpeg",
        "caption": "Anchored in the Blue Lagoon — our favourite swim stop of the day"
      },
      {
        "src": "/images/tours/lagoon/gallery/rebelde boats three islands tour 03.jpg",
        "caption": "Drifting alongside hidden coves around the Drvenik archipelago"
      },
      {
        "src": "/images/tours/lagoon/gallery/rebelde boats three islands tour 04.jpg",
        "caption": "Sunlight dancing on the shallows — water clear enough to count every stone"
      },
      {
        "src": "/images/tours/lagoon/gallery/rebelde boats three islands tour 05.jpg",
        "caption": "Mooring up in Trogir's old harbour for a stroll through history"
      },
      {
        "src": "/images/tours/lagoon/gallery/rebelde boats three islands tour 06.jpg",
        "caption": "Terracotta rooftops and bell towers of the UNESCO-listed Trogir old town"
      },
      {
        "src": "/images/tours/lagoon/gallery/rebelde boats three islands tour 07.jpg",
        "caption": "Wandering the timeworn stone alleys of Dalmatia's coastal villages"
      },
      {
        "src": "/images/tours/lagoon/gallery/rebelde boats three islands tour 08.jpg",
        "caption": "Swim above the Šolta shipwreck — a century-old hull resting just below the surface"
      }
    ],
    "faqIds": [
      "lagoon-q1",
      "lagoon-q3",
      "lagoon-q6",
      "trogir-q1",
      "general-q5",
      "general-q1"
    ],
    "relatedTourKeys": [
      "blue-cave-five-islands",
      "hvar-pakleni-islands",
      "bol-hvar-pakleni"
    ],
    "label": "Blue Lagoon & Three Islands Escape",
    "kicker": "Half day, close and popular!",
    "pin": "Blue lagoon Krknjaši, Borkko beach bar Šolta and Trogir",
    "intro": "A relaxed Adriatic journey through crystal-clear lagoons, secluded bays, and charming island villages just beyond the Split coastline.",
    "ctaText": "Spend the day discovering the quieter side of Dalmatia as we cruise between hidden swimming spots, turquoise waters, and authentic island towns untouched by the rush of larger tourist routes. Dive into the Blue Lagoon's crystal-clear sea, wander peaceful stone villages, enjoy seaside restaurants at your own pace, and experience the freedom of a private day on the Adriatic designed entirely around you.",
    "durationLabel": "Half day · 5–6 hours",
    "capacityLabel": "Up to 12 guests",
    "priceLabel": "From €800",
    "overview": [
      "The Blue Lagoon & Three Islands Escape is our most popular half-day trip — a relaxed Adriatic circuit through the archipelago just west of Split. It's the tour we recommend to guests who want a proper day at sea without a long drive out and back, and who value the quieter parts of Dalmatia over the busier ones.",
      "You'll swim in the famous Krknjaši lagoon, wander the stone streets of UNESCO-listed Trogir, and stop at a hidden Šolta bay for lunch or a longer swim. The pace is unhurried, the crowds are minimal, and the water rarely disappoints."
    ],
    "keyFacts": [
      {
        "label": "Duration",
        "value": "5–6 hours"
      },
      {
        "label": "Departure",
        "value": "Pickup point agreed at booking"
      },
      {
        "label": "Group size",
        "value": "Up to 12 guests"
      },
      {
        "label": "Price",
        "value": "From €800 (deposit €300, remainder on the day)"
      }
    ],
    "itinerary": [
      {
        "title": "Blue Lagoon, Drvenik Mali",
        "description": "Our first swim stop — protected turquoise water between two pine-covered islets. Great snorkelling, warm shallows, and one of the calmest anchorages in the area."
      },
      {
        "title": "Trogir old town",
        "description": "A short mooring in Trogir's UNESCO-listed harbour. Time for a wander through 13th-century streets, a coffee on the waterfront, or a bakery run — your call."
      },
      {
        "title": "Šolta bay",
        "description": "Afternoon swim on the quieter side of Šolta. Optional stop at Borkko beach bar for a drink or lunch overlooking the sea."
      },
      {
        "title": "Šolta shipwreck",
        "description": "On the way back, we anchor above a century-old wreck resting in the shallows — perfect for snorkellers curious about what's below."
      }
    ],
    "included": [
      "Private charter of Buenaventura (Felix 37 speedboat)",
      "Fuel and harbour fees",
      "Licensed skipper",
      "Fresh towels and cooler with water and soft drinks",
      "Snorkelling equipment",
      "Bluetooth sound system",
      "VAT"
    ],
    "notIncluded": [
      "Lunch (we can book a restaurant on Šolta or Trogir ahead)",
      "Alcoholic drinks (bring your own or we can source before departure)",
      "Gratuities (optional)"
    ],
    "whoItsFor": {
      "paragraph": "A great choice for first-time visitors, families with younger children, or anyone who wants a proper day at sea without committing to a full day. If you'd prefer more adventure and a longer route, our Blue Cave & Five Islands Expedition covers three times the distance.",
      "tags": [
        "Families",
        "First-timers",
        "Half-day escape"
      ],
      "compareLink": {
        "slug": "blue-cave-five-islands",
        "label": "Blue Cave & Five Islands"
      }
    },
    "logistics": [
      {
        "title": "Meeting point",
        "body": "We agree the pickup point when you book — Split promenade, Zenta marina, or your hotel if it's on the coast."
      },
      {
        "title": "Weather policy",
        "body": "If the forecast is unsafe (strong wind, poor sea state), we'll offer a reschedule or full refund. Decision made the evening before departure."
      },
      {
        "title": "What to bring",
        "body": "Swimsuit, towel, sun cream, sunglasses, a light layer for the ride home. Everything else is on the boat."
      }
    ]
  },
  {
    "key": "blue-cave-five-islands",
    "depositEur": 40000,
    "restEur": 110000,
    "minPrice": 1500,
    "maxPrice": 1750,
    "durationHours": 10,
    "touristType": [
      "Adventurer",
      "Couple",
      "Family",
      "Group"
    ],
    "thumb": "/images/tours/cards/blue-cave.webp",
    "thumbAlt": "Electric blue light inside the famous Blue Cave on Biševo island near Vis, Croatia",
    "hero": "/images/tours/blue-cave/hero.jpg",
    "mainImg": "/images/tours/blue-cave/large-thumb.jpg",
    "subImg": "/images/tours/blue-cave/small-thumb.jpg",
    "ctaImg": "/images/tours/blue-cave/cta-thumb.jpg",
    "gallery": [
      {
        "src": "/images/tours/blue-cave/gallery/rebelde boats five islands tour 01.jpeg",
        "caption": "Approaching the green shores of Biševo island"
      },
      {
        "src": "/images/tours/blue-cave/gallery/rebelde boats five islands tour 02.jpg",
        "caption": "Towering cliffs guarding the entrance to the famous sea cave"
      },
      {
        "src": "/images/tours/blue-cave/gallery/rebelde boats five islands tour 03.jpg",
        "caption": "Inside the Blue Cave — where sunlight turns the sea electric blue"
      },
      {
        "src": "/images/tours/blue-cave/gallery/rebelde boats five islands tour 04.jpg",
        "caption": "Gliding through the long stone tunnel of the submarine pen"
      },
      {
        "src": "/images/tours/blue-cave/gallery/rebelde boats five islands tour 05.jpg",
        "caption": "Squeezing through Pritiščina's dramatic rocky gateway on Vis"
      },
      {
        "src": "/images/tours/blue-cave/gallery/rebelde boats five islands tour 06.jpg",
        "caption": "Stiniva cove from above — a hidden beach walled by limestone cliffs"
      },
      {
        "src": "/images/tours/blue-cave/gallery/rebelde boats five islands tour 07.jpg",
        "caption": "Light pouring into a quiet cavern on the Adriatic coast"
      },
      {
        "src": "/images/tours/blue-cave/gallery/rebelde boats five islands tour 08.jpg",
        "caption": "Anchoring in the turquoise lagoon of Budikovac island"
      },
      {
        "src": "/images/tours/blue-cave/gallery/rebelde boats five islands tour 09.jpeg",
        "caption": "Floating weightless in some of the clearest water in the Mediterranean"
      },
      {
        "src": "/images/tours/blue-cave/gallery/rebelde boats five islands tour 10.jpg",
        "caption": "Sunlight dancing across glass-clear shallows"
      },
      {
        "src": "/images/tours/blue-cave/gallery/rebelde boats five islands tour 11.jpg",
        "caption": "Pulling into Komiža — the old fishing town of Vis"
      },
      {
        "src": "/images/tours/blue-cave/gallery/rebelde boats five islands tour 12.jpeg",
        "caption": "Hvar harbour and the Pakleni archipelago seen from above"
      },
      {
        "src": "/images/tours/blue-cave/gallery/rebelde boats five islands tour 13.jpg",
        "caption": "Palm fronds against the Dalmatian summer sky"
      },
      {
        "src": "/images/tours/blue-cave/gallery/rebelde boats five islands tour 14.jpg",
        "caption": "Wandering the timeworn stone alleys of Vis old town"
      },
      {
        "src": "/images/tours/blue-cave/gallery/rebelde boats five islands tour 15.jpg",
        "caption": "Strolling the palm-lined waterfront after a day on the water"
      },
      {
        "src": "/images/tours/blue-cave/gallery/rebelde boats five islands tour 16.jpg",
        "caption": "Sailing into Hvar with the \"Fortica\" Fortress watching from above"
      }
    ],
    "faqIds": [
      "bluecave-q1",
      "bluecave-q2",
      "bluecave-q5",
      "fiveislands-q1",
      "fiveislands-q2",
      "general-q5"
    ],
    "relatedTourKeys": [
      "hvar-pakleni-islands",
      "bol-hvar-pakleni",
      "blue-lagoon-three-islands"
    ],
    "label": "Blue Cave & Five Islands Expedition",
    "kicker": "Full day — 5 islands!",
    "pin": "Blue Cave Biševo, Stiniva cove Vis, Komiža Vis, Budikovac, Pakleni islands and Hvar town",
    "intro": "An unforgettable full-day Adriatic adventure combining dramatic coastal scenery, hidden caves, remote islands, and some of Croatia's clearest waters.",
    "ctaText": "Journey across the open Adriatic to discover the legendary Blue Cave, where sunlight transforms the sea into glowing shades of blue hidden beneath towering cliffs. Beyond the cave, the day unfolds through remote islands, secret swimming spots, charming fishing villages, and untouched bays accessible only by boat. Designed for guests who want to experience the Adriatic beyond the ordinary, this route combines exploration, relaxation, and breathtaking scenery in a single day.",
    "durationLabel": "Full day · 9–10 hours",
    "capacityLabel": "Up to 12 guests",
    "priceLabel": "From €1,500",
    "overview": [
      "The Blue Cave & Five Islands is the tour people write home about. It's a long day on the water — usually 9 to 10 hours — reaching some of the most remote and dramatic corners of the central Adriatic. You'll cross open sea, glide into a cave lit electric-blue from below, swim in coves you'd never find without a boat, and finish the afternoon in Hvar's harbour before turning back to Split.",
      "It's built for guests who want to see the extraordinary parts of Croatia and don't mind an early start to do it. Families, small groups, couples celebrating something — this tour is our most requested for a reason."
    ],
    "keyFacts": [
      {
        "label": "Duration",
        "value": "9–10 hours"
      },
      {
        "label": "Departure",
        "value": "Pickup point agreed at booking"
      },
      {
        "label": "Group size",
        "value": "Up to 12 guests"
      },
      {
        "label": "Price",
        "value": "From €1,500 (deposit €400, remainder on the day)"
      }
    ],
    "itinerary": [
      {
        "title": "Blue Cave, Biševo",
        "description": "Our first stop. Sunlight enters through an underwater opening around midday and the whole chamber glows electric blue. Small transfer boats take you inside — we time our arrival to skip the worst of the queues."
      },
      {
        "title": "Stiniva Cove, Vis",
        "description": "A hidden beach walled by 100-metre limestone cliffs. Voted one of Europe's most beautiful. You can only reach it by boat or a steep hike — we swim in."
      },
      {
        "title": "Budikovac Island",
        "description": "Turquoise lagoon anchorage, warm shallow water, no crowds. This is where most of our guests take their longest swim of the day."
      },
      {
        "title": "Vis or Komiža",
        "description": "Lunch break in an old fishing town — quiet, unmodernised, some of the best seafood on the Adriatic. Your call which one, or skip if you want to stay on the water."
      },
      {
        "title": "Pakleni Islands & Hvar",
        "description": "Late afternoon in the Pakleni archipelago — clear water, pine forests, and a look at Hvar town's harbour before we turn back toward Split."
      }
    ],
    "included": [
      "Private charter of Buenaventura (Felix 37 speedboat)",
      "Fuel, all park and Blue Cave entrance fees",
      "Licensed skipper",
      "Fresh towels, cooler with water and soft drinks",
      "Snorkelling equipment",
      "Bluetooth sound system",
      "VAT"
    ],
    "notIncluded": [
      "Lunch (arranged at a coastal restaurant of your choice — we'll book ahead)",
      "Alcoholic drinks (bring your own or we can source before departure)",
      "Gratuities (optional)"
    ],
    "whoItsFor": {
      "paragraph": "This is a full-day expedition covering serious distance — great for adventurers, couples with a sense of curiosity, and families with kids old enough for a long day at sea (roughly 8 and up). If you'd prefer a slower half-day with less open water, our Blue Lagoon & Three Islands tour is a gentler match.",
      "tags": [
        "Adventure",
        "Small groups",
        "Couples celebrating"
      ],
      "compareLink": {
        "slug": "blue-lagoon-three-islands",
        "label": "Blue Lagoon & Three Islands"
      }
    },
    "logistics": [
      {
        "title": "Meeting point",
        "body": "We agree the pickup point when you book — Split promenade, Zenta marina, or your hotel if it's on the coast."
      },
      {
        "title": "Weather policy",
        "body": "If the forecast is unsafe (strong wind, poor sea state, or Blue Cave closure), we'll offer a reschedule or full refund. Decision made the evening before departure."
      },
      {
        "title": "What to bring",
        "body": "Swimsuit, towel, sun cream, sunglasses, light layer for the ride home. Everything else is on the boat."
      }
    ]
  },
  {
    "key": "hvar-pakleni-islands",
    "depositEur": 40000,
    "restEur": 100000,
    "minPrice": 1400,
    "maxPrice": 1650,
    "durationHours": 9,
    "touristType": [
      "Couple",
      "Group"
    ],
    "thumb": "/images/tours/cards/pakleni-islands.webp",
    "thumbAlt": "Hvar town waterfront and the Pakleni Islands archipelago seen from a private boat",
    "hero": "/images/tours/hvar-pakleni/main-thumb.jpg",
    "mainImg": "/images/tours/hvar-pakleni/large-thumb.jpg",
    "subImg": "/images/tours/hvar-pakleni/small-thumb.jpg",
    "ctaImg": "/images/tours/hvar-pakleni/cta-thumb.jpg",
    "gallery": [
      {
        "src": "/images/tours/hvar-pakleni/gallery/rebelde boats hvar pakleni tour 01.jpg",
        "caption": "Arriving at Hvar town beneath the watchful Spanish Fortress"
      },
      {
        "src": "/images/tours/hvar-pakleni/gallery/rebelde boats hvar pakleni tour 02.jpeg",
        "caption": "Hvar's historic waterfront from the deck — a postcard come to life"
      },
      {
        "src": "/images/tours/hvar-pakleni/gallery/rebelde boats hvar pakleni tour 09.jpg",
        "caption": "Wandering Hvar's old town square in the warm afternoon light"
      },
      {
        "src": "/images/tours/hvar-pakleni/gallery/rebelde boats hvar pakleni tour 10.jpg",
        "caption": "A waterfront table with Hvar's rooftops as the view"
      },
      {
        "src": "/images/tours/hvar-pakleni/gallery/rebelde boats hvar pakleni tour 03.jpg",
        "caption": "A drink with a view at Hula Hula — the island's legendary sunset bar"
      },
      {
        "src": "/images/tours/hvar-pakleni/gallery/rebelde boats hvar pakleni tour 04.jpeg",
        "caption": "The dramatic limestone arch of Red Rocks rising from turquoise water"
      },
      {
        "src": "/images/tours/hvar-pakleni/gallery/rebelde boats hvar pakleni tour 05.jpg",
        "caption": "Sailing into Palmižana — the heart of the Pakleni archipelago"
      },
      {
        "src": "/images/tours/hvar-pakleni/gallery/rebelde boats hvar pakleni tour 06.jpg",
        "caption": "Pine-fringed coves and emerald shallows of the Pakleni islands"
      },
      {
        "src": "/images/tours/hvar-pakleni/gallery/rebelde boats hvar pakleni tour 07.jpg",
        "caption": "Anchoring among the boats in a sheltered Pakleni bay"
      },
      {
        "src": "/images/tours/hvar-pakleni/gallery/rebelde boats hvar pakleni tour 08.jpg",
        "caption": "The long, low-lying shape of St. Klement seen from above"
      }
    ],
    "faqIds": [
      "hvar-q1",
      "hvar-q2",
      "pakleni-q1",
      "pakleni-q2",
      "general-q5",
      "general-q1"
    ],
    "relatedTourKeys": [
      "bol-hvar-pakleni",
      "blue-cave-five-islands",
      "blue-lagoon-three-islands"
    ],
    "label": "Hvar & Pakleni Islands Experience",
    "kicker": "Most sought after!",
    "pin": "Island Hvar, Pakleni islands, island Šolta",
    "intro": "A timeless journey to Croatia's most iconic island, paired with the hidden coves and crystal lagoons of the Pakleni archipelago.",
    "ctaText": "Explore the vibrant atmosphere of Hvar Town before escaping into the tranquility of the Pakleni Islands, where pine-covered shores, secluded anchorages, and clear turquoise waters create the perfect Adriatic setting. Whether you prefer swimming in quiet bays, discovering beach bars tucked into hidden coves, or simply enjoying the coastline from the deck, this experience blends elegance, relaxation, and island adventure.",
    "durationLabel": "Full day · 8–10 hours",
    "capacityLabel": "Up to 12 guests",
    "priceLabel": "From €1,400",
    "overview": [
      "The Hvar & Pakleni Islands Experience is the tour we recommend to guests who want the buzz of a lively island town paired with the calm of a private cove. Hvar is Croatia's most famous island for a reason — the harbour, the fortress views, the waterfront dining — and the Pakleni archipelago sitting right offshore is where you escape it all after lunch.",
      "It's a full day but with a gentler pace than the Blue Cave route. Less open water, more time swimming, more time exploring on foot."
    ],
    "keyFacts": [
      {
        "label": "Duration",
        "value": "8–10 hours"
      },
      {
        "label": "Departure",
        "value": "Pickup point agreed at booking"
      },
      {
        "label": "Group size",
        "value": "Up to 12 guests"
      },
      {
        "label": "Price",
        "value": "From €1,400 (deposit €400, remainder on the day)"
      }
    ],
    "itinerary": [
      {
        "title": "Hvar town",
        "description": "Morning arrival at Hvar's harbour. Time for a coffee on the waterfront, a walk up to the Spanish Fortress, or a wander through the old town square."
      },
      {
        "title": "Pakleni Islands — Palmižana",
        "description": "The heart of the archipelago. Anchor in a sheltered bay for a long swim, or head ashore for lunch at one of the pine-shaded konobas."
      },
      {
        "title": "Red Rocks",
        "description": "A dramatic limestone arch rising from turquoise water — one of the most photographed spots in the Pakleni chain."
      },
      {
        "title": "Šolta on the way back",
        "description": "Late afternoon swim on Šolta's quieter side before turning back toward Split."
      }
    ],
    "included": [
      "Private charter of Buenaventura (Felix 37 speedboat)",
      "Fuel and harbour fees",
      "Licensed skipper",
      "Fresh towels and cooler with water and soft drinks",
      "Snorkelling equipment",
      "Bluetooth sound system",
      "VAT"
    ],
    "notIncluded": [
      "Lunch (we'll book a table on Hvar or Palmižana ahead)",
      "Alcoholic drinks (bring your own or we can source before departure)",
      "Gratuities (optional)"
    ],
    "whoItsFor": {
      "paragraph": "A great fit for couples, small groups celebrating, and anyone who wants a mix of island buzz and quiet coves in the same day. If you'd rather see Croatia's most remote corners than its most famous town, the Blue Cave & Five Islands covers different ground entirely.",
      "tags": [
        "Couples",
        "Small groups",
        "Iconic Croatia"
      ],
      "compareLink": {
        "slug": "blue-cave-five-islands",
        "label": "Blue Cave & Five Islands"
      }
    },
    "logistics": [
      {
        "title": "Meeting point",
        "body": "We agree the pickup point when you book — Split promenade, Zenta marina, or your hotel if it's on the coast."
      },
      {
        "title": "Weather policy",
        "body": "If the forecast is unsafe (strong wind, poor sea state), we'll offer a reschedule or full refund. Decision made the evening before departure."
      },
      {
        "title": "What to bring",
        "body": "Swimsuit, towel, sun cream, sunglasses, a light layer for the ride home. Everything else is on the boat."
      }
    ]
  },
  {
    "key": "bol-hvar-pakleni",
    "depositEur": 40000,
    "restEur": 100000,
    "minPrice": 1400,
    "maxPrice": 1650,
    "durationHours": 9,
    "touristType": [
      "Family",
      "Group"
    ],
    "thumb": "/images/tours/cards/golden-horn.webp",
    "thumbAlt": "Zlatni Rat golden horn beach on Brač island with turquoise Adriatic water",
    "hero": "/images/tours/bol-hvar-pakleni/main-thumb.jpg",
    "mainImg": "/images/tours/bol-hvar-pakleni/large-thumb.jpg",
    "subImg": "/images/tours/bol-hvar-pakleni/small-thumb.jpeg",
    "ctaImg": "/images/tours/bol-hvar-pakleni/cta-thumb.jpg",
    "gallery": [
      {
        "src": "/images/tours/bol-hvar-pakleni/gallery/rebelde boats bol hvar pakleni tour 01.jpg",
        "caption": "The iconic shape of Zlatni Rat stretching into the sea"
      },
      {
        "src": "/images/tours/bol-hvar-pakleni/gallery/rebelde boats bol hvar pakleni tour 02.jpg",
        "caption": "Private swimming stops along Brač's hidden coastline"
      },
      {
        "src": "/images/tours/bol-hvar-pakleni/gallery/rebelde boats bol hvar pakleni tour 03.jpg",
        "caption": "Exploring the lively waterfronts of Hvar Island"
      },
      {
        "src": "/images/tours/bol-hvar-pakleni/gallery/rebelde boats bol hvar pakleni tour 04.jpg",
        "caption": "Relaxed Adriatic cruising beneath the summer sun"
      },
      {
        "src": "/images/tours/bol-hvar-pakleni/gallery/rebelde boats bol hvar pakleni tour 05.jpg",
        "caption": "The iconic shape of Zlatni Rat stretching into the sea"
      },
      {
        "src": "/images/tours/bol-hvar-pakleni/gallery/rebelde boats bol hvar pakleni tour 06.jpg",
        "caption": "Private swimming stops along Brač's hidden coastline"
      },
      {
        "src": "/images/tours/bol-hvar-pakleni/gallery/rebelde boats bol hvar pakleni tour 07.jpg",
        "caption": "Exploring the lively waterfronts of Hvar Island"
      },
      {
        "src": "/images/tours/bol-hvar-pakleni/gallery/rebelde boats bol hvar pakleni tour 08.jpg",
        "caption": "Relaxed Adriatic cruising beneath the summer sun"
      },
      {
        "src": "/images/tours/bol-hvar-pakleni/gallery/rebelde boats bol hvar pakleni tour 09.jpg",
        "caption": "Exploring the lively waterfronts of Hvar Island"
      },
      {
        "src": "/images/tours/bol-hvar-pakleni/gallery/rebelde boats bol hvar pakleni tour 10.jpg",
        "caption": "Relaxed Adriatic cruising beneath the summer sun"
      }
    ],
    "faqIds": [
      "bol-q1",
      "bol-q2",
      "bol-q3",
      "hvar-q1",
      "pakleni-q1",
      "general-q5"
    ],
    "relatedTourKeys": [
      "hvar-pakleni-islands",
      "blue-cave-five-islands",
      "blue-lagoon-three-islands"
    ],
    "label": "Bol, Hvar & Pakleni islands Coastal Journey",
    "kicker": "Really popular!",
    "pin": "Island Brač, Island Hvar, Pakleni islands, Island Šolta",
    "intro": "A refined island-hopping experience combining the elegance of Hvar with the natural beauty of Croatia's most iconic beach.",
    "ctaText": "Cruise between the vibrant energy of Hvar and the stunning coastline of Brač, home to the famous Golden Horn beach. Along the way, discover hidden coves, swim in crystal-clear Adriatic waters, and enjoy panoramic coastal scenery shaped by centuries of wind and sea. From lively waterfront promenades to peaceful anchorages beneath dramatic cliffs, this journey captures the perfect balance between exploration, relaxation, and Mediterranean elegance.",
    "durationLabel": "Full day · 8–10 hours",
    "capacityLabel": "Up to 12 guests",
    "priceLabel": "From €1,400",
    "overview": [
      "The Bol, Hvar & Pakleni Coastal Journey pairs three of Dalmatia's most recognisable places in a single day: Zlatni Rat, the golden-horn beach on Brač; Hvar town; and the Pakleni archipelago. Route-wise it's the middle ground between our shorter Blue Lagoon trip and the long Blue Cave day.",
      "Good for families who want an iconic beach stop, small groups on a celebration day, and anyone who's seen Split from the land and now wants to see it from the water."
    ],
    "keyFacts": [
      {
        "label": "Duration",
        "value": "8–10 hours"
      },
      {
        "label": "Departure",
        "value": "Pickup point agreed at booking"
      },
      {
        "label": "Group size",
        "value": "Up to 12 guests"
      },
      {
        "label": "Price",
        "value": "From €1,400 (deposit €400, remainder on the day)"
      }
    ],
    "itinerary": [
      {
        "title": "Zlatni Rat, Bol",
        "description": "Morning stop at Croatia's most famous beach — the golden horn that changes shape with the currents. Anchor in the bay for a swim or head ashore for a coffee in Bol town."
      },
      {
        "title": "Brač coastline",
        "description": "Coastal cruise along Brač's south-facing cliffs — dramatic limestone, hidden coves, a couple of private swim stops."
      },
      {
        "title": "Hvar town",
        "description": "Afternoon arrival at Hvar's harbour. Time for a walk through the old town, a drink on the waterfront, or a peek at the Spanish Fortress views."
      },
      {
        "title": "Pakleni Islands",
        "description": "Late afternoon in the archipelago. Anchor in a sheltered bay for a final swim before turning back to Split."
      }
    ],
    "included": [
      "Private charter of Buenaventura (Felix 37 speedboat)",
      "Fuel and harbour fees",
      "Licensed skipper",
      "Fresh towels and cooler with water and soft drinks",
      "Snorkelling equipment",
      "Bluetooth sound system",
      "VAT"
    ],
    "notIncluded": [
      "Lunch (we'll book a table in Bol, Hvar, or Palmižana ahead)",
      "Alcoholic drinks (bring your own or we can source before departure)",
      "Sunbed rentals at Zlatni Rat",
      "Gratuities (optional)"
    ],
    "whoItsFor": {
      "paragraph": "A great choice for families with kids who want a proper beach day, small groups celebrating, and anyone whose bucket list includes Zlatni Rat. If you'd like to see something rarer and more remote, the Blue Cave route goes further west.",
      "tags": [
        "Families",
        "Iconic beach",
        "Full day"
      ],
      "compareLink": {
        "slug": "blue-cave-five-islands",
        "label": "Blue Cave & Five Islands"
      }
    },
    "logistics": [
      {
        "title": "Meeting point",
        "body": "We agree the pickup point when you book — Split promenade, Zenta marina, or your hotel if it's on the coast."
      },
      {
        "title": "Weather policy",
        "body": "If the forecast is unsafe (strong wind, poor sea state), we'll offer a reschedule or full refund. Decision made the evening before departure."
      },
      {
        "title": "What to bring",
        "body": "Swimsuit, towel, sun cream, sunglasses, a light layer for the ride home. Everything else is on the boat."
      }
    ]
  },
  {
    "key": "bespoke-tour",
    "depositEur": 30000,
    "restEur": 50000,
    "minPrice": 800,
    "maxPrice": 2400,
    "durationHours": 9,
    "touristType": [
      "Couple",
      "Group",
      "Family"
    ],
    "thumb": "/images/gallery/gallery-6.webp",
    "hero": "/images/boat/felix 37 drone shot 1.jpg",
    "mainImg": "/images/boat/felix 37 buoy1.jpg",
    "subImg": "/images/gallery/gallery-9.webp",
    "ctaImg": "/images/boat/felix 37 Rebelde boats.jpg",
    "gallery": [
      {
        "src": "/images/gallery/gallery-1.jpg",
        "caption": "The boat to yourselves — no schedule, no other group waiting"
      },
      {
        "src": "/images/gallery/gallery-6.webp",
        "caption": "Anchored where we found space, not where the itinerary said"
      },
      {
        "src": "/images/gallery/gallery-8.webp",
        "caption": "Long lunches happen when nobody's counting the hours"
      },
      {
        "src": "/images/gallery/gallery-9.webp",
        "caption": "Swimming stops that last as long as you want them to"
      },
      {
        "src": "/images/gallery/gallery-10.webp",
        "caption": "Late light on the way home, because we weren't in a rush"
      },
      {
        "src": "/images/boat/felix 37 drone shot 3.jpg",
        "caption": "Quiet coves that don't make it onto the standard routes"
      }
    ],
    "faqIds": [
      "booking-q1",
      "booking-q2",
      "booking-q3",
      "general-q2",
      "general-q5",
      "general-q1"
    ],
    "relatedTourKeys": [
      "blue-lagoon-three-islands",
      "blue-cave-five-islands",
      "hvar-pakleni-islands"
    ],
    "label": "Design Your Own Day",
    "kicker": "Full day, entirely yours",
    "pin": "Anywhere the boat can reach in a day",
    "thumbAlt": "Buenaventura anchored alone in a quiet Adriatic bay at golden hour",
    "intro": "No fixed route. You tell us what kind of day you want and we build it around the wind, the light, and where the crowds aren't.",
    "ctaText": "Some guests know exactly where they want to go. Most don't, and that's fine — it's usually a better day when we start from what you want to feel rather than a list of places. Tell us who's coming, how much time you have, and whether you'd rather swim, eat, explore or do very little. We'll come back with a shape for the day, adjust it until it's right, and then adjust it again on the water if the sea has other ideas.",
    "durationLabel": "As long as the day allows",
    "capacityLabel": "Up to 12 guests",
    "priceLabel": "From €800",
    "overview": [
      "This isn't a tour so much as a blank day with a boat and two people who know the coast. It suits guests who've been to Dalmatia before, groups with a specific occasion, or anyone who'd rather not be handed an itinerary.",
      "We plan it together over messages before you arrive. On the day itself we keep adjusting — staying longer where you're happy, skipping what isn't landing, moving the whole plan if the wind turns. That flexibility is the reason we only take one group a day."
    ],
    "keyFacts": [
      {
        "label": "Duration",
        "value": "Yours to set — most days run 8–10 hours"
      },
      {
        "label": "Departure",
        "value": "Pickup point and time agreed with you"
      },
      {
        "label": "Group size",
        "value": "Up to 12 guests"
      },
      {
        "label": "Price",
        "value": "From €800, depending on route and hours"
      }
    ],
    "itinerary": [
      {
        "title": "We talk before you arrive",
        "description": "A few messages, usually. Who's coming, what you've already seen, whether this is a celebration, how you feel about long crossings. No forms."
      },
      {
        "title": "We propose a shape",
        "description": "Not a timetable — a rough arc for the day with two or three anchor points and room between them. You tell us what to change."
      },
      {
        "title": "The morning decides the details",
        "description": "We check the wind and the forecast the evening before and again at breakfast. Sometimes the plan holds. Sometimes we swap an island and it's a better day for it."
      },
      {
        "title": "The day moves with you",
        "description": "Longer swim, earlier lunch, one more bay, home before sunset — all decided aboard, by you, without anyone waiting on us."
      }
    ],
    "included": [
      "Private charter of Buenaventura (Felix 37 speedboat)",
      "Fuel and harbour fees",
      "Licensed skipper — one of us, every time",
      "Route planning before and during the day",
      "Fresh towels and cooler with water and soft drinks",
      "Snorkelling equipment",
      "Bluetooth sound system",
      "VAT"
    ],
    "notIncluded": [
      "Lunch (we'll book ahead wherever you'd like to eat)",
      "National park entry fees, if your route includes one",
      "Alcoholic drinks (bring your own or we can source before departure)",
      "Gratuities (optional)"
    ],
    "whoItsFor": {
      "paragraph": "Best for repeat visitors, groups marking something, and anyone who bristles at a fixed schedule. If it's your first time on this coast and you'd rather not decide everything yourself, one of our four set routes is an easier place to start — and we'll still bend it where you want.",
      "tags": [
        "Repeat visitors",
        "Special occasions",
        "No fixed plan"
      ],
      "compareLink": {
        "slug": "blue-lagoon-three-islands",
        "label": "Blue Lagoon & Three Islands"
      }
    },
    "logistics": [
      {
        "title": "Meeting point",
        "body": "Agreed with you — Split promenade, Zenta marina, Trogir, or your hotel if it's on the water."
      },
      {
        "title": "Weather policy",
        "body": "If conditions are unsafe we'll offer a reschedule or a full refund, decided the evening before. More often we simply change the route and go anyway."
      },
      {
        "title": "What to bring",
        "body": "Swimsuit, towel, sun cream, sunglasses, a light layer for the ride home. Everything else is aboard."
      },
      {
        "title": "How far ahead to ask",
        "body": "Write whenever — but sooner is better in July and August. Even a few days out, the date might still be free."
      }
    ]
  }
];

export default tours;

export const tourKeys = tours.map((t) => t.key);
export const getTour = (key) => tours.find((t) => t.key === key);
