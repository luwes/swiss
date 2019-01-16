'use strict';
const {setup, stacked, unstacked, uid} = require('../core.js');

const all = new WeakMap;
const id = uid();

setup.push(stacked(id));

const createContext = () => {
  const context = {
    value: void 0,
    provide
  };
  all.set(context, []);
  return context;
};
exports.createContext = createContext;

const useContext = context => {
  const {i, stack, unknown, update} = unstacked(id);
  if (unknown) {
    all.get(context).push(update);
    stack.push(context);
  }
  return stack[i].value;
};
exports.useContext = useContext;

function provide(value) {
  if (this.value !== value) {
    this.value = value;
    for (let arr = all.get(this), {length} = arr, i = 0; i < length; i++)
      arr[i]();
  }
}
