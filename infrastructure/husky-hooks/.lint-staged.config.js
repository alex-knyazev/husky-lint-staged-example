module.exports = {
  "*.js": () => `npm run lint:fix`,
  "tests/*.js": () => "npm run test",
};
