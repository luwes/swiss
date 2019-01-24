import defaultRenderer from '../default-renderer.js';

/**
 * Adds a simple way to define your own renderer.
 * Verified libraries working by passing just the `render` or `patch` function:
 *
 * - Lighterhtml
 * - Lit-html
 * - HTM-Preact
 * - Superfine
 *
 * @param  {Function} customRenderer A function that takes the custom element root and a function `html` which once executed renders the created dom nodes to the root node of the custom element.
 *
 * @return {Function}
 */
function renderer(customRenderer = defaultRenderer) {
  return createElement => (...args) => {
    const element = createElement(...args);

    const renderWays = [
      // default
      (root, html) => customRenderer(root, html),
      // lit-html, htm-preact
      (root, html) => customRenderer(html, root),
      // superfine
      (root, html, old) => customRenderer(old, html, root),
      // lighterhtml
      (root, html) => customRenderer(root, () => html)
    ];

    /**
     * Most library render functions look very similar, do a quick search on the
     * first render. Probably shouldn't do this but it's so damn convenient :P
     *
     * This function is only called on the first render pass, after it's cached.
     *
     * @param  {HTMLElement} root
     * @param  {Node|Function} html
     * @param  {Number} i
     * @return {*}
     */
    function findRenderWay(root, html, old, i = 0) {
      element.renderer = renderWays[i];

      let result;
      try {
        result = element.renderer(root, html, old);
      } catch (err) {
        i += 1;
        if (i < renderWays.length) {
          return findRenderWay(root, html, old, i);
        }
      }

      return result || '';
    }

    element.renderer = findRenderWay;
    return element;
  };
}

export default renderer;
