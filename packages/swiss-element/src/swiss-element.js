import component from './enhancers/component.js';
import hooks from './enhancers/hooks/enhancer.js';
import propsToAttrs from './enhancers/props-to-attrs.js';
import { defaultEnhancers, element } from './core.js';

// The `hooks`, `propsToAttrs` and `component` enhancers are added by default.
// If you prefer not to use any of these simply import `src/core.js` and add
// enhancers of your choice.
defaultEnhancers.push(hooks, propsToAttrs, component);

export { element };
