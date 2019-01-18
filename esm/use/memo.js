import {diff, empty, setup, stacked, unstacked, uid} from '../core.js';

const id = uid();

setup.push(stacked(id));

export default (callback, refs) => {
  const {i, stack, unknown} = unstacked(id);
  const comp = refs || empty;
  if (unknown)
    create(stack, -1, callback, comp);
  const {filter, value, fn, inputs} = stack[i];
  return (filter ? diff(inputs, comp) : (callback !== fn)) ?
          create(stack, i, callback, comp) :
          value;
};

const create = (stack, i, fn, inputs) => {
  const info = {
    filter: inputs !== empty,
    value: null,
    fn,
    inputs
  };
  if (i < 0)
    stack.push(info);
  else
    stack[i] = info;
  info.value = fn();
  return info.value;
};
