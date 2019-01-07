import {$, current, setup, stacked, uid} from '../core.js';

const id = uid();

setup.push(stacked(id));

export default (reducer, value) => {
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
