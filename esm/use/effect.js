import {diff, empty, setup, stacked, unstacked, uid} from '../core.js';

const id = uid();

const effect = raf => (callback, refs) => {
  const {i, stack, unknown} = unstacked(id);
  const comp = refs || empty;
  if (unknown) {
    const always = comp === empty;
    const check = !raf || 0 < comp.length || always;
    if (!check) {
      // setup observer
    }
    stack.push({
      always,
      check,
      clean: null,
      fn: () => set(stack[i], callback()),
      inputs: comp,
      raf,
      t: 0,
      update: check
    });
  } else {
    const info = stack[i];
    const {always, check, inputs} = info;
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
  stacked(id)(runner);
  const reset = () => {
    const {stack} = runner[id];
    for (let i = 0; i < stack.length; i++) {
      const {clean, raf, t} = stack[i];
      if (raf && t)
        cancelAnimationFrame(t);
      else if (clean)
        clean();
      set(stack[i], null);
    }
  };
  runner.reset.push(reset);
  runner.before.push(reset);
  runner.after.push(() => {
    const {stack} = runner[id];
    for (let i = 0; i < stack.length; i++) {
      const {fn, raf, update} = stack[i];
      if (update) {
        if (raf)
          stack[i].t = requestAnimationFrame(fn);
        else
          stack[i].clean = fn();
      }
    }
  });
});

export const useEffect = effect(true);
export const useLayoutEffect = effect(false);
