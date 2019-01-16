import {$, setup, stacked, unstacked, uid} from '../core.js';

const id = uid();

setup.push(stacked(id));

export default value => {
  const {i, stack, unknown} = unstacked(id);
  if (unknown) {
    const info = {current: null};
    stack.push(info);
    info.current = $(value);
  }
  return stack[i];
};
