/**
 * Created by SHENJO on 10/30/2017.
 */


import Env from './DEFAULT_MODULE/default_env';
import Opers from './DEFAULT_MODULE/default_operators';
import Parse_Content from './PARSE_MODULE/parse';


function setupDefaultEnv (env) {
  env.register('+',Opers.addition);
  env.register('-',Opers.subtraction);
  env.register('*',Opers.multiplication);
  env.register('/',Opers.division);
}

function init(){
  let Global_Env = new Env();
  setupDefaultEnv(Global_Env);

}


function test(){
  debugger;
  let testCase = '(+ 5 3)';
  init();
  let parser = new Parse_Content(testCase);
  let grammarTrees = parser.parse();
  console.log(grammarTrees);
  debugger;
  console.log(1)
}

test();