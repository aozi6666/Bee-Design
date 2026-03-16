/** @type {import("stylelint").Config} */
module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-standard-scss"],
  plugins: ["stylelint-scss"],
  customSyntax: "postcss-scss",
  ignoreFiles: ["build/**", "dist/**", "coverage/**", "node_modules/**"],
  rules: {
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
    "selector-class-pattern": null
  }
};

