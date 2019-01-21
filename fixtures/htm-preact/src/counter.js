import { html, render } from '../node_modules/htm/preact/standalone.mjs';
import {
  element,
  renderer,
  useState
} from '../node_modules/swiss-element/dist/swiss-element.mjs';

function Counter() {
  const [count, setCount] = useState(0);

  return html`
    <a href="#" onclick="${() => setCount(count + 1)}">
      Clicked ${count} times
    </a>
  `;
}

element('s-counter', Counter, renderer(render));
