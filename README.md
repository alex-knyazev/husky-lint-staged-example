Install husky 

npm i -D husky

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
