import { spy } from 'sinon';
import {
  setUpScratch,
  tearDown,
  oneAnimationFrame
} from '../../test/_utils.js';

import { element } from 'swiss';
import { useEffect } from 'swiss/hooks';

describe('useEffect', () => {
  /** @type {HTMLDivElement} */
  let scratch;

  beforeEach(() => (scratch = setUpScratch()));
  afterEach(() => tearDown(scratch));

  it('useEffect should be called on connectedCallback', async function() {
    const cleanupFunction = spy();
    const callback = spy(() => cleanupFunction);

    const el = element(() => useEffect(callback))();
    scratch.append(el);

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

    const el = El();
    el.update();
    el.update();

    expect(cleanupFunction).to.be.not.called;
    expect(callback).to.be.calledOnce;

    el.update();

    expect(cleanupFunction).to.be.calledOnce;
    expect(callback).to.be.calledTwice;
  });
});
