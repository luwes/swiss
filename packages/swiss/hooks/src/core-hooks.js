/* Adapted from Preact - The MIT License - Jason Miller */
import { defer, argsChanged, invokeOrReturn } from './utils.js';

let currentUpdate;
let currentIndex;
let afterPaintEffects = [];

export function run(cleaner, callback) {
  function update(a, b, c) {
    currentUpdate = update;
    currentIndex = 0;

    runBeforeLifeCycles();
    callback(a, b, c);
    runAfterLifeCycles();

    cleaner.__hooks = currentUpdate.__hooks;
  }
  return update;
}

function runBeforeLifeCycles() {
  const hooks = currentUpdate.__hooks;
  if (hooks) {
    // Is possible if a 2nd render is called before the flush after paint.
    hooks._pendingEffects = handleEffects(hooks._pendingEffects);
  }
}

function runAfterLifeCycles() {
  const hooks = currentUpdate.__hooks;
  if (hooks) {
    hooks._pendingLayoutEffects = handleEffects(hooks._pendingLayoutEffects);
  }
}

export function clean(cleaner) {
  if (cleaner.__hooks) {
    cleaner.__hooks._list.forEach(invokeCleanup);
  }
}

/**
 * Get a hook's state from the currentUpdate
 * @param {number} index The index of the hook to get
 * @returns {Object}
 */
function getHookState(index) {
  // Largely inspired by:
  // * https://github.com/michael-klein/funcy.js/blob/f6be73468e6ec46b0ff5aa3cc4c9baf72a29025a/src/hooks/core_hooks.mjs
  // * https://github.com/michael-klein/funcy.js/blob/650beaa58c43c33a74820a3c98b3c7079cf2e333/src/renderer.mjs
  // Other implementations to look at:
  // * https://codesandbox.io/s/mnox05qp8

  const hooks =
    currentUpdate.__hooks ||
    (currentUpdate.__hooks = {
      _list: [],
      _pendingEffects: [],
      _pendingLayoutEffects: []
    });

  if (index >= hooks._list.length) {
    /* eslint-disable-next-line */
    hooks._list.push({});
  }
  return hooks._list[index];
}

export function useState(initialState) {
  return useReducer(invokeOrReturn, initialState);
}

export function useReducer(reducer, initialState, init) {
  const hookState = getHookState(currentIndex++);
  if (hookState._update == null) {
    hookState._update = currentUpdate;

    hookState._value = [
      init == null ? invokeOrReturn(null, initialState) : init(initialState),

      action => {
        hookState._value[0] = reducer(hookState._value[0], action);
        defer(hookState._update);
      }
    ];
  }

  return hookState._value;
}

/**
 * @param {Function} callback
 * @param {any[]} args
 */
export function useEffect(callback, args) {
  const state = getHookState(currentIndex++);
  if (argsChanged(state._args, args)) {
    state._value = callback;
    state._args = args;
    /* eslint-disable-next-line */
    currentUpdate.__hooks._pendingEffects.push(state);
    afterPaint(currentUpdate);
  }
}

/**
 * @param {Function} callback
 * @param {any[]} args
 */
export function useLayoutEffect(callback, args) {
  const state = getHookState(currentIndex++);
  if (argsChanged(state._args, args)) {
    state._value = callback;
    state._args = args;
    /* eslint-disable-next-line */
    currentUpdate.__hooks._pendingLayoutEffects.push(state);
  }
}

export function useRef(initialValue) {
  const state = getHookState(currentIndex++);
  if (state._value == null) {
    state._value = { current: initialValue };
  }

  return state._value;
}

/**
 * @param {() => any} callback
 * @param {any[]} args
 */
export function useMemo(callback, args) {
  const state = getHookState(currentIndex++);
  if (argsChanged(state._args, args)) {
    state._args = args;
    state._callback = callback;
    return (state._value = callback());
  }

  return state._value;
}

/**
 * @param {() => void} callback
 * @param {any[]} args
 */
export function useCallback(callback, args) {
  return useMemo(() => callback, args);
}

export function useContext(context) {
  const subscribe = context.provide._subscribe;
  if (!subscribe) return context.value;

  const state = getHookState(currentIndex++);
  if (state._value == null) {
    state._value = true;
    subscribe(currentUpdate);
  }

  return context.value;
}

/**
 * Invoke a update's pending effects after the next frame renders
 */
export function afterPaint(update) {
  if (
    !update._afterPaintQueued &&
    (update._afterPaintQueued = true) &&
    /* eslint-disable-next-line */
    afterPaintEffects.push(update) === 1
  ) {
    requestAnimationFrame(scheduleFlushAfterPaint);
  }
}

function scheduleFlushAfterPaint() {
  defer(flushAfterPaintEffects);
}

/**
 * After paint effects consumer.
 */
function flushAfterPaintEffects() {
  afterPaintEffects.forEach(update => {
    update._afterPaintQueued = false;
    update.__hooks._pendingEffects = handleEffects(update.__hooks._pendingEffects);
  });
  afterPaintEffects = [];
}

function handleEffects(effects) {
  effects.forEach(invokeCleanup);
  effects.forEach(invokeEffect);
  return [];
}

function invokeCleanup(hook) {
  if (hook._cleanup) hook._cleanup();
}

/**
 * Invoke a Hook's effect
 * @param {Object} hook
 */
function invokeEffect(hook) {
  const result = hook._value();
  if (typeof result === 'function') hook._cleanup = result;
}
