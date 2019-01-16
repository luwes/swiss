var augmentor = (function () {
  'use strict';

  

  var now = null;
  var current = function current() {
    return now;
  };
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
      var _ = current._,
          before = current.before,
          after = current.after,
          external = current.external;

      try {
        var result;

        do {
          _.$ = _._ = false;
          each(before, current);
          result = fn.apply(_.c = this, _.a = arguments);
          each(after, current);
          if (external.length) each(external.splice(0), result);
        } while (_._);

        return result;
      } finally {
        _.$ = true;
        now = prev;
      }
    }
  });

  var each = function each(arr, value) {
    var length = arr.length;
    var i = 0;

    while (i < length) {
      arr[i++](value);
    }
  };

  var runner = function runner($) {
    var _ = {
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
      update: function update() {
        return _.$ ? $.apply(_.c, _.a) : _._ = true;
      }
    };
  };

  function diverse(value, i) {
    return value !== this[i];
  }

  var id$2 = uid();
  var cancel, request;

  try {
    cancel = cancelAnimationFrame;
    request = requestAnimationFrame;
  } catch (o_O) {
    // i.e. if you run this in NodeJS
    cancel = clearTimeout;
    request = setTimeout;
  }

  var create = function create(always, check, inputs, raf, fn) {
    return {
      always: always,
      check: check,
      inputs: inputs,
      raf: raf,
      fn: fn,
      clean: null,
      t: 0,
      update: check
    };
  };

  var effect = function effect(raf) {
    return function (callback, refs) {
      var _unstacked = unstacked(id$2),
          i = _unstacked.i,
          stack = _unstacked.stack,
          unknown = _unstacked.unknown;

      var comp = refs || empty;

      if (unknown) {
        var always = comp === empty;

        var check = always || !raf || typeof(comp) !== typeof(effect);

        if (always || !raf || typeof(comp) !== typeof(effect)) {
          stack.push(create(always, check, comp, raf, function () {
            set$1(stack[i], callback());
          }));
        } else {
          current().external.push(function (result) {
            return refs(callback, result);
          });
          stack.push(create(always, always, empty, raf, effect));
        }
      } else {
        var info = stack[i];
        var _check = info.check,
            _always = info.always,
            inputs = info.inputs;

        if (_check && (_always || diff(inputs, comp))) {
          info.inputs = comp;
          info.update = true;
        }
      }
    };
  };

  var set$1 = function set(info, clean) {
    info.t = 0;
    info.clean = clean;
  };

  setup.push(function (runner) {
    var stack = [];
    var state = {
      i: 0,
      stack: stack
    };
    runner[id$2] = state;

    var reset = function reset() {
      state.i = 0;

      for (var length = stack.length, i = 0; i < length; i++) {
        var _stack$i = stack[i],
            check = _stack$i.check,
            clean = _stack$i.clean,
            raf = _stack$i.raf,
            t = _stack$i.t;

        if (check) {
          if (raf && t) cancel(t);else if (clean) clean();
          set$1(stack[i], null);
        }
      }
    };

    runner.reset.push(reset);
    runner.before.push(reset);
    runner.after.push(function () {
      for (var length = stack.length, i = 0; i < length; i++) {
        var _stack$i2 = stack[i],
            fn = _stack$i2.fn,
            raf = _stack$i2.raf,
            update = _stack$i2.update;

        if (update) {
          stack[i].update = false;
          if (raf) stack[i].t = request(fn);else fn();
        }
      }
    });
  });
  var useEffect = effect(true);
  var useLayoutEffect = effect(false);

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
  var useMemo = (function (callback, refs) {
    var _unstacked = unstacked(id$4),
        i = _unstacked.i,
        stack = _unstacked.stack,
        unknown = _unstacked.unknown;

    var comp = refs || empty;
    if (unknown) stack.push(create$1(callback, comp));
    var _stack$i = stack[i],
        filter = _stack$i.filter,
        value = _stack$i.value,
        fn = _stack$i.fn,
        inputs = _stack$i.inputs;
    return (filter ? diff(inputs, comp) : callback !== fn) ? stack[i] = create$1(callback, comp) : value;
  });

  var create$1 = function create(fn, inputs) {
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

  var id$5 = uid();
  setup.push(stacked(id$5));
  var useReducer = (function (reducer, value) {
    var _unstacked = unstacked(id$5),
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

  var all = new WeakMap();
  var id$6 = uid();
  setup.push(stacked(id$6));
  var createContext = function createContext() {
    var context = {
      value: void 0,
      provide: provide
    };
    all.set(context, []);
    return context;
  };
  var useContext = function useContext(context) {
    var _unstacked = unstacked(id$6),
        i = _unstacked.i,
        stack = _unstacked.stack,
        unknown = _unstacked.unknown,
        update = _unstacked.update;

    if (unknown) {
      all.get(context).push(update);
      stack.push(context);
    }

    return stack[i].value;
  };

  function provide(value) {
    if (this.value !== value) {
      this.value = value;

      for (var arr = all.get(this), length = arr.length, i = 0; i < length; i++) {
        arr[i]();
      }
    }
  }

  
  augmentor.createContext = createContext;
  augmentor.useCallback = callback;
  augmentor.useContext = useContext;
  augmentor.useEffect = useEffect;
  augmentor.useLayoutEffect = useLayoutEffect;
  augmentor.useMemo = useMemo;
  augmentor.useReducer = useReducer;
  augmentor.useRef = ref;
  augmentor.useState = state;

  return augmentor;

}());
