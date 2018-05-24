const {ALL_CONSTANTS} = require('./Constans');

const isLeftBrackets = node => {
  return node.getType() === ALL_CONSTANTS.LEFT_BRACKETS_TYPE;
};

const isRightBrackets = node => {
  return node.getType() === ALL_CONSTANTS.RIGHT_BRACKETS_TYPE;
};

const isNumber = node => {
  return node.getType() === ALL_CONSTANTS.NUMBER_TYPE;
};

const isString = node => {
  return node.getType() === ALL_CONSTANTS.STRING_TYPEl
};

const isVariable = node => {
  return node.getType() === ALL_CONSTANTS.VARIABLE_TYPE;
};

const isLambdaExpression = node => {
  return node && typeof node.getVal === 'function' && node.getVal() === ALL_CONSTANTS.LAMBDA;
};

const isDefineExpression = node => {
  return node && typeof node.getVal === 'function' && node.getVal() === 'define';
};

const isMyIfExpression = node => {
  return node && typeof node.getVal === 'function' && node.getVal() === 'if';
};

const isCompareExpression = node => {
  return node && typeof node.getVal === 'function' && ['>','>=','<','<='].indexOf(node.getVal()) !== -1;
}

const checkOverFlow = (currentIndex, length, msg = 'unknown error') => {
  if (currentIndex >= length) {
    throw new Error(msg);
  }
  return true;
};

module.exports = {
  isLeftBrackets,
  isRightBrackets,
  checkOverFlow,
  isNumber,
  isString,
  isVariable,
  isLambdaExpression,
  isDefineExpression,
  isMyIfExpression,
  isCompareExpression
};