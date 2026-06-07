import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),

  {
    files: ["**/*.{ts,tsx}"],

    plugins: {
      "react-hooks": reactHooks,
      import: importPlugin,
    },

    rules: {
      // React hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // React Compiler rules
      'react-hooks/config': 'error',
      'react-hooks/error-boundaries': 'error',
      'react-hooks/gating': 'error',
      'react-hooks/globals': 'error',
      'react-hooks/immutability': 'error',
      'react-hooks/preserve-manual-memoization': 'error',
      'react-hooks/purity': 'error',
      'react-hooks/refs': 'error',
      'react-hooks/set-state-in-effect': 'error',
      'react-hooks/set-state-in-render': 'error',
      'react-hooks/static-components': 'error',
      'react-hooks/unsupported-syntax': 'warn',
      'react-hooks/use-memo': 'error',
      'react-hooks/incompatible-library': 'warn',
      "react-hooks/exhaustive-deps": ["warn", {
        additionalHooks: "(useMyCustomHook|useMyOtherCustomHook)"
      }],

      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ]
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
]);