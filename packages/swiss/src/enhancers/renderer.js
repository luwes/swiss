import defaultRenderer from '../default-renderer.js';
import { extend } from '../utils.js';

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
function rendererEnhancer(customRenderer = defaultRenderer) {
  return createElement => (...args) => {
    const element = createElement(...args);
    let render;
    let renderWays = [
      // default
      (root, html, old) => customRenderer(root, html, old),
      // lit-html, htm-preact
      (root, html, old) => customRenderer(html, root, old),
      // superfine
      (root, html, old) => customRenderer(old, html, root),
      // lighterhtml
      (root, html, old) => customRenderer(root, () => html, old)
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
    function renderer(root, html, old) {
      if (render) return render(root, html, old);

      render = renderWays[0];
      renderWays = renderWays.slice(1);

      let result;
      try {
        result = render(root, html, old);
      } catch (err) {
        if (renderWays.length > 0) {
          render = null;
          return renderer(root, html, old);
        }
      }

      return result || '';
    }

    return extend(element, {
      renderer
    });
  };
}

export default rendererEnhancer;
