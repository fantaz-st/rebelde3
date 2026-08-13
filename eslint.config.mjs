import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import globals from "globals";

/**
 * next/core-web-vitals plus three rules it doesn't enable.
 *
 * `no-undef` catches an identifier that is used but never imported — the
 * build compiles those fine and they only fail in the browser. `no-shadow`
 * catches a local declaration masking an import, which is how a
 * self-recursive helper got introduced during a refactor.
 */
const eslintConfig = defineConfig([
  ...nextVitals,
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      "no-undef": "error",
      "no-shadow": "error",
      "no-redeclare": "error",
    },
  },
  {
    // third-party GSAP helper, kept close to its published form
    files: ["src/helpers/horizontalHelper.js"],
    rules: { "no-shadow": "off" },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
