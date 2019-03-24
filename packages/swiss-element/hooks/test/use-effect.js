import { spy } from 'sinon';
import {
  setUpScratch,
  tearDown,
  render,
  oneAnimationFrame
} from '../../test/_utils.js';
import { element } from '../../src/swiss-element.js';
import { useEffect } from '../src/index.js';

describe('useEffect', () => {
  /** @type {HTMLDivElement} */
  let scratch;

  beforeEach(() => (scratch = setUpScratch()));
  afterEach(() => tearDown(scratch));

  it('useEffect should be called on connectedCallback', async function() {
    const cleanupFunction = spy();
    const callback = spy(() => cleanupFunction);

    const el = render(element('swiss-el', () => useEffect(callback)), scratch);

    await oneAnimationFrame();
    expect(callback).to.have.been.calledOnce;

    scratch.removeChild(el);
    expect(cleanupFunction).to.have.been.calledOnce;
  });

  it('calls the effect immediately if another render is about to start', async () => {
    const cleanupFunction = spy();
    const callback = spy(() => cleanupFunction);

    const El = element(() => {
      useEffect(callback);
    });

    render(El, scratch);
    render(El, scratch);

    expect(cleanupFunction).to.be.not.called;
    expect(callback).to.be.calledOnce;

    render(El, scratch);

    expect(cleanupFunction).to.be.calledOnce;
    expect(callback).to.be.calledTwice;
  });
});
