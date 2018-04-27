import test from 'ava'
import myEval from '../V2'

test('不合法的表达式测试', t => {
  const check = (expression, msg) => {
    let error = t.throws(() => {
      myEval(expression);
    }, Error);
    msg ? t.is(error.message, msg) : t.pass();
  };
  check('(t 5)', '操作符必须是已定义的函数');
  check('(5 5)', '操作符必须是已定义的函数');
  check('(\'w 5)', '操作符必须是已定义的函数');
  check('w (', '表达式应该以(开头');
  check('2 (', '表达式应该以(开头');
  check('(((()))', '左括号和右括号不匹配');
});

test('单值表达式测试', t => {
  t.true(myEval('(5)') === 5);
  t.true(myEval('(define a 2) (a)') === 2);
});

test('加减乘除测试', t => {
  t.true(myEval('(+ 2 3)') === 5);
  t.true(myEval('(- 2 3)') === -1);
  t.true(myEval('(* 2 3)') === 6);
  t.true(myEval('(/ 4 2)') === 2);
  t.true(myEval('(/ 3 2)') === 1.5);
});

test('嵌套的加减乘除测试', t => {
  t.true(myEval('(+ 2 3 (+ 2 3) (- 4 10 ) (* 2 5) (/ 10 10) )') === 15);
  t.true(myEval('(+ 2 3 (+ 2 3) (- 4 10 ) (* 2 5) (/ 10 10) ) (+ 5 9)') === 14);
});

test('lambda表达式求值', t => {
  t.true(myEval('(( lambda (x y z) (+ x y z)) 5 10 15)') === 30);
  t.true(myEval('(( lambda (x y) (+ x y)) 5 10 15)') === 15);
});

test('define表达式求值', t => {
  t.true(myEval('(define a 2) (+ a 2)') === 4)
});

test('define 与lambda结合', t => {
  t.true(myEval('(define a (lambda (x y) ( * x y))) (a 8 9)') === 72)
});