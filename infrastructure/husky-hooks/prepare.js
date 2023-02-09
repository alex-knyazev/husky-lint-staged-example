/* eslint-env node */

const path = require('path');

/* CI env variable should be configured in CI environment */
const isCi = process.env.CI !== undefined
const gitHooksAreUsedInCurrentEnvironment = ! isCi;

if (gitHooksAreUsedInCurrentEnvironment) {
  const pathForHuskySettings = path.join(__dirname, 'settings');

  require('husky').install(pathForHuskySettings)
}