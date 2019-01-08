let now = null;
// export const current = () => now; // not needed so far

export default fn => {
  const current = runner($);
  each(setup, current);
  return $;
  function $() {
    const prev = now;
    now = current;
    let result;
    try {
      const _ = now._;
      each(_.before, now);
      result = fn.apply(_.c = this, _.a = arguments);
      each(_.after, now);
    }
    catch (o_O) {
      console.error(o_O);
    }
    now = prev;
    return result;
  }
};


export const $ = value => typeof value === typeof $ ? value() : value;

export function diff(value, i) {
  return value !== this[i];
};

export const setup = [];

export const stacked = id => runner => {
  const state = {i: 0, stack: []};
  runner[id] = state;
  runner.on('before', () => {
    state.i = 0;
  });
};

export const unstacked = id => {
  const {[id]: state, update} = now;
  const {i, stack} = state;
  state.i++;
  return {i, stack, update, unknown: i === stack.length};
};

let id = 0;
export const uid = () => '_$' + id++;

const each = (arr, value) => {
  for (let i = 0; i < arr.length; i++)
    arr[i](value);
};

const runner = $ => {
  const _ = {
    c: null,
    a: null,
    before: [],
    after: []
  };
  return {
    _: _,
    on: on,
    update: () => $.apply(_.c, _.a)
  };
};

function on(type, fn) {
  this._[type].push(fn);
}
