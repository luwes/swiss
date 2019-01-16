import {current, diff, empty, setup, unstacked, uid} from '../core.js';

const id = uid();

let cancel, request;

try {
  cancel = cancelAnimationFrame;
  request = requestAnimationFrame;
} catch (o_O) {
  // i.e. if you run this in NodeJS
  cancel = clearTimeout;
  request = setTimeout;
}

const create = (always, check, inputs, raf, fn) => ({
  always,
  check,
  inputs,
  raf,
  fn,
  clean: null,
  t: 0,
  update: check
});

const effect = raf => (callback, refs) => {
  const {i, stack, unknown} = unstacked(id);
  const comp = refs || empty;
  if (unknown) {
    const always = comp === empty;
    const check = always || !raf || typeof comp !== typeof effect;
    if (always || !raf || typeof comp !== typeof effect) {
      stack.push(create(always, check, comp, raf, () => {
        set(stack[i], callback());
      }));
    } else {
      current().external.push(result => refs(callback, result));
      stack.push(create(always, always, empty, raf, effect));
    }
  } else {
    const info = stack[i];
    const {check, always, inputs} = info;
    if (check && (always || diff(inputs, comp))) {
      info.inputs = comp;
      info.update = true;
    }
  }
};

const set = (info, clean) => {
  info.t = 0;
  info.clean = clean;
};

setup.push(runner => {
  const stack = [];
  const state = {i: 0, stack};
  runner[id] = state;
  const reset = () => {
    state.i = 0;
    for (let {length} = stack, i = 0; i < length; i++) {
      const {check, clean, raf, t} = stack[i];
      if (check) {
        if (raf && t)
          cancel(t);
        else if (clean)
          clean();
        set(stack[i], null);
      }
    }
  };
  runner.reset.push(reset);
  runner.before.push(reset);
  runner.after.push(() => {
    for (let {length} = stack, i = 0; i < length; i++) {
      const {fn, raf, update} = stack[i];
      if (update) {
        stack[i].update = false;
        if (raf)
          stack[i].t = request(fn);
        else
          fn();
      }
    }
  });
});

export const useEffect = effect(true);
export const useLayoutEffect = effect(false);
