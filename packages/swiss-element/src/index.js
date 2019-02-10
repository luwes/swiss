export * from './swiss-element.js';

// These enhancers are added by default but can be mixed and matched with the core.
export * from './enhancers/hooks/index.js';
export { default as component } from './enhancers/component.js';
export { default as propsToAttrs } from './enhancers/props-to-attrs.js';

// These enhancers are optional an can be passed in the `element` function.
export { default as renderer } from './enhancers/renderer.js';
export { default as applyMiddleware } from './enhancers/apply-middleware.js';

export { compose } from './utils.js';
