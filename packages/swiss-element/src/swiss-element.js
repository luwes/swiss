import component from './enhancers/component.js';
import propsToAttrs from './enhancers/props-to-attrs.js';
import { defaults, element } from './core.js';

// The `propsToAttrs` and `component` enhancers are added by default.
// If you prefer not to use any of these simply import `src/core.js` and add
// enhancers of your choice.
defaults.enhancers = [propsToAttrs(), component()];

export { component, defaults, element, propsToAttrs };
