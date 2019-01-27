import morph from 'nanomorph';
import html from 'nanohtml/lib/browser';
import {
  element,
  renderer,
  useState
} from 'swiss-element';

function Counter() {
  const [count, setCount] = useState(0);

  return html`
    <div>
      <h1>${count}</h1>
      <button onclick="${() => setCount(count - 1)}">-</button>
      <button onclick="${() => setCount(count + 1)}">+</button>
    </div>
  `;
}

let tree;
function render(root, html) {
  if (!root.firstChild) {
    tree = root.appendChild(html);
  } else {
    morph(tree, html);
  }
}

element('s-counter', Counter, renderer(render));
