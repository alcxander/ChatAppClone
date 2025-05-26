import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // Custom rule overrides
    rules: {
      "@typescript-eslint/no-var-requires": "off", // 👈 allow require()
      "@typescript-eslint/no-require-imports": "off",    // disables errors for `require("...")`
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn", // 👈 change from error to warning
    },
  },
];

export default eslintConfig;
