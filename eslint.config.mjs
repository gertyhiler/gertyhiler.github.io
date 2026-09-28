import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";
import { projectModuleTaxonomyPlugin } from "./scripts/eslint/project-module-taxonomy.mjs";
import { projectBoundariesPlugin } from "./scripts/eslint/project-boundaries.mjs";
export default defineConfig([
  {
    files: ["app/**/*.{ts,tsx}", "src/**/*.{ts,tsx}"],
    plugins: { boundaries: projectBoundariesPlugin },
    rules: { "boundaries/boundaries": "error" },
  },
  ...nextVitals,
  ...nextTs,
  {
    files: ["app/**/*.{ts,tsx}", "src/**/*.{ts,tsx}"],
    rules: jsxA11y.flatConfigs.recommended.rules,
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: { project: projectModuleTaxonomyPlugin },
    rules: { "project/module-taxonomy": "error" },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "node_modules/**",
    "next-env.d.ts",
    ".agents/**",
  ]),
]);
