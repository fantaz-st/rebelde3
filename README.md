# i18n Migration Guide

## 1. Install next-intl

```bash
npm install next-intl
```

## 2. Replace next.config.js

Replace your existing `next.config.js` with `next.config.mjs` from this package.
If you already have a `next.config.mjs`, merge the `withNextIntl` wrapper into it.

## 3. Move app routes into [locale]

Your route structure changes from:

```
src/app/
  layout.js
  (home)/
  (inner)/
```

To:

```
src/app/
  layout.js          ← replace with the new minimal one
  [locale]/
    layout.js        ← new locale wrapper with NextIntlClientProvider
    (home)/
    (inner)/
```

Drop the files from this package's `src/app/` into your `src/app/`.

## 4. Add i18n config files

Copy `src/i18n/` and `src/middleware.ts` to your project.

## 5. Add message files

Copy `src/messages/` to your project.

## 6. Replace updated components

Replace the following files:
- `src/components/Header/Header.jsx`
- `src/components/Footer/Footer.jsx`
- `src/components/ContactForm/ContactForm.jsx`
- `src/sections/home/Hero/Hero.jsx`
- `src/sections/home/Tours/Tours.jsx`
- `src/sections/home/Boat/Boat.jsx`
- `src/sections/tours/ToursHero/ToursHero.jsx`
- `src/sections/boat/BoatHero/BoatHero.jsx`
- `src/sections/boat/BoatSpecs/BoatSpecs.jsx`
- `src/sections/boat/BoatSections/BoatSections.jsx`
- `src/sections/boat/BoatSections/BoatSectionItem.jsx`

## 7. Add new components

Copy `src/components/LanguageSwitcher/` to your project.

## 8. Sections not yet translated

The following components still use hardcoded strings and will need the same treatment.
The pattern is identical — add `useTranslations("namespace")` and move strings to messages/:
- `src/sections/home/Team/Team.jsx` — use `team.*` namespace
- `src/sections/home/Testimonials/Testimonials.jsx` — use `testimonials.*`
- `src/sections/tours/Expeditions/ExpeditionItem.jsx` — use `tourItems.*`
- `src/sections/tours/Facts/Facts.jsx` — use `facts.*`
- `src/components/Faq/Faq.jsx` — FAQ Q&A text (already in faqs.js, needs per-locale faqs)

## 9. FAQ / Tours data files

`tours.js`, `faqs.js`, `facts.js`, `team.js`, `testimonials.js` currently export hardcoded
English strings. For a quick win they still work — the translated strings for tour labels,
kickers, intros and CTA text are already in messages/{locale}.json under `tourItems.*`.
The components have been updated to read from translations instead of the data files for
user-visible strings. Image paths and keys still come from the data files.

## URL structure

- English: `rebelde.hr/` `rebelde.hr/the-boat` etc. (no prefix)
- Croatian: `rebelde.hr/hr/` `rebelde.hr/hr/the-boat` etc.
- German: `rebelde.hr/de/` etc.
- Spanish: `rebelde.hr/es/`
- Italian: `rebelde.hr/it/`
- French: `rebelde.hr/fr/`

The LanguageSwitcher in the header lets users switch locale while staying on the same page.
