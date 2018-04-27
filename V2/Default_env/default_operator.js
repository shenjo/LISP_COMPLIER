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

module.exports = {
  add,subtract,multi,divide
}