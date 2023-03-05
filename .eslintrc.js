module.exports = {
  env: {
    brower: true,
    node: true,
    ecmaVersion2020: true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOption: {
    sourceType: "module",
    ecmaversion: 11,
  },
  rules: {
    "no-console": 0,
    "no-underscore-dangle": 0,
    "no-nested-ternary": 0,
  },
};
