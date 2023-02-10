const path = require('path');

module.exports = {
  "*.js": (stagedFiles) => {
    const filesString = stagedFiles.map((f)=> path.resolve(f)).join(" ");

    return `npx eslint --fix ${filesString}`;
  },
};
