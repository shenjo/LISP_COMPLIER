/**
 * Created by SHENJO on 10/30/2017.
 */

import Grammar from './Grammar';

let Grammar_Word = Grammar.Grammar_Word;
class Parse_Content {
	constructor(content) {
		this.content = content;
		this.length = content.length;
		this.index = 0;
	}

	parseToWords() {
		let result = [];
		while (this.index < this.length) {
			let word = this.findGrammarWord();
			result.push(word)
		}
		return result;
	}

	parseToTree(words){

	}

	findGrammarWord() {
		this.cleanSpace();
		if (this.index >= this.length) {
			return new Grammar_Word(['end', -1]);
		}
		while (this.index < this.length) {
			let currentChar = this.content[this.index];
			if (currentChar === '(') {
				this.index++;
				return new Grammar_Word(['left_bracket', '(']);
			} else if (currentChar === ')') {
				this.index++;
				return new Grammar_Word(['right_bracket', ')']);
			} else {
				let item = '';
				while (this.index < this.length) {
					let char = this.content[this.index];
					if (Parse_Content.isWhiteSpace(char) || Parse_Content.isLeftBrackets(char) || Parse_Content.isRightBrackets(char)) {
						if (item.startsWith('\'')) {
							return new Grammar_Word(['string', item]);
						} else if (parseFloat(item) instanceof Number) {
							return new Grammar_Word(['number', parseFloat(item)]);
						} else {
							return new Grammar_Word(['variable', item]);
						}
					} else {
						item += char;
						this.index++;
					}
				}

			}
		}
	}

	cleanSpace() {
		while (this.index < this.length && Parse_Content.isWhiteSpace(this.content[this.index])) {
			this.index++;
		}
	}

	static isWhiteSpace(char) {
		const regex = /\s/;
		return regex.test(char);
	}

	static isLeftBrackets(char) {
		return char === '(';
	}

	static isRightBrackets(char) {
		return char === ')';
	}

}

export default Parse_Content;