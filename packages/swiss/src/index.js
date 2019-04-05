export * from './swiss.js';

// These enhancers are added by default but can be mixed and matched with the core.
export { default as component } from './enhancers/component.js';
export { default as propsToAttrs } from './enhancers/props-to-attrs.js';

// These enhancers are optional and can be passed in the `element` function.
export { default as renderer } from './enhancers/renderer.js';
export { default as applyMiddleware } from './enhancers/apply-middleware.js';

export { compose, extend } from './utils.js';
