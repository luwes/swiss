import { defaults } from 'swiss-element';
import hooks from './swiss-hooks.js';

defaults.enhancers = [].concat(hooks, defaults.enhancers);

export { createContext } from './create-context.js';
export * from './core-hooks.js';
export * from './swiss-hooks.js';
