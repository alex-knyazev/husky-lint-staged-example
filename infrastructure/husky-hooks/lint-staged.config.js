module.exports = {
  "*.js": (allStagedFiles) => `npm run lint:fix ${allStagedFiles}`,
  "tests/*.js": () => "npm run test",
};
