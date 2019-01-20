
function defaultRenderer(root, html) {
  root.innerHTML = html();
}

/**
 * Adds a simple way to define your own renderer.
 *
 * @param  {Function} customRenderer A function that takes the custom element root and a function `html` which once executed renders the created dom nodes to the root node of the custom element.
 *
 * @return {Function}
 */
function renderer(customRenderer = defaultRenderer) {
  return createElement => (...args) => {
    const element = createElement(...args);
    element.renderer = customRenderer;
    return element;
  };
}

export default renderer;
