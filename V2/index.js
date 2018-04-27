const {convertInputToGrammarTree} = require('./Parse_module'),
  {executeGrammarTree} = require('./Execute_module'),
  {Env} = require('./Default_env'),
  operaters = require('./Default_env/default_operator');

function initDefaultEnv() {
  let env = new Env();
  env.register('+', operaters.add);
  env.register('-', operaters.subtract);
  env.register('*', operaters.multi);
  env.register('/', operaters.divide);
  return env;
}

function myEval(input) {
  let env = initDefaultEnv();
  let trees = convertInputToGrammarTree(input);
  let result = [];
  trees.forEach(tree => {
    result.push(executeGrammarTree(tree,env));
  });
  return result;
}

let result = myEval(' (  /  1  2  (+  2  3 )  ) ');
console.log(result[result.length-1]);
