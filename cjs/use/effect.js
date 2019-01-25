'use strict';
const {current, diff, empty, setup, unstacked, uid} = require('../core.js');

const id = uid();

let cancel, request;

try {
  cancel = cancelAnimationFrame;
  request = requestAnimationFrame;
} catch (o_O) {
  cancel = clearTimeout;
  request = setTimeout;
}

const create = (always, check, inputs, raf, cb, stack, i) => {
  const info = {
    always,
    cb,
    check,
    clean: null,
    inputs,
    raf,
    t: 0,
    update: check,
    fn: () => {
      set(stack[i], info.cb());
    }
  };
  return info;
};

const effect = raf => (cb, refs) => {
  const {i, stack, unknown} = unstacked(id);
  const comp = refs || empty;
  if (unknown) {
    const always = comp === empty;
    const check = always || !raf || typeof comp !== typeof effect;
    if (always || !raf || typeof comp !== typeof effect) {
      stack.push(create(always, check, comp, raf, cb, stack, i));
    } else {
      current().external.push(result => refs(cb, result));
      stack.push(create(always, always, empty, raf, effect, stack, i));
    }
  } else {
    const info = stack[i];
    const {check, always, inputs} = info;
    if (check && (always || diff(inputs, comp))) {
      info.cb = cb;
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
  const drop = (current, clean, raf, t) => {
    if (raf && t)
      cancel(t);
    else if (clean)
      clean();
    set(current, null);
  };
  runner[id] = state;
  runner.before.push(() => {
    state.i = 0;
  });
  runner.reset.push(() => {
    state.i = 0;
    for (let {length} = stack, i = 0; i < length; i++) {
      const current = stack[i];
      const {check, clean, raf, t} = current;
      if (check)
        drop(current, clean, raf, t);
    }
  });
  runner.after.push(() => {
    for (let {length} = stack, i = 0; i < length; i++) {
      const current = stack[i];
      const {check, clean, fn, raf, t, update} = current;
      if (check && update) {
        current.update = false;
        drop(current, clean, raf, t);
        if (raf)
          current.t = request(fn);
        else
          fn();
      }
    }
  });
});

const useEffect = effect(true);
exports.useEffect = useEffect;
const useLayoutEffect = effect(false);
exports.useLayoutEffect = useLayoutEffect;
