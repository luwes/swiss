import { isUndefined } from './utils.js';

export function createFactory(supr) {
  function createElement(options, enhancer) {
    if (!isUndefined(enhancer)) {
      return enhancer(createElement)(options);
    }
    return supr();
  }
  return createElement;
}
