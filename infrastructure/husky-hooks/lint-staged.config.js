module.exports = {
  "*.js": (allStagedFiles) => `npm run lint:fix ${allStagedFiles}`,
  "tests/*.js": (allStagedFiles) => "npm run test",
};
