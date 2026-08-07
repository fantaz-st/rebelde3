/**
 * Lists message keys that are still identical to English — i.e. seeded
 * placeholders that have not been translated yet.
 *
 *   node i18n-audit.mjs           # summary by namespace
 *   node i18n-audit.mjs fr        # every outstanding key for one locale
 */
import fs from "fs";

const DIR = "src/messages";
const LOCALES = ["hr", "de", "es", "it", "fr"];
const MIN_LEN = 25; // ignore short strings that legitimately match ("SUP", "Split")

const flat = (o, p = "") =>
  o && typeof o === "object"
    ? Object.entries(o).flatMap(([k, v]) => flat(v, p ? `${p}.${k}` : k))
    : [[p, o]];

const load = (l) => Object.fromEntries(flat(JSON.parse(fs.readFileSync(`${DIR}/${l}.json`, "utf8"))));

const en = load("en");
const only = process.argv[2];

for (const l of only ? [only] : LOCALES) {
  const d = load(l);
  const stale = Object.keys(en).filter(
    (k) => typeof en[k] === "string" && en[k].length > MIN_LEN && d[k] === en[k],
  );

  const byNs = {};
  for (const k of stale) {
    const ns = k.split(".")[0];
    byNs[ns] = (byNs[ns] || 0) + 1;
  }

  console.log(`\n${l}: ${stale.length} untranslated`);
  for (const [ns, n] of Object.entries(byNs).sort((a, b) => b[1] - a[1])) {
    console.log(`   ${ns.padEnd(20)} ${n}`);
  }
  if (only) stale.forEach((k) => console.log(`   - ${k}`));
}
