'use strict';
const {$, setup, stacked, unstacked, uid} = require('../core.js');

const id = uid();

setup.push(stacked(id));

Object.defineProperty(exports, '__esModule', {value: true}).default = value => {
  const {i, stack, unknown} = unstacked(id);
  if (unknown)
    stack.push({current: $(value)});
  return stack[i];
};
