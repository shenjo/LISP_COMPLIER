const {Node, Tree} = require('../Comon/dataStructure');
const {Env} = require('../Default_env');
const {isNumber, isString, isVariable, isLambdaExpression, isDefineExpression} = require('../Comon/util');
const {MyFunction} = require('../Default_env/MyFunction');

function evalSystem(expression, env) {
  if (expression instanceof Tree) {
    return executeGrammarTree(expression, env)
  } else if (expression instanceof Node) {
    if (isNumber(expression) || isString(expression)) {
      return expression.getVal();
    } else if (isVariable(expression)) {
      return env.find(expression.getVal());
    }
  } else if (expression instanceof MyFunction) {

  }
}

function executeGrammarTree(grammarTree, env) {
  if (!grammarTree.isEmpty()) {
    let operator = evalSystem(grammarTree.children[0], env);
    if (typeof  operator !== 'function') {
      if (grammarTree.children.slice(1).length > 0) {
        throw new Error('操作符必须是已定义的函数');
      } else {
        return operator;
      }
    }
    if (isLambdaExpression(grammarTree.children[0])) {
      return operator.call(null, [grammarTree.children[1], grammarTree.children[2]], env)
    } else if (isDefineExpression(grammarTree.children[0])) {
      return operator.call(null, [grammarTree.children[1].getVal(), evalSystem(grammarTree.children[2], env)], env);
    } else if (operator instanceof MyFunction) {
      let funcArgs = grammarTree.children.slice(1).map(item => evalSystem(item, env));
      return evalMyFunction(operator, funcArgs, env);
    } else {
      let funcArgs = grammarTree.children.slice(1).map(item => evalSystem(item, env));
      return operator.apply(null, funcArgs);
    }

  } else {
    console.warn('语法树为空，跳过执行。');
  }
}

function evalMyFunction(fn, binds, env) {
  if (fn instanceof MyFunction) {
    let fnEnv = new Env(env);
    binds.forEach((val, index) => {
      if (fn.params.children[index]) {
        fnEnv.register(fn.params.children[index].getVal(), val);
      }
    });
    return executeGrammarTree(fn.body, fnEnv);

  } else {
    throw new Error('不能对一个非自定义函数求值');
  }
}

module.exports = {
  executeGrammarTree
};

