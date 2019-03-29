import { options } from 'swiss';
import hooks from './swiss-hooks.js';

options.enhancers = [].concat(hooks, options.enhancers);

export { createContext } from './create-context.js';
export * from './core-hooks.js';
export * from './swiss-hooks.js';
