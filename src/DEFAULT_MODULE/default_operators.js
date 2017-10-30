/**
 * Created by SHENJO on 10/30/2017.
 */

function addition (...arg) {
  let sum = 0;
  for (let val of arg) {
    sum += parseFloat(val);
  }
  if (!(sum instanceof Number)) {
    throw new Error('addition cannot receive non-number.');
  }
  return sum;
}

function subtraction (arg) {
  let result = parseFloat(arg[0]) * 2;
  for (let val of arg) {
    result -= parseFloat(val);
  }
  if (!(result instanceof Number)) {
    throw new Error('subtraction cannot receive non-number.');
  }
  return result;
}

function multiplication (arg) {
  let result = 1;
  for (let val of arg) {
    result *= parseFloat(val);
  }
  if (!(result instanceof Number)) {
    throw new Error('subtraction cannot receive non-number.');
  }
  return result;
}

function division (...arg) {
  let length = arg.length;
  if (length !== 2) {
    throw new Error('division can only receive two args.');
  }
  let dividend = arg[0];
  let divisor = arg[1];
  if (divisor === 0) {
    throw new Error('divisor cannot be 0.');
  }
  let result= dividend / divisor;
  if (!(result instanceof Number)) {
    throw new Error('division cannot receive non-number.');
  }
  return result

}


export default {
  addition,
  subtraction,
  multiplication,
  division
}
