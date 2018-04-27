const {
  ALL_CONSTANTS,
  compose, curry, split, map, concat, reduce, flatten
} = require('../Comon/Constans');

const {
  LEFT_BRACKETS,
  LEFT_BRACKETS_TYPE,
  RIGHT_BRACKETS,
  RIGHT_BRACKETS_TYPE, STRING_TYPE, NUMBER_TYPE, VARIABLE_TYPE
} = ALL_CONSTANTS;

const {Node, Tree} = require('../Comon/dataStructure');
const {isLeftBrackets, isRightBrackets, checkOverFlow} = require('../Comon/util');

const preHandleInput = str => {
  let result = str && str.trim() || '';
  return result && result.replace(/\s+/g, ' ')
};

const specialHandleWord = word => {
  let result = [], cache = '';
  [...word].forEach(char => {
    if (char === LEFT_BRACKETS || char === RIGHT_BRACKETS) {
      cache ? result.push(cache) : '';
      result.push(char);
      cache = ''
    } else {
      cache += char;
    }
  });
  cache ? result.push(cache) : '';
  return result;
};

const convertWordToNode = word => {
  let type = '';
  if (word === LEFT_BRACKETS) {
    type = LEFT_BRACKETS_TYPE;
  } else if (word === RIGHT_BRACKETS) {
    type = RIGHT_BRACKETS_TYPE;
  } else if (word.startsWith(STRING_TYPE)) {
    type = STRING_TYPE;
  } else if (!isNaN(word)) {
    type = NUMBER_TYPE;
    word = Number(word);
  } else {
    type = VARIABLE_TYPE;
  }
  return new Node(type, word);

};

const parseToWords = compose(split(' '), preHandleInput);
const toNode = compose(map(convertWordToNode), specialHandleWord);

const convertInputToNodes = input => {
  let result = [];
  parseToWords(input).forEach(item => {
    result = result.concat(toNode(item))
  });
  return result;
};

const findTree = (nodes, length, index) => {
  let grammarTree = new Tree();
  while (checkOverFlow(index, length, '左括号和右括号不匹配') && !isRightBrackets(nodes[index])) {
    if (isLeftBrackets(nodes[index])) {
      let res = findTree(nodes, length, ++index);
      index = res.inx;
      grammarTree.append(res.grammarTree);
    } else {
      grammarTree.append(nodes[index++]);
    }
  }
  index++;
  return {grammarTree, inx: index};
};

const convertNodesToTree = nodes => {

  let index = 0, length = nodes.length, result = [];
  while (index < length) {
    let current = nodes[index];
    if (current.getType() === LEFT_BRACKETS_TYPE) {
      let {grammarTree, inx} = findTree(nodes, length, ++index);
      index = inx;
      result.push(grammarTree);
    } else {
      throw new Error('表达式应该以(开头');
    }
  }
  return result;
};

const convertInputToGrammarTree = compose(convertNodesToTree, convertInputToNodes);

// console.log(convertInputToGrammarTree(' (  +  1  2  (+  2  3 )  )  (+ 1 2) () )'))
exports.preHandleInput = preHandleInput;
exports.parseToWords = parseToWords;
exports.specialHandleWord = specialHandleWord;
exports.convertWordToNode = convertWordToNode;
exports.convertInputToGrammarTree = convertInputToGrammarTree;
