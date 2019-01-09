import {$, setup, stacked, unstacked, uid} from '../core.js';

const id = uid();

setup.push(stacked(id));

export default (reducer, value) => {
  const {i, stack, unknown, update} = unstacked(id);
  if (unknown)
    stack.push([
      $(value),
      action => {
        value = reducer(value, action);
        pair[0] = value;
        update();
      }
    ]);
  const pair = stack[i];
  return pair;
};
