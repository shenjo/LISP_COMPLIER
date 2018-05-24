const {ALL_CONSTANTS} = require('../Comon/Constans');
const {Tree, Node} = require('../Comon/dataStructure');
module.exports = grammarTree => {
  let defineWhat = grammarTree.children[1], name, body;
  if (defineWhat instanceof Tree) {
    name = defineWhat.children[0].getVal();
    body = new Tree();
    body.append(new Node(ALL_CONSTANTS.VARIABLE_TYPE, ALL_CONSTANTS.LAMBDA));
    let params = new Tree();
    defineWhat.children.slice(1).forEach(child => params.append(child));
    body.append(params);
    body.append(grammarTree.children[2]);
  } else {
    name = defineWhat.getVal();
    body = grammarTree.children[2];
  }
  return {name, body};
};
