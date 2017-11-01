/**
 * Created by SHENJO on 10/30/2017.
 */

import Grammar from './Grammar';
import TYPES from 'constants';

let Grammar_Word = Grammar.Grammar_Word;
let Grammar_Tree = Grammar.Grammar_Tree;
class Parse_Content {
  constructor (content) {
    this.content = content;
    this.length = content.length;
    this.index = 0;
  }

  parse () {
    let { words, length } = this.parseToWords();
    return Parse_Content.parseToTree(words, length);
  }

  parseToWords () {
    let words = [];
    while (this.index < this.length) {
      let word = this.findGrammarWord();
      words.push(word)
    }
    let length = words.length;
    return { words, length };
  }

  static parseToTree (words, length) {
    let trees = [], start = 0;
    while (start < length) {
      if (words[start].getType() === TYPES.LEFT_BRACKETS_TYPE) {
        let result = Parse_Content.generateOneTree(words, start++);
        trees.push(result.tree);
        start = result.start;
      } else {
        console.log('unexpected.');
      }
    }
    return trees;
  }

  static generateOneTree (words, index) {
    let tree = new Grammar_Tree();
    while (words[index].getType() !== TYPES.RIGHT_BRACKETS_TYPE) {
      if (words[index].getType() === TYPES.LEFT_BRACKETS_TYPE) {
        let result = Parse_Content.generateOneTree(words.index++);
        tree.append(result.tree);
        index = result.index;
      } else {
        tree.append(words[index]);
        index++;
      }

    }
    return { tree, index };
  }

  findGrammarWord () {
    this.cleanSpace();
    if (this.index >= this.length) {
      return new Grammar_Word([TYPES.END, -1]);
    }
    while (this.index < this.length) {
      let currentChar = this.content[this.index];
      if (currentChar === TYPES.LEFT_BRACKETS_VALUE) {
        this.index++;
        return new Grammar_Word([TYPES.LEFT_BRACKETS_TYPE, TYPES.LEFT_BRACKETS_VALUE]);
      } else if (currentChar === TYPES.RIGHT_BRACKETS_VALUE) {
        this.index++;
        return new Grammar_Word([TYPES.RIGHT_BRACKETS_TYPE, TYPES.RIGHT_BRACKETS_VALUE]);
      } else {
        let item = '';
        while (this.index < this.length) {
          let char = this.content[this.index];
          if (Parse_Content.isWhiteSpace(char) || Parse_Content.isLeftBrackets(char) || Parse_Content.isRightBrackets(char)) {
            if (item.startsWith('\'')) {
              return new Grammar_Word([TYPES.STRING, item]);
            } else if (parseFloat(item) instanceof Number) {
              return new Grammar_Word([TYPES.NUMBER, parseFloat(item)]);
            } else {
              return new Grammar_Word([TYPES.VARIABLE, item]);
            }
          } else {
            item += char;
            this.index++;
          }
        }

      }
    }
  }

  cleanSpace () {
    while (this.index < this.length && Parse_Content.isWhiteSpace(this.content[this.index])) {
      this.index++;
    }
  }

  static isWhiteSpace (char) {
    const regex = /\s/;
    return regex.test(char);
  }

  static isLeftBrackets (char) {
    return char === '(';
  }

  static isRightBrackets (char) {
    return char === ')';
  }

}

export default Parse_Content;


// let test = new Parse_Content('(+ 5 3)');
//
// test.parse();