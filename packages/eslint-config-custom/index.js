module.exports = {
  env: {
    node: true,
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "turbo",
    "prettier",
  ],
  plugins: ["@typescript-eslint"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
  },
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-empty-function": "off"
  },
};

// module.exports = {
//   extends: ["turbo", "prettier"],
// };

// module.exports = {
//   env: {
//     node: true,
//   },
//   parser: "@typescript-eslint/parser",
//   extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "turbo", "prettier"],
//   plugins: ["@typescript-eslint"],
//   parserOptions: {
//     sourceType: "module",
//     ecmaVersion: 2022,
//   },
//   rules: {
//     "@typescript-eslint/no-non-null-assertion": "off",
//   },
// };
