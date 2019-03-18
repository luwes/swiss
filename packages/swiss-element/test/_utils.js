export const defer =
  typeof Promise == 'function'
    ? Promise.prototype.then.bind(Promise.resolve())
    : setTimeout;

/**
 * Setup the test environment
 * @returns {HTMLDivElement}
 */
export function setUpScratch() {
  const scratch = document.createElement('div');
  scratch.id = 'scratch';
  (document.body || document.documentElement).appendChild(scratch);
  return scratch;
}

/**
 * Teardown test environment and reset preact's internal state
 * @param {HTMLDivElement} scratch
 */
export function tearDown(scratch) {
  scratch.parentNode.removeChild(scratch);
}

export function tag(tagName) {
  return `<${tagName}></${tagName}>`;
}

export function render(SwissElement, parent) {
  if (SwissElement._instance) {
    SwissElement._instance.update();
    return SwissElement._instance;
  }
  SwissElement._instance = SwissElement();
  return parent.appendChild(SwissElement._instance);
}

export function oneAnimationFrame() {
  return new Promise(resolve => requestAnimationFrame(resolve));
}

export function oneDefer() {
  return new Promise(resolve => defer(resolve));
}
