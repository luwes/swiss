'use strict';
const {diff, empty, setup, stacked, unstacked, uid} = require('../core.js');

const id = uid();

setup.push(stacked(id));

Object.defineProperty(exports, '__esModule', {value: true}).default = function (callback, refs) {
  const {i, stack, unknown} = unstacked(id);
  const comp = refs || empty;
  if (unknown)
    stack.push(create(callback, comp));
  const {filter, value, fn, inputs} = stack[i];
  return (filter ? inputs.some(diff, comp) : (callback !== fn)) ?
          (stack[i] = create(callback, comp)).value :
          value;
};

const create = (fn, inputs) => ({
  filter: inputs !== empty,
  value: fn(),
  fn,
  inputs
});
