module.exports = {
  root: true,
  extends: ["custom", "next"],
  overrides: [{plugins: ["react"], files: ["*.tsx"]}],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  },
};
