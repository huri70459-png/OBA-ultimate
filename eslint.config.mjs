import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

// ============================================================
// Project Brain OS — Strict Engineering Discipline (Tier-1 redesign)
//
// The application code under src/** is held to enterprise guardrails:
// type safety (no-explicit-any), hook correctness (exhaustive-deps),
// strict equality, no shadowing, and consistent component style.
//
// Non-application suites (verification scripts under scripts/**, uploaded
// reference material under upload/**) stay on the lenient base config:
// they are plain-node .mjs harnesses, not shipped code.
//
// Flat config semantics: LATER entries win. Order matters —
//   1. Next.js base configs
//   2. Lenient global baseline (scripts, harnesses, vendored code)
//   3. Strict guardrails scoped to src/**
//   4. Vendored shadcn/ui exception
// ============================================================

const strictAppRules = {
  // --- General ESLint — stricter enforcement ---
  "no-console": ["warn", { allow: ["warn", "error"] }],
  "prefer-const": "error",
  "array-callback-return": "error",
  "eqeqeq": ["error", "always"],
  "no-redeclare": "error",
  "no-shadow": "off", // handled by @typescript-eslint/no-shadow
  "no-unused-vars": "off", // handled by @typescript-eslint/no-unused-vars

  // --- TypeScript ESLint — re-enabled and strengthened ---
  "@typescript-eslint/no-explicit-any": "error",
  "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
  "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
  "@typescript-eslint/no-shadow": "error",
  "@typescript-eslint/no-inferrable-types": "error",

  // --- React / Hooks ---
  "react/self-closing-comp": "error",
  "react-hooks/rules-of-hooks": "error",
  "react-hooks/exhaustive-deps": "error",
  "react/jsx-curly-brace-presence": ["error", { props: "never", children: "never" }],
  "react/function-component-definition": ["error", { namedComponents: "arrow-function" }],
};

const eslintConfig = [
  // 1. Next.js recommended base
  ...nextCoreWebVitals,
  ...nextTypescript,

  // 2. Lenient global baseline — verification harnesses / vendored code keep
  //    the historical permissive rules (they are not shipped application code)
  {
    rules: {
      "react-hooks/purity": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/prefer-as-const": "off",

      "react-hooks/exhaustive-deps": "off",
      "react/no-unescaped-entities": "off",
      "react/display-name": "off",
      "react/prop-types": "off",

      "@next/next/no-img-element": "off",
      "@next/next/no-html-link-for-pages": "off",

      "prefer-const": "off",
      "no-unused-vars": "off",
      "no-console": "off",
      "no-debugger": "off",
      "no-empty": "off",
      "no-irregular-whitespace": "off",
      "no-case-declarations": "off",
      "no-fallthrough": "off",
      "no-mixed-spaces-and-tabs": "off",
      "no-redeclare": "off",
      "no-undef": "off",
      "no-unreachable": "off",
      "no-useless-escape": "off",
    },
  },

  // 3. Strict guardrails for the shipped application
  {
    files: ["src/**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    rules: strictAppRules,
  },

  // 4. Vendored shadcn/ui primitives: idiomatic destructuring shadowing is part
  //    of the generated code style — every other guardrail stays active.
  {
    files: ["src/components/ui/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-shadow": "off",
    },
  },

  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "examples/**",
      "skills",
      "upload/**",
      "components.json",
    ],
  },
];

export default eslintConfig;
