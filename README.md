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
