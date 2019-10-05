import { spy } from 'sinon';
import {
  setUpScratch,
  tearDown
} from '../../test/_utils.js';

import { element, options, renderer } from 'swiss';
import { html, render } from 'lit-html';
options.enhancers = [].concat(renderer(render), options.enhancers);
import { useLayoutEffect } from 'swiss/hooks';

describe('useLayoutEffect', () => {
  /** @type {HTMLDivElement} */
  let scratch;

  beforeEach(() => (scratch = setUpScratch()));
  afterEach(() => tearDown(scratch));

  it('calls the effect immediately after render', () => {
    const cleanupFunction = spy();
    const callback = spy(() => cleanupFunction);

    const El = element(() => {
      useLayoutEffect(callback);
      return null;
    });

    const el = El();
    el.update();
    el.update();

    expect(cleanupFunction).to.be.calledOnce;
    expect(callback).to.be.calledTwice;

    el.update();

    expect(cleanupFunction).to.be.calledTwice;
    expect(callback).to.be.calledThrice;
  });

  it('works on a nested component', () => {
    const callback = spy();

    const Parent = element(() => {
      return html`
        <div>
          <child-el></child-el>
        </div>
      `;
    });

    element('child-el', () => {
      useLayoutEffect(callback);
      return null;
    });

    scratch.append(Parent());

    expect(callback).to.be.calledOnce;
  });
});
