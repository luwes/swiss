'use strict';
const {$, current, setup, stacked, uid} = require('../core.js');

const id = uid();

setup.push(stacked(id));

Object.defineProperty(exports, '__esModule', {value: true}).default = (value) => {
  const {[id]: state} = current();
  const {i, stack} = state;
  state.i = i < stack.length ? (i + 1) : stack.push({current: $(value)});
  return stack[i];
};
