/**
 * Created by SHENJO on 10/30/2017.
 */


import Env from './DEFAULT_MODULE/default_env';
import Opers from './DEFAULT_MODULE/default_operators';


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