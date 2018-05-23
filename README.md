# LISP_COMPLIER

## 1. run

```bash
$ npm i | yarn 

$ npm run dev | yarn run dev
```

## 2. test

```bash
$ npm test | yarn test
```

## 3. plan

currently only has a little function.

```ecmascript 6
function initDefaultEnv() {
  let env = new Env();
  env.register('+', operaters.add);
  env.register('-', operaters.subtract);
  env.register('*', operaters.multi);
  env.register('/', operaters.divide);
  env.register('lambda', operaters.lambda);
  env.register('define', operaters.define);
  env.register('if', operaters.myIf);
  env.register('>', operaters.greaterThen);
  env.register('>=', operaters.greaterAndEqualsThen);
  env.register('<', operaters.lessThen);
  env.register('<=', operaters.lessAndEqualsThen);
  return env;
}
```

plan to implement all the function


