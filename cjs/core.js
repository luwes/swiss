'use strict';
let now = null;

const empty = [];
exports.empty = empty;
const setup = [];
exports.setup = setup;

const $ = value => typeof value === typeof $ ? value() : value;
exports.$ = $;

const diff = (a, b) => (a.length !== b.length || a.some(diverse, b));
exports.diff = diff;

const stacked = id => runner => {
  const state = {i: 0, stack: []};
  runner[id] = state;
  runner.before.push(() => {
    state.i = 0;
  });
};
exports.stacked = stacked;

let id = 0;
const uid = () => '_$' + id++;
exports.uid = uid;

const unstacked = id => {
  const {[id]: state, update} = now;
  const {i, stack} = state;
  state.i++;
  return {i, stack, update, unknown: i === stack.length};
};
exports.unstacked = unstacked;

Object.defineProperty(exports, '__esModule', {value: true}).default = fn => {
  const current = runner($);
  each(setup, current);
  $.reset = () => {
    each(current.reset, current);
    for (const key in current) {
      if (/^_\$/.test(key))
        current[key].stack.splice(0);
    }
  };
  return $;
  function $() {
    const prev = now;
    now = current;
    let result;
    try {
      const {_, before, after} = now;
      each(before, now);
      result = fn.apply(_.c = this, _.a = arguments);
      each(after, now);
    }
    catch (o_O) {
      console.error(o_O);
    }
    now = prev;
    return result;
  }
};

const each = (arr, value) => {
  for (let i = 0; i < arr.length; i++)
    arr[i](value);
};

const runner = $ => {
  const _ = {
    c: null,
    a: null
  };
  return {
    _: _,
    before: [],
    after: [],
    reset: [],
    update: () => $.apply(_.c, _.a)
  };
};

function diverse(value, i) {
  return value !== this[i];
}
