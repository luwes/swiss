import { defaults } from 'swiss-element';
import hooks from './swiss-hooks.js';

defaults.enhancers = [].concat(hooks, defaults.enhancers);

export {
  useCallback,
  useMemo,
  useReducer,
  useRef,
  useState,
  createContext,
  useContext
} from 'augmentor';

export { useEffect, useLayoutEffect } from './use-effect.js';
export { useElement } from './use-element.js';
