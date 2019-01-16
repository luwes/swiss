import { compose } from '../utils.js';

export default function applyMiddleware(...middlewares) {
  return createElement => (...args) => {
    const element = createElement(...args);

    let renderer = () => {
      throw new Error(
        `Rendering while constructing your middleware is not allowed. ` +
          `Other middleware would not be applied to this renderer.`
      );
    };

    const middlewareAPI = {
      renderer: (...args) => renderer(...args)
    };

    const chain = middlewares.map(middleware => middleware(middlewareAPI));
    renderer = compose(...chain)(element.renderer.bind(element));

    element.renderer = renderer;
    return element;
  };
}
