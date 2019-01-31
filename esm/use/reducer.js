import {$, empty, setup, stacked, unstacked, uid} from '../core.js';

const id = uid();

setup.push(stacked(id));

export default (reducer, value) => {
  const {i, stack, unknown, update} = unstacked(id);
  if (unknown) {
    const info = [null, action => {
      value = reducer(value, action);
      info[0] = value;
      update();
    }];
    stack.push(info);
    info[0] = $(value, empty);
  }
  return stack[i];
};
