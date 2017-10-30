/**
 * Created by SHENJO on 10/30/2017.
 */

import {Grammar_Word, Grammar_Tree} from './Grammar';


class Parse_Content {
  constructor (content) {
    this.content = content;
    this.length = content.length;
    this.index = 0;
  }

  parseToWords () {
    let result = [];
    while (this.index < this.length) {
      let word = this.findWord();
    }
  }

  findWord () {
    let word = new Grammar_Word();
    while (this.index < this.length) {
      
    }
    return word;


}

