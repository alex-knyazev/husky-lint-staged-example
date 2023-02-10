module.exports = {
  "*.js": (files) => {
    console.log("files");
    console.log(files);
    return `npx eslint --fix`;
  },
  "tests/*.js": () => "npm run test",
};
