/**
 * Created by SHENJO on 11/2/2017.
 */
import Grammar from '../PARSE_MODULE/Grammar';
import TYPES from '../PARSE_MODULE/constants';

const Grammar_Tree = Grammar.Grammar_Tree;
const Grammar_Word = Grammar.Grammar_Word;


function execute (grammar, env) {
  var getFunctionArguments = function(grammarTree) {
    let result = [];
    for (let i = 1, length = grammarTree.getLength(); i < length; i++) {
      let itemValue = execute(grammarTree.findChild(i), env);
      result.push(itemValue);
    }
    return result;
  };
  if (grammar instanceof Grammar_Tree) {
    let oper = grammar.getCallableChild();
    let func = env.find(oper.getValue());
    if (typeof func === TYPES.FUNCTION) {
      return func(getFunctionArguments(grammar), env);
    }
  } else if (grammar instanceof Grammar_Word) {
    if (grammar.getType() === TYPES.NUMBER) {
      return grammar.getValue();
    }
  }
}

export default execute;



