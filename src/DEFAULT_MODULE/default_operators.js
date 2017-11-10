/**
 * Created by SHENJO on 10/30/2017.
 */

function addition (nums, env) {
  let sum = 0;
  for (let val of nums) {
    sum += parseFloat(val);
  }
  if (isNaN(sum)) {
    throw new Error('addition cannot receive non-number.');
  }
  return sum;
}

function subtraction (subs, env) {
  let result = parseFloat(subs[0]) * 2;
  for (let val of subs) {
    result -= parseFloat(val);
  }
  if (isNaN(result)) {
    throw new Error('subtraction cannot receive non-number.');
  }
  return result;
}

function multiplication (muls, env) {
  let result = 1;
  for (let val of muls) {
    result *= parseFloat(val);
  }
  if (isNaN(result)) {
    throw new Error('subtraction cannot receive non-number.');
  }
  return result;
}

function division (divs, env) {
  let length = divs.length;
  if (length !== 2) {
    throw new Error('division can only receive two args.');
  }
  let dividend = divs[0];
  let divisor = divs[1];
  if (divisor === 0) {
    throw new Error('divisor cannot be 0.');
  }
  let result = dividend / divisor;
  if (isNaN(result)) {
    throw new Error('division cannot receive non-number.');
  }
  return result

}

function define (args, env) {
  let length = args.length;
  if (length !== 2) {
    throw new Error('define can only receive two args.');
  }
  let name = args[0];
  let value = args[1];
  env.register(name, value);
  return `${name} defined.`;
}


export default {
  addition,
  subtraction,
  multiplication,
  division,
  define
}
