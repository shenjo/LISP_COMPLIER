/**
 * Created by SHENJO on 11/2/2017.
 */
import Grammar from '../PARSE_MODULE/Grammar';

const Grammar_Tree = Grammar.Grammar_Tree;
const Grammar_Word = Grammar.Grammar_Word;


function execute (grammars, env) {
  var getFunctionArguments = function(grammarTree) {
    let result = [];
    for (let i = 1, lenth = grammarTree.getLength(); i < length; i++) {
      let itemValue = execute(grammarTree[i], env);
    }
  };
  let result;
  for (let grammar of grammars) {
    if (grammar instanceof Grammar_Tree) {
      let oper = grammar.getCallableChild();
      let func = env.find(oper.getValue());
      if (typeof func === 'function') {
        result = func(getFunctionArguments(grammar), env);
      }
    }
  }
  return result;

}

export default execute;



