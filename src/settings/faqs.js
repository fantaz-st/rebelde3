/**
 * FAQ index — category ids and the question ids inside each.
 *
 * Category titles live under `faqCategories.<id>`;
 * questions and answers under `faq.<questionId>.question` / `.answer`.
 *
 * STRUCTURE ONLY — no user-facing copy lives here.
 * Every string a visitor reads is in src/messages/<locale>.json.
 */

const faqs = [
  {
    "id": "general",
    "qa": [
      "general-q1",
      "general-q2",
      "general-q3",
      "general-q4",
      "general-q5",
      "general-q6",
      "general-q7"
    ]
  },
  {
    "id": "boat",
    "qa": [
      "boat-q1",
      "boat-q2",
      "boat-q3",
      "boat-q4",
      "boat-q5",
      "boat-q6"
    ]
  },
  {
    "id": "blue-lagoon-three-islands",
    "qa": [
      "lagoon-q1",
      "lagoon-q2",
      "lagoon-q3",
      "lagoon-q4",
      "lagoon-q5",
      "lagoon-q6",
      "lagoon-q7",
      "trogir-q1",
      "trogir-q2",
      "trogir-q3",
      "solta-q1",
      "solta-q2"
    ]
  },
  {
    "id": "blue-cave-five-islands",
    "qa": [
      "bluecave-q1",
      "bluecave-q2",
      "bluecave-q3",
      "bluecave-q4",
      "bluecave-q5",
      "stiniva-q1",
      "stiniva-q2",
      "budikovac-q1",
      "fiveislands-q1",
      "fiveislands-q2",
      "fiveislands-q3"
    ]
  },
  {
    "id": "hvar-pakleni-islands",
    "qa": [
      "hvar-q1",
      "hvar-q2",
      "hvar-q3",
      "hvar-q4",
      "pakleni-q1",
      "pakleni-q2",
      "pakleni-q3",
      "pakleni-q4"
    ]
  },
  {
    "id": "bol-hvar-pakleni",
    "qa": [
      "bol-q1",
      "bol-q2",
      "bol-q3",
      "bol-q4",
      "bol-q5",
      "bol-q6"
    ]
  }
];

export default faqs;

/** Flat list of every question id, in page order. */
export const allFaqIds = faqs.flatMap((s) => s.qa);
