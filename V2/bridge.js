const inputEle = document.getElementById('input');
const outputEle = document.getElementById('output');

function run() {
  try {
    outputEle.innerHTML = compile.myEval(inputEle.innerText)
  } catch (e) {
    outputEle.innerHTML = e.message;
  } finally {
  }

}

function clear() {
  inputEle.innerHTML = '';
  outputEle.innerHTML = '';
}

function toggleClass(ele, className, isClear = false) {
  let classLists = ele.classList;
  if (classLists.contains(className) || isClear) {
    classLists.remove(className);
  } else {
    classLists.add(className);
  }
}