const faqs = [
  {
    id: "general",
    title: "General Questions",
    qa: [
      {
        id: "general-q1",
        question: "What's included in the price?",
        answer:
          "Our prices include fuel, a professional skipper, bottled water, and snorkeling gear. Park fees or restaurant bills aren't included unless we tell you otherwise.",
      },
      {
        id: "general-q2",
        question: "Can I customize the tour itinerary?",
        answer:
          "Yes — all private tours are flexible. We're happy to adjust the route to fit what you want to see, your pace, and the day's conditions.",
      },
      {
        id: "general-q3",
        question: "Do I need to bring anything?",
        answer:
          "Just sunscreen, swimwear, a towel, and a good vibe. We handle the rest, including snorkeling gear and water.",
      },
      {
        id: "general-q4",
        question: "Where does the tour start and end?",
        answer:
          "Most tours depart from Split harbor, but we can also pick you up from nearby locations by arrangement. We'll send you exact pickup details after booking.",
      },
      {
        id: "general-q5",
        question: "What if the weather is bad?",
        answer:
          "Your safety is our priority. If conditions don't allow for a safe trip, we'll reschedule or offer a full refund — no questions asked.",
      },
      {
        id: "general-q6",
        question: "Is food or drink available on board?",
        answer:
          "We provide water and can bring a cooler upon request. You're welcome to bring snacks or drinks of your own — many guests like to stock up at the market before departure.",
      },
      {
        id: "general-q7",
        question: "How do I book a tour?",
        answer:
          "Book directly through our website, or reach out via WhatsApp, email, or phone. We typically respond within a few hours during the season.",
      },
    ],
  },

  {
    id: "boat",
    title: "About the Boat",
    qa: [
      {
        id: "boat-q1",
        question:
          "Will I ever book one boat and end up on a different, lower-quality one?",
        answer:
          "No. We own and operate a single boat, the Felix 37 Buenaventura. For larger groups or extra boats, we only arrange vessels of the same make, size, or quality — never a downgrade.",
      },
      {
        id: "boat-q2",
        question: "How many people can the boat accommodate?",
        answer:
          "The Felix 37 Buenaventura comfortably accommodates up to 12 guests.",
      },
      {
        id: "boat-q3",
        question: "Is there a restroom on the boat?",
        answer:
          "Yes — there's a private restroom on board with an electric toilet and sink.",
      },
      {
        id: "boat-q4",
        question: "Is the boat equipped with safety gear?",
        answer:
          "Absolutely. The boat carries all required safety equipment — life jackets in all sizes, first aid kits, and more — fully compliant with maritime regulations.",
      },
      {
        id: "boat-q5",
        question: "Is the boat suitable for children?",
        answer:
          "Yes. We're family-friendly and provide life jackets for kids of all ages.",
      },
      {
        id: "boat-q6",
        question: "What amenities are on board?",
        answer:
          "Electric toilet and sink, outdoor shower, extra-large sundeck, refrigerator, large ice box, wine/champagne and other glasses, life vests in all sizes, concert-grade sound system, USB-A phone charging, goggles and snorkels, foam noodles, and SUP boards.",
      },
    ],
  },

  {
    id: "blue-lagoon-three-islands",
    title: "Blue Lagoon, Trogir & Šolta",
    qa: [
      {
        id: "lagoon-q1",
        question: "How long is the ride to the Blue Lagoon?",
        answer:
          "Plan on roughly 25–30 minutes from Split with our boat. Sea conditions can nudge that a few minutes either way.",
      },
      {
        id: "lagoon-q2",
        question: "Can we swim and snorkel once we get there?",
        answer:
          "Absolutely. The Blue Lagoon is crystal clear and perfect for a dip — masks and snorkels are on board if you don't bring your own.",
      },
      {
        id: "lagoon-q3",
        question: "Is this Blue Lagoon trip kid-friendly?",
        answer:
          "Yes. It's close to Split so you're not out on open water for long, and the calm, shallow areas make it easy with children.",
      },
      {
        id: "lagoon-q4",
        question: "Any beach bars or cafés around?",
        answer:
          "There are a couple of laid-back beach bars right in the bay — great for a coffee or a cold drink between swims.",
      },
      {
        id: "lagoon-q5",
        question: "Is there somewhere to grab a proper meal?",
        answer:
          "Yes — there's a waterfront restaurant at the lagoon where you can sit down for food.",
      },
      {
        id: "lagoon-q6",
        question: "How long do we usually stay at the Blue Lagoon?",
        answer:
          "Typically 60–90 minutes, but we can tweak the stop based on weather and your preferences.",
      },
      {
        id: "lagoon-q7",
        question: "What's the water temperature like?",
        answer:
          "In summer it's usually 23–27 °C (73–81 °F). Spring and autumn are cooler, so a dip can feel brisk.",
      },
      {
        id: "trogir-q1",
        question: "How much free time do we get in Trogir?",
        answer:
          "Usually around an hour — enough to wander the old town, grab a gelato, or pop into one landmark. Private trips are flexible.",
      },
      {
        id: "trogir-q2",
        question: "What should I see first in Trogir's old town?",
        answer:
          "Start with the Cathedral of St. Lawrence, Kamerlengo Fortress, and the seafront promenade — everything is within a short stroll.",
      },
      {
        id: "trogir-q3",
        question: "Can we hit a beach in Trogir during the stop?",
        answer:
          "Not really — the old town where we dock is inland. Use your free time to explore the medieval streets; save beach time for the Blue Lagoon or Šolta.",
      },
      {
        id: "solta-q1",
        question: "Which part of Šolta do we visit?",
        answer:
          "We usually stop in Maslinica or a quiet nearby bay — calm water, great swimming, and local taverns for lunch.",
      },
      {
        id: "solta-q2",
        question: "Can we try local food or wine on Šolta?",
        answer:
          "Definitely. We can recommend or pre-book a konoba for fresh seafood, olive oil tastings, and local wines.",
      },
    ],
  },

  {
    id: "blue-cave-five-islands",
    title: "Blue Cave & Five Islands",
    qa: [
      {
        id: "bluecave-q1",
        question: "How long is the boat ride to the Blue Cave from Split?",
        answer:
          "Roughly 1 hour 30–40 minutes by speedboat, depending on sea conditions.",
      },
      {
        id: "bluecave-q2",
        question: "When does the famous blue glow look the best?",
        answer:
          "Late morning (around 10:00–13:00) usually gives the strongest color, but clouds and sea state can shift it.",
      },
      {
        id: "bluecave-q3",
        question: "Is the cave ticket included or paid on the spot?",
        answer:
          "Tickets are handled by the park's staff. Sometimes we include them; otherwise you'll pay on-site — cash or card is fine.",
      },
      {
        id: "bluecave-q4",
        question: "Do we swim inside the Blue Cave?",
        answer:
          "No — swimming is not allowed inside. We swim and snorkel at later stops instead.",
      },
      {
        id: "bluecave-q5",
        question: "What if the cave is closed due to waves?",
        answer:
          "Harbor authorities shut it when the entrance is unsafe. If that happens, we reroute to extra bays or extend time elsewhere.",
      },
      {
        id: "stiniva-q1",
        question: "Do we swim at Stiniva?",
        answer:
          "Yes, if conditions allow. The cove is sheltered and stunning — bring water shoes, as it's pebbly.",
      },
      {
        id: "stiniva-q2",
        question: "How long do we stay in Stiniva?",
        answer:
          "Usually 30–40 minutes for swimming, photos, and soaking in the scenery.",
      },
      {
        id: "budikovac-q1",
        question: "Is the water shallow at Budikovac's blue lagoon?",
        answer:
          "Yes — crystal clear and relatively shallow near shore, perfect for floating and snorkeling.",
      },
      {
        id: "fiveislands-q1",
        question: "What's the total duration of this trip?",
        answer:
          "Plan for a full day — around 10 to 11 hours, including boat rides and all stops.",
      },
      {
        id: "fiveislands-q2",
        question: "Is the ride bumpy? What if I get seasick?",
        answer:
          "Open-sea stretches can get choppy. If you're prone to motion sickness, take tablets before departure.",
      },
      {
        id: "fiveislands-q3",
        question: "When do we usually return to Split?",
        answer:
          "Around 17:00–18:00, give or take, depending on sea conditions and how long we linger at each stop.",
      },
    ],
  },

  {
    id: "hvar-pakleni-islands",
    title: "Hvar & Pakleni Islands",
    qa: [
      {
        id: "hvar-q1",
        question: "How much free time do we get in Hvar?",
        answer:
          "Typically 1–2 hours — enough to grab lunch, explore the old town, or hike up to the fortress for a view.",
      },
      {
        id: "hvar-q2",
        question: "Can we visit the Španjola Fortress within the stop time?",
        answer:
          "Yes — budget 15–20 minutes uphill. Go right after docking if you want plenty of time and still want lunch after.",
      },
      {
        id: "hvar-q3",
        question: "Is Hvar expensive for food and drinks?",
        answer:
          "It's one of the pricier islands, but you'll find everything from quick pizza slices to upscale dining.",
      },
      {
        id: "hvar-q4",
        question: "Are there beaches in Hvar town itself?",
        answer:
          "A couple of small spots exist, but for proper swimming we head to the Pakleni Islands just across the channel.",
      },
      {
        id: "pakleni-q1",
        question: "Which Pakleni bay do we stop at?",
        answer:
          "Common picks are Palmižana or a quiet cove nearby — calm water, restaurants, and great swimming.",
      },
      {
        id: "pakleni-q2",
        question: "Is snorkeling good around the Pakleni Islands?",
        answer:
          "Yes — clear water, rocky bottoms, and plenty of fish. We bring masks; you just jump in.",
      },
      {
        id: "pakleni-q3",
        question: "Can we book a lunch table on Pakleni ahead of time?",
        answer:
          "Yes, and it's smart in peak season. Tell us your preference and we'll reserve a spot.",
      },
      {
        id: "pakleni-q4",
        question: "Are there sandy beaches on Pakleni or mostly rocks/pebbles?",
        answer:
          "Mostly pebbles and rocks, but with easy water access and ladders at some beach clubs.",
      },
    ],
  },

  {
    id: "bol-hvar-pakleni",
    title: "Bol, Hvar & Pakleni",
    qa: [
      {
        id: "bol-q1",
        question: "How long does it take to reach Bol and Zlatni Rat from Split?",
        answer:
          "Roughly 1 hour 15 minutes by speedboat, give or take depending on sea and wind.",
      },
      {
        id: "bol-q2",
        question: "Do we anchor near Zlatni Rat or dock in Bol town?",
        answer:
          "We usually dock in Bol's harbor and you walk 10–15 minutes (or take a mini train / taxi boat) to Zlatni Rat beach.",
      },
      {
        id: "bol-q3",
        question: "Is Zlatni Rat sandy?",
        answer:
          "It's mostly smooth white pebbles — water shoes help, but the water is crystal clear.",
      },
      {
        id: "bol-q4",
        question: "Can we rent sunbeds or water toys at Zlatni Rat?",
        answer:
          "Yes, plenty of vendors rent loungers, umbrellas, SUP boards, and more during high season.",
      },
      {
        id: "bol-q5",
        question: "How much free time do we get in Bol?",
        answer:
          "Usually about 2 hours — enough for a swim, a beach stroll, and a quick drink.",
      },
      {
        id: "bol-q6",
        question: "Are there showers and changing rooms at the beach?",
        answer:
          "Yes — public facilities and beach bars around Zlatni Rat where you can rinse off and change.",
      },
    ],
  },
];

export default faqs;
