import fsd from "@feature-sliced/steiger-plugin";
import { defineConfig } from "steiger";
export default defineConfig([
  ...fsd.configs.recommended,
  { files: ["./src/shared/**"], rules: { "fsd/public-api": "off" } },
  {
    files: ["./src/{pages,widgets,features,entity}/*/model/lib/**"],
    rules: { "fsd/no-reserved-folder-names": "off" },
  },
  // Logistics-compatible names, composition roots and semantic taxonomy.
  // ESLint owns their stricter mechanical contracts; see docs/code/architecture.md.
  {
    rules: {
      "fsd/typo-in-layer-name": "off",
      "fsd/insignificant-slice": "off",
      "fsd/segments-by-purpose": "off",
      "fsd/no-segmentless-slices": "off",
    },
  },
]);
