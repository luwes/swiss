import { h, patch } from 'superfine';
import {
  element,
  renderer,
  useState
} from 'swiss-element';

function Counter() {
  const [count, setCount] = useState(0);

  return h('div', {}, [
    h('h1', {}, count),
    h('button', { onclick: () => setCount(count - 1) }, '-'),
    h('button', { onclick: () => setCount(count + 1) }, '+')
  ]);
}

element('s-counter', Counter, renderer(patch));
