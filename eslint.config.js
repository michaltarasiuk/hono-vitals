import js from "@eslint/js";
import perfectionist from "eslint-plugin-perfectionist";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    ignores: ["dist/**", "node_modules/**", "public/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,ts,tsx}"],
    plugins: {
      perfectionist,
    },
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "perfectionist/sort-imports": ["error"],
    },
  },
);
