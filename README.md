## Set up husky

```
npm i -D husky
```

Edit package.json > prepare script and run it once:

```
"prepare": "node ./infrastructure/husky-hooks/prepare.js"
```

Then run:

```
npm run prepare
```

Then run:

```
npx husky add ./infrastructure/husky-hooks/settings/pre-commit "npm run lint"
```

## Set up lint-staged

```
npm install --save-dev lint-staged
```

Create `.lintstagedrc`

```
{
    "*": "npm run lint:fix"
}
```

In `infrastructure/husky-hooks/settings/pre-commit` change calling command to

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged

```

Lint-staged can be running via node.js

In `infrastructure/husky-hooks/settings/pre-commit` change calling command to

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

node ./infrastructure/husky-hooks/pre-commit.js

```

Then in ./infrastructure/husky-hooks/pre-commit.js write:

```
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

```

`.lintstagedrc` in example above is located nto in root of project, but in `./infrastructure/husky-hooks`.
