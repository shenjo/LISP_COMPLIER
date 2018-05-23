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
  let env = initDefaultEnv();
  let trees = convertInputToGrammarTree(input);
  let result = [];
  trees.forEach(tree => {
    result.push(executeGrammarTree(tree, env));
  });
  return result[result.length - 1];
}
module.exports = myEval;
