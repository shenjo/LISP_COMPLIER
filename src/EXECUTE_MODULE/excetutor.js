/**
 * Created by SHENJO on 11/2/2017.
 */
import Grammar from '../PARSE_MODULE/Grammar';
import TYPES from '../PARSE_MODULE/constants';

const Grammar_Tree = Grammar.Grammar_Tree;
const Grammar_Word = Grammar.Grammar_Word;


function execute (grammar, env) {
  const getFunctionArguments = function(grammarTree) {
    let result = [];
    for (let i = 1, length = grammarTree.getLength(); i < length; i++) {
      let itemValue = execute(grammarTree.findChild(i), env);
      result.push(itemValue);
    }
    return result;
  };
  if (grammar instanceof Grammar_Tree) {
    let oper = grammar.getCallableChild();

    const operType = oper.getValue();
    let func = env.find(operType);
    if (typeof func !== TYPES.FUNCTION) {
      throw new Error(`${operType} is not a function.`);
    }
    if (operType === TYPES.DEFINE) {
      const name = grammar.findChild(1).getValue();
      const value = execute(grammar.findChild(2), env);
      return func([name, value], env);
    } else if (operType === TYPES.IF) {
      const condition = execute(grammar.findChild(1), env);
      return execute(func([condition, grammar.findChild(2), grammar.findChild(3)], env), env);
    } else if (operType === TYPES.GREATER || operType === TYPES.EQUAL_GREATER || operType === TYPES.LESS || operType === TYPES.EQUAL_LESS) {
      const leftValue = execute(grammar.findChild(1), env);
      const rightValue = execute(grammar.findChild(2), env);
      return func([leftValue, rightValue], env);
    } else {
      return func(getFunctionArguments(grammar), env);
    }

  } else if (grammar instanceof Grammar_Word) {
    if (grammar.getType() === TYPES.NUMBER) {
      return grammar.getValue();
    } else if (grammar.getType() === TYPES.VARIABLE) {
      return env.find(grammar.getValue());
    }
  }
}

export default execute;



