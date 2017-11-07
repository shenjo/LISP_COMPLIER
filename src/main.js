/**
 * Created by SHENJO on 10/30/2017.
 */


import Env from './DEFAULT_MODULE/default_env';
import Opers from './DEFAULT_MODULE/default_operators';
import Parse_Content from './PARSE_MODULE/parse';
import execute from './EXECUTE_MODULE/excetutor';


function setupDefaultEnv(env) {
	env.register('+', Opers.addition);
	env.register('-', Opers.subtraction);
	env.register('*', Opers.multiplication);
	env.register('/', Opers.division);
}

function init() {
	let Global_Env = new Env();
	setupDefaultEnv(Global_Env);
	return Global_Env;
}


function myEval(content) {
	let Global_Env = init(),result;
	let parser = new Parse_Content(content);
	let grammarTrees = parser.parse();
	for (let tree of grammarTrees) {
		result = execute(tree, Global_Env);
		console.log(result);
	}
	return result;
}

const app = new Vue({
		el: '#app',
		data: {
			message: 'Hello Vue!',
			result: ''
		},
		methods: {
			translate: function () {
				this.result = '';
				try {
					this.result = myEval(this.message);
				} catch (err) {
					console.log(err);
				}
			}
		}
	})
;


