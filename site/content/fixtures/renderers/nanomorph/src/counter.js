import morph from 'nanomorph';
import html from 'nanohtml/lib/browser';
import { element, renderer } from 'swiss-element';
import { useState } from 'swiss-hooks';

function Counter() {
  const [count, setCount] = useState(0);

  return html`
    <div class="box level">
      <div class="level-item">
        <button class="button" onclick="${() => setCount(count - 1)}">-</button>
      </div>
      <div class="level-item">
        <h1 class="title">${count}</h1>
      </div>
      <div class="level-item">
        <button class="button" onclick="${() => setCount(count + 1)}">+</button>
      </div>
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
