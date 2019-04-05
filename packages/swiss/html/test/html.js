import { spy } from 'sinon';
import { setUpScratch, tearDown, oneDefer } from '../../test/_utils.js';
import { element } from 'swiss';
import { useState } from 'swiss/hooks';
import { html, render } from 'swiss/html';

describe('html', () => {
  /** @type {HTMLDivElement} */
  let scratch;

  beforeEach(() => (scratch = setUpScratch()));
  afterEach(() => tearDown(scratch));

  it('can be set by another component', async () => {
    const Increment = element(el => {
      return html`
        <button onclick=${el.increment} />
      `;
    });

    const StateContainer = element(() => {
      const [count, setCount] = useState(0);
      return html`
        <div>
          <p>Count: ${count}</p>
          <${Increment} increment=${() => setCount(c => c + 10)} />
        </div>
      `;
    });

    render(html`<${StateContainer} />`, scratch);
    await oneDefer();
    expect(scratch.textContent).to.include('Count: 0');

    const button = scratch.querySelector('button');
    button.click();
    await oneDefer();
    expect(scratch.textContent).to.include('Count: 10');
  });

  it('updates on a render', async () => {
    const Comp = spy(({ text }) => {
      return html`<b>${text}</b>`;
    });

    const El = element(Comp);

    render(html`<${El} text=99 />`, scratch);
    expect(scratch.textContent).to.include('99');

    expect(Comp).to.have.been.calledOnce;

    render(html`<${El} text=99 />`, scratch);
    render(html`<${El} text=99 />`, scratch);

    expect(Comp).to.have.been.calledThrice;
  });

  it('incepts elements', async () => {
    render(html`<${element(({ text }) => html`${text}`)} text=99 />`, scratch);
    expect(scratch.textContent).to.include('99');
  });
});
