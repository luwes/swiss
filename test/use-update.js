const {setup, stacked, unstacked, uid} = require('../cjs/core.js');

// create a unique identifier for this hook
const id = uid();

// add to each runner setup a new stack for this hook
setup.push(stacked(id));

// export the updater
exports.useUpdate = value => {
  const {i, stack, update, unknown} = unstacked(id);
  // if unknown, add this this hook stack any value
  // this could be also the update function itself
  // which will re-invoke the callback any time it's used
  if (unknown)
    stack.push(update);
  // return the current stack position at index `i`
  return stack[i];
};

