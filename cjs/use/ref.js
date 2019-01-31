'use strict';
const {$, empty, setup, stacked, unstacked, uid} = require('../core.js');

const id = uid();

setup.push(stacked(id));

Object.defineProperty(exports, '__esModule', {value: true}).default = value => {
  const {i, stack, unknown} = unstacked(id);
  if (unknown) {
    const info = {current: null};
    stack.push(info);
    info.current = $(value, empty);
  }
  return stack[i];
};
