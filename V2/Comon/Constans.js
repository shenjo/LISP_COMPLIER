const ALL_CONSTANTS = {
  LEFT_BRACKETS: '(',
  LEFT_BRACKETS_TYPE: 'left_brackets',
  RIGHT_BRACKETS: ')',
  RIGHT_BRACKETS_TYPE: 'right_brackets',
  STRING_TYPE:'\'',
  NUMBER_TYPE:'number_type',
  VARIABLE_TYPE:'variable_type',
  LAMBDA:'lambda',
  CONDITION:'cond'
};

const curry = (fn) => {
  const arity = fn.length;
  let curriedFn = (...args) => {
    if (args.length >= arity) {
      return fn.apply(null, args);
    } else {
      return (...anotherArgs) => {
        return curriedFn.apply(null, args.concat(anotherArgs))
      };
    }
  };
  return curriedFn;
};

const compose = (...fns) => {
  const _length = fns.length;
  return (...args) => {
    let next_args = null;
    for (let i = _length; --i >= 0;) {
      const fn = fns[i];
      let fnArg = next_args ? next_args : args;
      let currentArgs = fn.length ? fnArg.slice(0, fn.length) : fnArg;
      next_args = args.slice(fn.length || 1);
      let result = fn.call(null, ...currentArgs);
      next_args.unshift(result);
    }
    return next_args[0];
  }
};

const split = curry((what, str) => {
  return str.split(what);
});

const map = curry((f, arr) => {
  return arr.map(f);
});

const reduce = curry((f, arr) => {
  return arr.reduce(f);
});

const concat = curry((arr1,arr2)=>{
  return arr1.concat(arr2);
});

const flatten = arr =>{
  return arr.reduce((pre,curr)=> pre.concat(curr));
};

const forEach = curry((arr,f)=>{
  return arr.forEach(f);
});

module.exports =  {
  compose,curry,ALL_CONSTANTS,split,map,reduce,concat,flatten
};