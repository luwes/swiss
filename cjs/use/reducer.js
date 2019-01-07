'use strict';
const {$, current, setup, stacked, uid} = require('../core.js');

const id = uid();

setup.push(stacked(id));

Object.defineProperty(exports, '__esModule', {value: true}).default = (reducer, value) => {
  const {[id]: state, update} = current();
  const {i, stack} = state;
  state.i = i < stack.length ? (i + 1) : stack.push([
    $(value),
    action => {
      value = reducer(value, action);
      stack[i][0] = value;
      update();
    }
  ]);
  return stack[i];
};
