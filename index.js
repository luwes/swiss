var augmentor = (function () {
  'use strict';

  /*(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      typeof = function (obj) {
        return typeof obj;
      };
    } else {
      typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return typeof(obj);
  }

*/  var augmentor = (function (fn) {
    var current = runner($);
    each(setup, current);
    return $;

    function $() {
      var prev = now;
      now = current;
      var result;

      try {
        var _ = now._;
        each(_.before, now);
        result = fn.apply(_.c = this, _.a = arguments);
        each(_.after, now);
      } catch (o_O) {
        console.error(o_O);
      }

      now = prev;
      return result;
    }
  });
  var $ = function $(value) {
    return typeof(value) === typeof($) ? value() : value;
  };
  var now = null; // export const current = () => now; // needed at all ?

  function diff(value, i) {
    return value !== this[i];
  }
  var empty = [];
  var setup = [];
  var stacked = function stacked(id) {
    return function (runner) {
      var state = {
        i: 0,
        stack: []
      };
      runner[id] = state;
      runner.on('before', function () {
        state.i = 0;
      });
    };
  };
  var unstacked = function unstacked(id) {
    var _now = now,
        state = _now[id],
        update = _now.update;
    var i = state.i,
        stack = state.stack;
    state.i++;
    return {
      i: i,
      stack: stack,
      update: update,
      unknown: i === stack.length
    };
  };
  var id$1 = 0;
  var uid = function uid() {
    return '_$' + id$1++;
  };

  var runner = function runner($) {
    var _ = {
      c: null,
      a: null,
      before: [],
      after: []
    };
    return {
      _: _,
      on: on,
      update: function update() {
        return $.apply(_.c, _.a);
      }
    };
  };

  function each(arr, value) {
    for (var i = 0; i < arr.length; i++) {
      arr[i](value);
    }
  }

  function on(type, fn) {
    this._[type].push(fn);
  }

  var id$2 = uid();
  setup.push(stacked(id$2));
  function useMemo (callback, refs) {
    var _unstacked = unstacked(id$2),
        i = _unstacked.i,
        stack = _unstacked.stack,
        unknown = _unstacked.unknown;

    var comp = refs || empty;
    if (unknown) stack.push(create(callback, comp));
    var _stack$i = stack[i],
        filter = _stack$i.filter,
        value = _stack$i.value,
        fn = _stack$i.fn,
        inputs = _stack$i.inputs;
    return (filter ? inputs.some(diff, comp) : callback !== fn) ? (stack[i] = create(callback, comp)).value : value;
  }

  var create = function create(fn, inputs) {
    return {
      filter: inputs !== empty,
      value: fn(),
      fn: fn,
      inputs: inputs
    };
  };

  var callback = (function (fn, inputs) {
    return useMemo(function () {
      return fn;
    }, inputs);
  });

  var id$3 = uid();
  setup.push(stacked(id$3));
  var useReducer = (function (reducer, value) {
    var _unstacked = unstacked(id$3),
        i = _unstacked.i,
        stack = _unstacked.stack,
        unknown = _unstacked.unknown,
        update = _unstacked.update;

    if (unknown) stack.push([$(value), function (action) {
      value = reducer(value, action);
      stack[i][0] = value;
      update();
    }]);
    return stack[i];
  });

  var id$4 = uid();
  setup.push(stacked(id$4));
  var ref = (function (value) {
    var _unstacked = unstacked(id$4),
        i = _unstacked.i,
        stack = _unstacked.stack,
        unknown = _unstacked.unknown;

    if (unknown) stack.push({
      current: $(value)
    });
    return stack[i];
  });

  var state = (function (value) {
    return useReducer(function (_, value) {
      return value;
    }, value);
  });

  
  augmentor.useCallback = callback;
  augmentor.useMemo = useMemo;
  augmentor.useReducer = useReducer;
  augmentor.useRef = ref;
  augmentor.useState = state;

  return augmentor;

}());
