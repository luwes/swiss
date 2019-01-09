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

  */var now = null;
  var empty = [];
  var setup = [];
  var $ = function $(value) {
    return typeof(value) === typeof($) ? value() : value;
  };
  var diff = function diff(a, b) {
    return a.length !== b.length || a.some(diverse, b);
  };
  var stacked = function stacked(id) {
    return function (runner) {
      var state = {
        i: 0,
        stack: []
      };
      runner[id] = state;
      runner.before.push(function () {
        state.i = 0;
      });
    };
  };
  var id$1 = 0;
  var uid = function uid() {
    return '_$' + id$1++;
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
  var augmentor = (function (fn) {
    var current = runner($);
    each(setup, current);

    $.reset = function () {
      each(current.reset, current);

      for (var key in current) {
        if (/^_\$/.test(key)) current[key].stack.splice(0);
      }
    };

    return $;

    function $() {
      var prev = now;
      now = current;
      var result;

      try {
        var _now2 = now,
            _ = _now2._,
            before = _now2.before,
            after = _now2.after;
        each(before, now);
        result = fn.apply(_.c = this, _.a = arguments);
        each(after, now);
      } catch (o_O) {
        console.error(o_O);
      }

      now = prev;
      return result;
    }
  });

  var each = function each(arr, value) {
    for (var i = 0; i < arr.length; i++) {
      arr[i](value);
    }
  };

  var runner = function runner($) {
    var _ = {
      c: null,
      a: null
    };
    return {
      _: _,
      before: [],
      after: [],
      reset: [],
      update: function update() {
        return $.apply(_.c, _.a);
      }
    };
  };

  function diverse(value, i) {
    return value !== this[i];
  }

  var id$2 = uid();

  var set$1 = function set(info, clean) {
    info.t = 0;
    info.clean = clean;
  };

  setup.push(function (runner) {
    stacked(id$2)(runner);

    var reset = function reset() {
      var stack = runner[id$2].stack;

      for (var i = 0; i < stack.length; i++) {
        var _stack$i = stack[i],
            clean = _stack$i.clean,
            raf = _stack$i.raf,
            t = _stack$i.t;
        if (raf && t) cancelAnimationFrame(t);else if (clean) clean();
        set$1(stack[i], null);
      }
    };

    runner.reset.push(reset);
    runner.before.push(reset);
    runner.after.push(function () {
      var stack = runner[id$2].stack;

      for (var i = 0; i < stack.length; i++) {
        var _stack$i2 = stack[i],
            fn = _stack$i2.fn,
            raf = _stack$i2.raf,
            update = _stack$i2.update;

        if (update) {
          if (raf) stack[i].t = requestAnimationFrame(fn);else stack[i].clean = fn();
        }
      }
    });
  });

  var effect = function effect(id, raf) {
    return function (callback, refs) {
      var _unstacked = unstacked(id),
          i = _unstacked.i,
          stack = _unstacked.stack,
          unknown = _unstacked.unknown;

      var comp = refs || empty;

      if (unknown) {
        var always = comp === empty;
        var check = !raf || 0 < comp.length || always;

        stack.push({
          always: always,
          check: check,
          clean: null,
          fn: function fn() {
            return set$1(stack[i], callback());
          },
          inputs: comp,
          raf: raf,
          t: 0,
          update: check
        });
      } else {
        var info = stack[i];
        var _always = info.always,
            _check = info.check,
            inputs = info.inputs;

        if (_check && (_always || diff(inputs, comp))) {
          info.inputs = comp;
          info.update = true;
        }
      }
    };
  };

  var useEffect = effect(id$2, true);
  var useLayoutEffect = effect(id$2, false);

  var id$3 = uid();
  setup.push(stacked(id$3));
  var ref = (function (value) {
    var _unstacked = unstacked(id$3),
        i = _unstacked.i,
        stack = _unstacked.stack,
        unknown = _unstacked.unknown;

    if (unknown) stack.push({
      current: $(value)
    });
    return stack[i];
  });

  var id$4 = uid();
  setup.push(stacked(id$4));
  var useReducer = (function (reducer, value) {
    var _unstacked = unstacked(id$4),
        i = _unstacked.i,
        stack = _unstacked.stack,
        unknown = _unstacked.unknown,
        update = _unstacked.update;

    if (unknown) stack.push([$(value), function (action) {
      value = reducer(value, action);
      pair[0] = value;
      update();
    }]);
    var pair = stack[i];
    return pair;
  });

  var state = (function (value) {
    return useReducer(function (_, value) {
      return value;
    }, value);
  });

  var id$5 = uid();
  setup.push(stacked(id$5));
  var useMemo = (function (callback, refs) {
    var _unstacked = unstacked(id$5),
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
    return (filter ? diff(inputs, comp) : callback !== fn) ? (stack[i] = create(callback, comp)).value : value;
  });

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

  
  augmentor.useCallback = callback;
  augmentor.useEffect = useEffect;
  augmentor.useLayoutEffect = useLayoutEffect;
  augmentor.useMemo = useMemo;
  augmentor.useReducer = useReducer;
  augmentor.useRef = ref;
  augmentor.useState = state;

  return augmentor;

}());
