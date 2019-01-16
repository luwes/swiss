import {$, setup, stacked, unstacked, uid} from '../core.js';

const id = uid();

setup.push(stacked(id));

export default value => {
  const {i, stack, unknown} = unstacked(id);
  if (unknown)
    stack.push({current: $(value)});
  return stack[i];
};
