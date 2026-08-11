import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

// This is a JavaScript project — eslint-config-next/typescript is deliberately
// not loaded, since it pulls in typescript-eslint and requires the `typescript`
// package to be installed.
const eslintConfig = defineConfig([
  ...nextVitals,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
  ]),
]);

export default eslintConfig;
