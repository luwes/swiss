import { compose } from '../utils.js';

export default function applyMiddleware(...middlewares) {
  return createElement => (...args) => {
    const element = createElement(...args);

    let render = () => {
      throw new Error(
        `Rendering while constructing your middleware is not allowed. ` +
          `Other middleware would not be applied to this render.`
      );
    };

    const middlewareAPI = {
      render: (...args) => render(...args)
    };

    const chain = middlewares.map(middleware => middleware(middlewareAPI));
    render = compose(...chain)(element.render.bind(element));

    element.render = render;
    return element;
  };
}
