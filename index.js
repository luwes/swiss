var augmentor = (function () {
  'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  var augmentor = (function (fn) {
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
    return _typeof(value) === _typeof($) ? value() : value;
  };
  var now = null;
  var current = function current() {
    return now;
  };
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
  var id$1 = Math.random();
  var uid = function uid() {
    return --id$1 + '';
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
  var useReducer = (function (reducer, value) {
    var _current = current(),
        state = _current[id$2],
        update = _current.update;

    var i = state.i,
        stack = state.stack;
    state.i = i < stack.length ? i + 1 : stack.push([$(value), function (action) {
      value = reducer(value, action);
      stack[i][0] = value;
      update();
    }]);
    return stack[i];
  });

  var id$3 = uid();
  setup.push(stacked(id$3));
  var ref = (function (value) {
    var _current = current(),
        state = _current[id$3];

    var i = state.i,
        stack = state.stack;
    state.i = i < stack.length ? i + 1 : stack.push({
      current: $(value)
    });
    return stack[i];
  });

  var state = (function (value) {
    return useReducer(function (_, value) {
      return value;
    }, value);
  });

  
  augmentor.useReducer = useReducer;
  augmentor.useRef = ref;
  augmentor.useState = state;

  return augmentor;

}());
