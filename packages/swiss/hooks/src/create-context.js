import { afterPaint } from './core-hooks.js';

export function createContext(defaultValue) {
  let context = {
    _defaultValue: defaultValue
  };

  function provide(value) {
    if (!context._provider) createProvider(context);

    if (context.value != value) {
      context.value = value;
      context._update();
    }
    return context;
  }

  context.provide = provide;
  return context;
}

function createProvider(ctx) {
  let subs = [];
  ctx._provider = ctx;

  ctx._subscribe = function(update) {
    /* eslint-disable-next-line */
    subs.push(update);
  };

  ctx._update = function() {
    subs.map(u => afterPaint(u));
  };
}
