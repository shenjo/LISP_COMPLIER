# JS_SCHEME_COMPLIER

> SICP解释器- javascript实现 

在学习SICP这本书的过程中，一直使用mit-Scheme来敲，但是用的很不习惯（个人感受）。所以希望有一个更简单的界面来操作，正好学习这本书可以实现一个解释器，所以索性打算
在实现解释器的基础上做一个简单的页面，然后就可以DIY各种功能啦！目前还在写解释器的阶段。。。任重而道远啊！


既然要拿出来用，当然测试方面要跟上，目前在写好一个函数后加基本的测试用例，除此之外，要能推广使用的话
当然书中的例子肯定要通过啊！所以目前也在重新刷一遍，边看边把书中出现的所有example加入到我的测试用例里，详情请看
[第一章](./test/SICP_Chapter1.js)

现已实现的函数（偷懒直接贴代码啦。）

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
  env.register('=', operaters.equals);
  env.register('cond', operaters.cond);
  env.register('and', operaters.and);
  env.register('or', operaters.or);
  env.register('not', operaters.not);
  return env;
}
```

```bash
$ npm i | yarn 

$ npm run dev | yarn run dev
```

## 2. test

```bash
$ npm test | yarn test
```


