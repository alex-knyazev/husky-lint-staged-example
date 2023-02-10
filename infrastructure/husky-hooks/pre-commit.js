const path = require("path");

init();

async function init() {
  try {
    const { default: lintStaged } = await import("lint-staged");

    colorizeOutputInTerminal();

    const success = await lintStaged({
      quiet: true, // Only errors will be printed
      configPath: path.join(__dirname, "./.lintstagedrc"),
    });

    if (!success) {
      console.log(success);
      console.log("Linting failed!");
      process.exit(1);
    }

    console.log("Linting was successful!");
  } catch (e) {
    // Failed to load configuration
    console.error(e);
  }
}

function colorizeOutputInTerminal() {
  process.env.FORCE_COLOR = "1";
}
