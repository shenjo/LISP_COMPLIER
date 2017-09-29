'use strict';
const fun = Symbol('function key');
const KEY_WORD = Symbol('key word');

const DEFAULT_ENV = {
    [fun]: {
        begin: '(',
        end: ')'
    },
    ['+'](...arg){
        // console.log('wil add ' + arg);
        let sum = 0;
        for (let val of arg) {
            sum += parseInt(val);
        }
        // console.log('result ' + sum);
        return sum;

    },
    ['-'](...arg){
        //   console.log('wil subtract ' + arg);
        let result = parseInt(arg[0]) * 2;
        for (let val of arg) {
            result -= parseInt(val);
        }
        //   console.log('result ' + result);
        return result;

    },
    ['*'](...arg){
        //    console.log('wil mul ' + arg);
        let result = 1;
        for (let val of arg) {
            result *= parseInt(val);
        }
        //    console.log('result ' + result);
        return result;
    },
    ['/'](...arg){
        //    console.log('wil division ' + arg);
        //可以修改定义使除法支持多个参数。
        let dividend = arg[0];
        let divisor = arg[1];
        return dividend / divisor;
    },
    ['='](...arg){
        if (arg.length !== 2) {
            return new Error('\'=\' needs two args');
        }
        return arg[0] === arg[1];
    },
    ['>'](...arg){
        if (arg.length !== 2) {
            return new Error('\'>\' needs two args');
        }
        return arg[0] > arg[1];
    },
    ['<'](...arg){
        if (arg.length !== 2) {
            return new Error('\'<\' needs two args');
        }
        return arg[0] < arg[1];
    },
    ['>='](...arg){
        if (arg.length !== 2) {
            return new Error('\'>=\' needs two args');
        }
        return arg[0] > arg[1] || arg[0] === arg[1];
    },
    ['<='](...arg){
        if (arg.length !== 2) {
            return new Error('\'<=\' needs two args');
        }
        return arg[0] < arg[1] || arg[0] === arg[1];
    },
    ['display'](...arg){
        return arg.length === 1 ? console.log(arg[0]) : new Error('display needs one args.');
    },
    superEnv: null
};

function parseTree(str, env = DEFAULT_ENV) {
    let result = {value: [], length: 0};
    str = str.substr(1);
    for (let i = 0; i < str.length - 1; i++) {
        if (isBlank(str[i])) {
            continue;
        }
        if (isFunctionBegin(str[i])) {
            let another = parseTree(str.substr(i));
            result.value.push(another.value);
            i += another.length;

        } else if (isFunctionEnd(str[i])) {
            result.length = i + 1;
            break;
        } else {
            let val = getSequentialVal(str.substr(i));
            result.value.push(val);
            i += val.value.length - 1;
        }
    }
    return result;
}

function myEval(str) {
    let tree = parseTree(str.trim());
    return baseEval(tree.value, DEFAULT_ENV);
}

function baseEval(statement, env) {
    if (statement instanceof Array) {
        // is expression
        let handlerName = statement[0].value;
        switch (handlerName) {
            case 'define':
                return defineFunction(statement, env);
                break;
            case 'if':
                return eval_if_expression(statement, env);
                break;
            default:
                return normalEvalFunction(statement, env);
                break;
        }
    } else {
        if (statement.type === 'number' || statement.type === 'string') {
            let value = getValueFromEnv(statement.value, env);
            return value ? value : statement.value;
        } else {
            let value = getValueFromEnv(statement.value, env);
            return value ? value : statement.value;
        }
    }
}

function normalEvalFunction(statement, env) {
    //get handler definition from env
    let handler = getValueFromEnv(statement[0].value, env);
    if (!handler) {
        return new Error(statement[0].value + ' seems not defined');
    }
    if (handler instanceof Function) {
        // is native method
        let params = statement.slice(1);
        return handler(...params.map(param=> {
            return baseEval(param, env);
        }))
    } else if (handler instanceof JoeyFunction) {
        return evalJoeyFunction(handler, statement.slice(1).map(param=> {
            return baseEval(param, env);
        }), env);
    }
}

function defineFunction(tree, env) {
    if (tree[1] instanceof Array) {
        // define function
        let name = tree[1][0].value;
        let args = tree[1].slice(1);
        env[name] = new JoeyFunction(args, tree.slice(2));
    } else {
        // define variable
        let name = tree[1].value;
        let value = baseEval(tree[2], env);
        env[name] = value;
    }
}

function evalJoeyFunction(func, args, env) {
    let newEnv = new Object();
    let index = 0;
    newEnv.superEnv = env;
    if (func.args.length !== args.length) {
        return new Error('the function needs ' + func.args.length + ', but actual given ' + args.length);
    }
    func.args.every(arg=> {
        newEnv[arg.value] = args[index++];
    });
    let body = func.body;
    for (let i = 0; i < body.length; i++) {
        let result = baseEval(body[i], newEnv);
        if (i === body.length - 1) {
            return result;
        }
    }
}

/**
 * common utils
 * @param char
 * @returns {boolean}
 */
function isFunctionBegin(char) {
    return char === DEFAULT_ENV[fun].begin;
}

function isFunctionEnd(char) {
    return char === DEFAULT_ENV[fun].end;
}

function isBlank(char) {
    return /\s/.test(char);
}

function getValueFromEnv(name, env) {
    if (name && env) {
        return env[name] ? env[name] : (getValueFromEnv(name, env.superEnv));
    }
    return null;
}
// end common utils

/**
 * parse to tree util
 * @param str
 * @returns {{}}
 */
function getSequentialVal(str) {
    let result = {};
    let val = '';
    for (let i = 0; i < str.length; i++) {
        if (isBlank(str[i]) || str[i] === DEFAULT_ENV[fun].end) {
            break;
        } else {
            val += str[i];
        }
    }
    result.value = val;
    if (val && val[0] === "'") {
        result.type = 'string';
    } else if (val && parseInt(val)) {
        result.type = 'number';
    } else {
        result.type = 'var';
    }
    return result;
}
// end parse to tree util

/*
 some native method
 */
function eval_if_expression(statement, env) {
    // if statement => (if (exp) (true_exp) (false_exp) )
    if (statement.length !== 4) {
        return new Error('if expression needs 4 args.');
    }
    if (baseEval(statement[1], env)) {
        return baseEval(statement[2], env);
    } else {
        return baseEval(statement[3], env);
    }
}

function eval_lambda_expression(statement, env) {

}




