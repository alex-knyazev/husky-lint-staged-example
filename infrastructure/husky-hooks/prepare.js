const path = require('path');

const gitHooksAreUsedInCurrentEnvironment = ! isCiEnvironment();

if (gitHooksAreUsedInCurrentEnvironment) {
  const pathForHuskySettings = path.join(__dirname, 'settings');

  require('husky').install(pathForHuskySettings)
}

function isCiEnvironment() {
  /* CI env variable should be set to true in CI environment */
  return process.env.CI !== undefined 
}