import {setup, stacked, unstacked, uid} from '../core.js';

const all = new WeakMap;
const id = uid();

setup.push(stacked(id));

export const createContext = () => {
  const context = {
    value: void 0,
    provide
  };
  all.set(context, []);
  return context;
};

export const useContext = context => {
  const {i, stack, unknown, update} = unstacked(id);
  if (unknown) {
    all.get(context).push(update);
    stack.push(context);
  }
  return stack[i].value;
};

function provide(value) {
  if (this.value !== value) {
    this.value = value;
    for (let arr = all.get(this), {length} = arr, i = 0; i < length; i++)
      arr[i]();
  }
}
