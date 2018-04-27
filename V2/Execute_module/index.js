const {Node, Tree} = require('../Comon/dataStructure');
const {isNumber, isString, isVariable} = require('../Comon/util');

function evalSystem(expression, env) {
  if (expression instanceof Tree) {
    return executeGrammarTree(expression,env)
  } else if (expression instanceof Node) {
    if (isNumber(expression) || isString(expression)) {
      return expression.getVal();
    } else if (isVariable(expression)) {
      return env.find(expression.getVal());
    }
  }
}

function executeGrammarTree(grammarTree, env) {
  if (!grammarTree.isEmpty()) {
    let operator = evalSystem(grammarTree.children[0], env);
    if (typeof  operator !== 'function') {
      throw new Error('操作符必须是已定义的函数');
    }
    let funcArgs = grammarTree.children.slice(1).map(item => evalSystem(item, env));
    return operator.apply(null, funcArgs);
  } else {
    console.warn('语法树为空，跳过执行。');
  }


}

module.exports = {
  executeGrammarTree
}

