const {MyFunction} = require('./MyFunction');

const add = (...arg) => {
  if (!arg || arg.length < 2) {
    throw new Error('+必须还有至少两个参数');
  }
  return arg.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  });
};

const subtract = (...arg) => {
  if (!arg || arg.length < 2) {
    throw new Error('-必须还有至少两个参数');
  }
  if (arg.some(isNaN)) {
    throw new Error('-的参数必须是数字类型');
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

module.exports = {
  add, subtract, multi, divide, lambda, define
};