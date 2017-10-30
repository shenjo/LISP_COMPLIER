/**
 * Created by SHENJO on 10/30/2017.
 */


class Grammar_Word {
  constructor (item) {
    this.word = item;
  }

  getType(){
    return this.word[0];
  }

  getValue(){
    return this.word[1];
  }
}

class Grammar_Tree {
  constructor () {

  }
}

export default {
  Grammar_Word, Grammar_Tree
};
