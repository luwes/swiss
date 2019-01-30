import { createContext, useElement, useContext, useState, useRef, useEffect } from 'swiss-element';

const hasOwn = Object.prototype.hasOwnProperty;

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;

  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

let globalContext;
const contexts = new WeakMap();

function context(store) {
  // If you use one Redux store for your whole app, better use global context.
  globalContext = globalContext || createContext(store);

  // If you use this function as an enhancer the context will be tied to the
  // element. Each element could potentially have their own store.
  return createElement => (...args) => {
    const element = createElement(...args);
    contexts.set(element, createContext(store));
    return element;
  };
}

function useSelector(selector) {
  const element = useElement();
  const store = useContext(contexts.get(element) || globalContext);
  const { getState } = store;
  const [result, setResult] = useState(selector(getState()));
  const resultRef = useRef(result);

  useEffect(() => {
    store.subscribe(() => {
      const nextResult = selector(getState());
      if (shallowEqual(nextResult, resultRef.current)) return;
      resultRef.current = nextResult;
      setResult(nextResult);
    });
  });
  return result;
}

function useAction(actionCreator) {
  const element = useElement();
  const { dispatch } = useContext(contexts.get(element) || globalContext);
  return (...args) => dispatch(actionCreator(...args));
}

function useActions(actionCreators) {
  return Object.keys(actionCreators).reduce((acc, curr) => {
    const ac = actionCreators[curr];
    return { ...acc, [curr]: useAction(ac) };
  }, {});
}

export { context, useSelector, useAction, useActions };
