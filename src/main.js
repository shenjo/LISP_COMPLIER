/**
 * Created by SHENJO on 10/30/2017.
 */


import Env from './DEFAULT_MODULE/default_env';
import Opers from './DEFAULT_MODULE/default_operators';
import Parse_Content from './PARSE_MODULE/parse';
import execute from './EXECUTE_MODULE/excetutor';


function setupDefaultEnv (env) {
  env.register('+',Opers.addition);
  env.register('-',Opers.subtraction);
  env.register('*',Opers.multiplication);
  env.register('/',Opers.division);
}

function init(){
  let Global_Env = new Env();
  setupDefaultEnv(Global_Env);
  return Global_Env;
}


function test(){
  let testCase = '(+ 5 3 (+ 4 9) (/ 4 2) (- 4 2))';
  let Global_Env = init();
  let parser = new Parse_Content(testCase);
  let grammarTrees = parser.parse();
  for(let tree of grammarTrees){
    console.log(execute(tree,Global_Env));
  }
}

test();