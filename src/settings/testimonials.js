const testimonials = [
  // ── July 2026 ─────────────────────────────────────────────
  {
    id: "testimonial-new-1",
    title: "Island Hopping with Rebelde was fantastic!",
    text: "We had the best day ever island hopping from Split with Rebelde luxury speedboat tours. Great fun with the loveliest people and super swimming spots. We truly felt like VIPs for a day as we celebrated our anniversary. Would highly recommend Rebelde — hope to do it all again one day.",
    name: "Valerie N",
    tour: "Blue Lagoon & Three Islands",
  },
  {
    id: "testimonial-new-2",
    title: "An unforgettable experience and a perfect day at sea!",
    text: "The speedboat ride was absolutely amazing — fast, comfortable, and full of positive energy! We visited three beautiful islands, each with crystal-clear sea and wonderful spots for swimming and relaxing. Everything went exactly as agreed, relaxed yet professional. The skipper Čedo was fantastic, friendly, and showed us the best hidden coves. This was definitely the highlight of our vacation and a trip to remember.",
    name: "Max S",
    tour: "Hvar & Pakleni Islands",
  },
  {
    id: "testimonial-new-3",
    title: "Like sailing with 10 friends — the highlight of our trip",
    text: "We were a group of 8 and had an absolutely brilliant day with Dinko and Bruno. Our original tour ended up being unavailable, but they put together an alternate itinerary — and it turned out to be the highlight of our entire trip. From start to finish everything was easy. They organised lunch, were flexible throughout the day, and really knew the islands and all the best spots. What made it special was how relaxed and genuine they both were. By the end it didn't feel like a tour at all.",
    name: "Suzi P",
    tour: "Blue Cave & Five Islands",
  },
  {
    id: "testimonial-new-4",
    title: "Every euro is worth it.",
    text: "We received several offers before booking, and Rebelde Boats was the most expensive. At first we hesitated — but after this experience, we can honestly say it was worth every single euro. The boat itself is incredible, honestly feels like a Cyber Boat. Extremely comfortable, with a cabin, a toilet, a huge sun deck, and every amenity you could possibly need. The crew was simply the best: professional, friendly, fun, and made us feel welcome from the very first minute.",
    name: "Leona D",
    tour: "Full Day Private Charter",
  },
  // ── June 2026 ─────────────────────────────────────────────
  {
    id: "testimonial-new-5",
    title: "Boat day made for everyone.",
    text: "My best friend and I had a girls trip with our 18-year-old daughters. We were recommended this company by a colleague. From minute one it was wonderful. Captain Cedo and Dynko were attentive, welcoming, and part of the experience — it was really whatever we wanted it to be. We went to all sorts of locations to soak up the beauty of Croatia. A wonderfully relaxed and adventurous day feeling like we were part of Croatia. Highly highly recommended.",
    name: "Abbie C",
    tour: "Hvar & Pakleni Islands",
  },
  {
    id: "testimonial-new-6",
    title: "Private charter on the Adriatic",
    text: "A genuinely pleasant experience from beginning to end. The captain took us to multiple coves, two restaurants, and the Big Blue Cave. He took me up a big cliff to jump from and went to great lengths to make sure we had a good time — even swam our phones to us after we'd made the swim into a special beach. Really can't say enough about the hospitality and care with this charter.",
    name: "Richard F",
    tour: "Blue Cave & Five Islands",
  },
  {
    id: "testimonial-new-7",
    title: "Amazing boat day with friends",
    text: "Incredible boat day with my friends on Rebelde Boats! It has been such a wonderful day in great company — everything went smooth and we had a blast with the captain, who was always trying to make us feel comfortable and happy. The locations were stunning and the whole experience felt effortless. Definitely the best experience in Split.",
    name: "Daniela C",
    tour: "Blue Lagoon & Three Islands",
  },
  {
    id: "testimonial-new-8",
    title: "A truly luxurious and awesome experience!",
    text: "We booked the Full Day 4 Islands Tour and it was amazing — great if you want a more private boat trip compared to other options with many people. The boat was truly luxurious: lots of seating space, a sun bed, and every amenity. Čedo and Valentin were super fun and made us feel amazingly safe and taken care of. Čedo also shared a bit about the history and local spots worth checking out. The swimming spots were beautiful with crystal clear turquoise water.",
    name: "Anja",
    tour: "4 Islands Full Day Tour",
  },
  // ── March 2026 ────────────────────────────────────────────
  {
    id: "testimonial-new-9",
    title: "Unmatched experience and hospitality",
    text: "An absolutely wonderful experience. We had a large group for an entire day with small kids. Cedo and Bruno made sure that everyone had an amazing experience — from scuba to playing hide and seek with the kids in and under the water. The hospitality and friendliness was unmatched. The kids still talk about Captain Cedo and Bruno and how much fun they had. The local knowledge and lunch recommendations were top tier. We will be returning and booking for multiple days.",
    name: "Dorian H",
    tour: "Full Day Private Charter",
  },
  // ── Existing reviews ──────────────────────────────────────
  {
    id: "testimonial-4",
    title: "Lifetime of memories in one day!",
    text: "Yes, of course the views were amazing. Yes, the swimming was like you were in an aquarium. But this company's hospitality, attentiveness, and overall grace throughout the day couldn't be beat.",
    name: "Manny H",
    tour: "Blue Cave & Five Islands",
  },
  {
    id: "testimonial-5",
    title: "One of the absolute highlights of our trip to Croatia!",
    text: "The boat crew were not just professional but genuinely fun and friendly. They shared interesting facts about each place we stopped at and really added a personal touch to the whole experience.",
    name: "Daria Luneva",
    tour: "Hvar & Pakleni Islands",
  },
  {
    id: "testimonial-6",
    title: "Unreal boat trip",
    text: "Honestly, it was the highlight of our whole vacation. The kids loved it, the adults loved it — everyone had a blast. We hit up some of the most beautiful lagoons with crystal clear water. Total paradise. If you're thinking about booking a boat day — DO IT!",
    name: "Ksenia C",
    tour: "Blue Lagoon & Three Islands",
  },
  {
    id: "testimonial-1",
    title: "Day trip with friends",
    text: "Really nice and friendly crew who went the extra mile to create a good experience for us — and the boat was amazing!",
    name: "Tobias Slethei",
    tour: "Hvar & Pakleni Islands",
  },
  {
    id: "testimonial-2",
    title: "Just amazing!!!",
    text: "We have absolutely no regrets! The atmosphere was so good thanks to the playlist — very good vibes! I really had an unforgettable day with my friends. I recommend it 10000% with my eyes closed!!",
    name: "Cilia Vrmr",
    tour: "Bol, Hvar & Pakleni",
  },
  {
    id: "testimonial-3",
    title: "Amazing day from shore to shore!",
    text: "Cedo's boat is one of the best of Split boat tours — if not THE best! Thanks for this unforgettable day. I recommend this trip strongly! Even the music was so good! Thank you!!",
    name: "El Aziz El Nachos",
    tour: "Blue Cave & Five Islands",
  },
];

export default testimonials;
