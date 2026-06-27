import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "hr", "de", "es", "it", "fr"],
  defaultLocale: "en",
  // English at root — /hr /de /es /it /fr get prefixes
  localePrefix: "as-needed",
});
