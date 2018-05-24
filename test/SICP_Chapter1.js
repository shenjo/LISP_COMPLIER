import test from 'ava'
import {myEval,clearGlobalEnv} from '../V2'

const checkWarper = t => {
  return (expression, expected) => {
    t.deepEqual(myEval(expression), expected)
  };
};


test('章节1.1', t => {
  const check = checkWarper(t);
  clearGlobalEnv();
  check('486', 486);
  check('(+ 137 349)', 486);
  check('(- 1000 334)', 666);
  check('(* 5 99)',495);
  check('(/ 10 5)',2);
  check('(+ 2.7 10)',12.7);
  check('(+ 21 35 12 7)',75);
  check('(* 25 4 12)',1200);
  check('(+ (* 3 5) (- 10 6))',19);
  check('(+ (* 3 (+ (* 2 4) (+ 3 5))) (+ (- 10 7) 6))',57);
  myEval('(define size 2)');
  check('size',2);
  check('(* 5 size)',10);
  myEval('(define pi 3.14159)');
  myEval('(define radius 10)');
  check('(* pi (* radius radius))',314.159);
  myEval('(define circumference (* 2 pi radius))');
  check('circumference',62.8318);
  myEval('(define (square x) (* x x))');
  check('(square 21)',441);
  check('(square (+ 2 5))',49);
  myEval('(define (sum-of-squares x y ) (+ (square x) (square y)))');
  check('(sum-of-squares 3 4)',25);
  myEval('(define (f a ) (sum-of-squares (+ a 1) (* a 2)))');
  check('(f 5)',136);
});