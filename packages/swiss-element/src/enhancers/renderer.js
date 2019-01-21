import defaultRenderer from '../default-renderer.js';

/**
 * Adds a simple way to define your own renderer.
 * Verified libraries working by passing just the `render` function:
 *
 * - Lit-html
 * - Preact
 *
 * @param  {Function} customRenderer A function that takes the custom element root and a function `html` which once executed renders the created dom nodes to the root node of the custom element.
 *
 * @return {Function}
 */
function renderer(customRenderer = defaultRenderer) {
  return createElement => (...args) => {
    const element = createElement(...args);

    // Put the `html()` calls first, they're more likely to throw.
    const renderWays = [
      (root, html) => customRenderer(html(), root),
      (root, html) => customRenderer(root, html()),
      (root, html) => customRenderer(html, root),
      (root, html) => customRenderer(root, html)
    ];

    /**
     * Most library render functions look like 1 of 4 where the root and result
     * of the render is switched or whether the result is returned by an
     * additional function execution.
     *
     * This function is only called on the first render pass, after it's cached.
     *
     * @param  {HTMLElement} root
     * @param  {Node|Function} html
     * @param  {Number} i
     * @return {*}
     */
    function findRenderWay(root, html, i = 0) {
      element.renderer = renderWays[i];
      i += 1;

      let result;
      try {
        result = element.renderer(root, html, 0);
      } catch (err) {
        if (i <= 3) {
          return findRenderWay(root, html, i);
        }
      }

      return result || '';
    }

    element.renderer = findRenderWay;
    return element;
  };
}

export default renderer;
