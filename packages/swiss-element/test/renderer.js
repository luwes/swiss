import { element, renderer } from '../src/index.js';

it('renderer enhancer supports multiple signature types', function() {
  const renderWays = [
    sinon.spy((root, html) => (root.innerHTML = html)),
    sinon.spy((html, root) => (root.innerHTML = html)),
    sinon.spy((root, html) => (root.innerHTML = html())),
    sinon.spy((old, html, root) => (root.innerHTML = html))
  ];

  renderWays.forEach((r, i) => {
    const s = document.body.appendChild(
      element('s-fromage-' + i, () => `Say cheese`, renderer(r))()
    );
    expect(s.innerHTML).to.equal('Say cheese');
    expect(r).to.have.been.called;
  });
});
