const {MyFunction} = require('./MyFunction');
const {evalSystem} = require('../Execute_module')

const add = (...arg) => {
  if (!arg || arg.length < 2) {
    throw new Error('+必须还有至少两个参数');
  }
  return arg.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  });
};

const subtract = (...arg) => {
  if (!arg || arg.length < 0) {
    throw new Error('-必须还有至少一个参数');
  }
  if (arg.some(isNaN)) {
    throw new Error('-的参数必须是数字类型');
  }
  if(arg.length === 1){
    return 0 - arg[0];
  }
  return arg.reduce((previousValue, currentValue) => {
    return previousValue - currentValue;
  });
};

const multi = (...arg) => {
  if (!arg || arg.length < 2) {
    throw new Error('*必须还有至少两个参数');
  }
  if (arg.some(isNaN)) {
    throw new Error('*的参数必须是数字类型');
  }
  return arg.reduce((previousValue, currentValue) => {
    return previousValue * currentValue;
  });
};

const divide = (...arg) => {
  if (!arg || arg.length < 2) {
    throw new Error('/必须还有至少两个参数');
  }
  if (arg.some(isNaN)) {
    throw new Error('/的参数必须是数字类型');
  }
  return arg.reduce((previousValue, currentValue) => {
    return previousValue / currentValue;
  });
};

const lambda = args => {
  if (!args || args.length < 2) {
    throw new Error('lambda必须还有至少两个参数');
  }
  return new MyFunction(args[0], args[1]);
};

const define = (args, env) => {
  if (!args || args.length < 2) {
    throw new Error('lambda必须还有至少两个参数');
  }
  let key = args[0];
  let val = args[1];
  env.register(key, val);
};

const myIf = (...args) => {
  if (!args || args.length !== 3) {
    throw new Error('if必须是三个参数(condition,trueExpression,falseExpression)');
  }
  let condition = args[0];
  if (condition) {
    return args[1];
  } else {
    return args[2];
  }
};

const greaterThen = (...args) => {
  if (!args || args.length !== 2) {
    throw new Error(`>必须是2个参数`);
  }
  return args[0] > args[1];
};

const greaterAndEqualsThen = (...args) => {
  if (!args || args.length !== 2) {
    throw new Error(`>=必须是2个参数`);
  }
  return args[0] >= args[1];
};

const lessThen = (...args) => {
  if (!args || args.length !== 2) {
    throw new Error(`<必须是2个参数`);
  }
  return args[0] < args[1];
};

const lessAndEqualsThen = (...args) => {
  if (!args || args.length !== 2) {
    throw new Error(`<=必须是2个参数`);
  }
  return args[0] <= args[1];
};

const cond = ()=>{};

const equals = (...args) => {
  if (!args || args.length !== 2) {
    throw new Error(`=必须是2个参数`);
  }
  return args[0] === args[1];
};

const and = (env,...args) => {
  if (!args || args.length < 2) {
    throw new Error(`and至少要个参数`);
  }

  let result = false;
  for(let [index,cond] of args.entries()){
    const val = evalSystem(cond,env);
    if(!Boolean(val)){
      break;
    }
    if(index === args.length-1){
      result = val;
    }
  }
  return result;
};
and.lazy = true;

const or = (env,...args) => {
  if (!args || args.length < 2) {
    throw new Error(`or至少要个参数`);
  }
  let result = false;
  for(let cond of args){
    const val = evalSystem(cond,env);
    if(Boolean(val)){
      result = val;
      break;
    }
  }
  return result;
};
or.lazy = true;

const not = (env,...args) => {
  if (!args || args.length !== 1) {
    throw new Error(`or接收一个参数`);
  }
  return !Boolean(evalSystem(args[0],env));
};
not.lazy = true;




module.exports = {
  add, subtract, multi, divide, lambda, define, myIf, greaterAndEqualsThen, greaterThen, lessAndEqualsThen, lessThen,cond,equals,and,or,not
};