import { useEffect, useState, useElement, useRef } from 'swiss-hooks';

import shallowEqual from './shallow-equal.js';

let globalContext;
const contexts = new WeakMap();

export function context(store) {
  // If you use one Redux store for your whole app, better use global context.
  globalContext = globalContext || store;

  // If you use this function as an enhancer the context will be tied to the
  // element. Each element could potentially have their own store.
  return createElement => (...args) => {
    const element = createElement(...args);
    contexts.set(element, store);
    return element;
  };
}

export function useSelector(selector) {
  const element = useElement();
  const store = contexts.get(element) || globalContext;
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

export function useAction(actionCreator) {
  const element = useElement();
  const { dispatch } = contexts.get(element) || globalContext;
  return (...args) => dispatch(actionCreator(...args));
}

export function useActions(actionCreators) {
  return Object.keys(actionCreators).reduce((acc, curr) => {
    const actionCreator = actionCreators[curr];
    if (typeof actionCreator === 'function') {
      return { ...acc, [curr]: useAction(actionCreator) };
    }
    return acc;
  }, {});
}
