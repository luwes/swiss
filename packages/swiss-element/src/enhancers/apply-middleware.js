import { compose } from '../utils.js';

/**
 * Middleware lets you wrap the element's render method for fun and profit. The key feature of middleware is that it is composable. Multiple middleware can be combined together, where each middleware requires no knowledge of what comes before or after it in the chain.
 *
 * @param  {...Function} middleware Functions that conform to the Swiss _middleware_ API. Each middleware receives `SwissElement`'s `render` function as a named argument, and returns a function. That function will be given the `next` middleware's render method, and is expected to return a function of `fragment` calling `next(fragment)` with a potentially different argument, or at a different time, or maybe not calling it at all. The last middleware in the chain will receive the real element's `render` method as the `next` parameter, thus ending the chain. So, the middleware signature is `({ render }) => next => fragment`.
 *
 * @return {Function}
 */
function applyMiddleware(...middleware) {
  return createElement => options => {
    const element = createElement(options);
    let render = () => {
      throw new Error('Middleware should not render in setup.');
    };

    const middlewareAPI = {
      nodeName: element.nodeName,
      render: html => render(html),
      getTree: () => element.outerHTML
    };

    const chain = middleware.map(mw => mw(middlewareAPI));
    render = compose(...chain)(element.render);

    element.render = render;
    return element;
  };
}

export default applyMiddleware;
