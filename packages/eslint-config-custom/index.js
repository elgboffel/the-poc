module.exports = {
 extends: ["next", "turbo", "prettier"],
 rules: {
   "@next/next/no-html-link-for-pages": "off",
 }
};

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
