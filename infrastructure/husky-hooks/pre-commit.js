const path = require("path");

init();

async function init() {
  const { default: lintStaged } = await import("lint-staged");

  colorizeOutputInTerminal();

  const success = await lintStaged({
    quiet: true, // Only errors will be printed
    configPath: path.join(__dirname, "./lint-staged.config.js"),
    shell: true
  });

  if (!success) {
    throw new Error("Linting failed!\n");
  }
}

function colorizeOutputInTerminal() {
  process.env.FORCE_COLOR = "1";
}
