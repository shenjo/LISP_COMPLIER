/**
 * Created by SHENJO on 10/30/2017.
 */


class Grammar_Word {
  constructor (item) {
    this.word = item;
  }

  getType () {
    return this.word[0];
  }

  getValue () {
    return this.word[1];
  }
}

class Grammar_Tree {
  constructor () {
    this.child = null;
  }

  append (child) {
    if (this.child === null) {
      this.child = [];
    }
    this.child.push(child);
  }

  getLength(){
    return this.child.length;
  }

  getCallableChild(){
    return this.child[0];
  }
}

export default {
  Grammar_Word, Grammar_Tree
};
