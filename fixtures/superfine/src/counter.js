import { h, patch } from 'superfine';
import {
  element,
  renderer,
  useState
} from '../node_modules/swiss-element/dist/swiss-element.mjs';

function Counter() {
  const [count, setCount] = useState(0);

  return h('div', {}, [
    h('h1', {}, count),
    h('button', { onclick: () => setCount(count - 1) }, '-'),
    h('button', { onclick: () => setCount(count + 1) }, '+')
  ]);
}

element('s-counter', Counter, renderer(patch));
