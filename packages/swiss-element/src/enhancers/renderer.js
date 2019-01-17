
function defaultRenderer(root, html) {
  root.innerHTML = html();
}

export default function rndrr(renderer = defaultRenderer) {
  return createElement => (...args) => {
    const element = createElement(...args);
    element.renderer = renderer;
    return element;
  };
}
