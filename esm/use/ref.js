import {$, current, setup, stacked, uid} from '../core.js';

const id = uid();

setup.push(stacked(id));

export default value => {
  const {[id]: state} = current();
  const {i, stack} = state;
  state.i = i < stack.length ? (i + 1) : stack.push({current: $(value)});
  return stack[i];
};
