const {convertInputToGrammarTree,parseToWords,convertWordToNode} = require('./Parse_module'),
  {executeGrammarTree} = require('./Execute_module'),
  {Env} = require('./Default_env'),
  operaters = require('./Default_env/default_operator');

const {ALL_CONSTANTS} = require('./Comon/Constans');
const {NUMBER_TYPE, VARIABLE_TYPE} = ALL_CONSTANTS;


let env;

function clearGlobalEnv(){
  env = null;
}

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

function myEval(input) {
  env = env ? env : initDefaultEnv();
  const words = parseToWords(input);
  if(words.length === 1 && !/[(|)]/.test(words[0])){
    const node = convertWordToNode(words[0]);
    if(node.type===NUMBER_TYPE){
      return node.getVal();
    }else if(node.type === VARIABLE_TYPE){
      return env.find(node.getVal()) || `${node.getVal()}未定义`
    }
  }
  let trees = convertInputToGrammarTree(input);
  let result = [];
  trees.forEach(tree => {
    result.push(executeGrammarTree(tree, env));
  });
  return result[result.length - 1];
}

module.exports = {myEval,clearGlobalEnv};
