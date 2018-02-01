# LISP_COMPLIER

## 1. run

```bash
$ npm i | yarn 

$ npm run dev
```

## 2. plan

currently only has a little function.

```ecmascript 6
function setupDefaultEnv (env) {
  env.register('+', Opers.addition);
  env.register('-', Opers.subtraction);
  env.register('*', Opers.multiplication);
  env.register('/', Opers.division);
  env.register('define',Opers.define);
  env.register('if',Opers.myIf);
  env.register('>',Opers.my_greater);
  env.register('>=',Opers.my_equal_greate);
  env.register('<',Opers.my_less);
  env.register('<=',Opers.my_equal_less);
}
```

plan to implement all the function


