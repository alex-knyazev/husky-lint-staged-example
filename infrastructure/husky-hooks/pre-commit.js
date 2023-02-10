const path = require("path");

init();

async function init() {
  try {
    const { default: lintStaged } = await import("lint-staged");
    const { getStagedFiles } = await import(
      "lint-staged/lib/getStagedFiles.js"
    );

    console.log(getStagedFiles);

    colorizeOutputInTerminal();

    const success = await lintStaged({
      quiet: true, // Only errors will be printed
      configPath: path.join(__dirname, "./.lintstagedrc"),
    });

    if (!success) {
      console.log(success);
      throw new Error("Linting failed!\n");
    }
  } catch (e) {
    // Failed to load configuration
    console.error(e);
  }
}

function colorizeOutputInTerminal() {
  process.env.FORCE_COLOR = "1";
}
