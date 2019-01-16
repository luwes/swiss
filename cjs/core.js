'use strict';
let now = null;
const current = () => now;
exports.current = current;

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
    const {_, before, after, external} = current;
    try {
      let result;
      do {
        _.$ = _._ = false;
        each(before, current);
        result = fn.apply(_.c = this, _.a = arguments);
        each(after, current);
        if (external.length)
          each(external.splice(0), result);
      } while (_._);
      return result;
    }
    finally {
      _.$ = true;
      now = prev;
    }
  }
};

const each = (arr, value) => {
  const {length} = arr;
  let i = 0;
  while (i < length)
    arr[i++](value);
};

const runner = $ => {
  const _ = {
    _: true,
    $: true,
    c: null,
    a: null
  };
  return {
    _: _,
    before: [],
    after: [],
    external: [],
    reset: [],
    update: () => _.$ ? $.apply(_.c, _.a) : (_._ = true)
  };
};

function diverse(value, i) {
  return value !== this[i];
}
