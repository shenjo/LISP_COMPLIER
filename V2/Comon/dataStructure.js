class Node {
  constructor(type, val) {
    this.type = type;
    this.val = val;
  }

  getType() {
    return this.type;
  }

  getVal() {
    return this.val;
  }

}

class Tree {
  constructor() {
    this.children = null;
  }

  append(child) {
    if (!this.children) {
      this.children = [];
    }
    this.children.push(child);
  }

  isEmpty() {
    return this.children === null;
  }
}


module.exports = {
  Node,
  Tree
}