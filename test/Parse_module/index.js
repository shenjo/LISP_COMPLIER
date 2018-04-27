import test from 'ava';
import {preHandleInput, parseToWords, specialHandleWord, convertWordToNode} from '../../V2/Parse_module/index'
import {ALL_CONSTANTS} from '../../V2/Comon/Constans'

test('preHandleInput 输入预处理', t => {
  let inputs = ['', null, undefined, '    ', ' a ', ' a     b   eee'];
  let expects = ['', '', '', '', 'a', 'a b eee'];

  inputs.forEach((input, index) => {
    t.true(expects[index] === preHandleInput(input))
  });
});

test('parseToWords 转化输入成一个个的词', t => {
  let testObj = [];
  testObj.push({input: ' (  +  1  2  (+  2  3 )  ) ', expected: ['(', '+', '1', '2', '(+', '2', '3', ')', ')']});
  testObj.push({
    input: ' (((((  +777  1  2  (+  2  3 )  ) ',
    expected: ['(((((', '+777', '1', '2', '(+', '2', '3', ')', ')']
  });
  testObj.forEach(test => {
    t.deepEqual(parseToWords(test.input), test.expected);
  });
});

test('specialHandleWord 讲一个单词按照（）切分', t => {
  let testObj = [];
  testObj.push({input: '(((', expected: ['(', '(', '(']});
  testObj.push({input: '(aa))ss))bb((ww', expected: ['(', 'aa', ')', ')', 'ss', ')', ')', 'bb', '(', '(', 'ww']});
  testObj.forEach(test => {
    t.deepEqual(specialHandleWord(test.input), test.expected);
  });
});

test('convertWordToNode 单词转化为节点', t => {
  function test(node, expectedType, expectedVal) {
    t.true(node.getType() === expectedType);
    t.true(node.getVal() === expectedVal);
  }

  let word = '\'abc';
  test(convertWordToNode(word), ALL_CONSTANTS.STRING_TYPE, word);
  word = 'abc';
  test(convertWordToNode(word), ALL_CONSTANTS.VARIABLE_TYPE, word);
  word = '123';
  test(convertWordToNode(word), ALL_CONSTANTS.NUMBER_TYPE, 123);
  word = '(';
  test(convertWordToNode(word), ALL_CONSTANTS.LEFT_BRACKETS_TYPE, word);
  word = ')';
  test(convertWordToNode(word), ALL_CONSTANTS.RIGHT_BRACKETS_TYPE, word)
});