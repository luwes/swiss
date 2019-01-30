import { h, patch } from 'superfine';
import {
  element,
  renderer,
  useState
} from 'swiss-element';

function Counter() {
  const [count, setCount] = useState(0);

  return h('div', { class: 'box level' }, [
    h('div', { class: 'level-item' }, [
      h('button', { class: 'button', onclick: () => setCount(count - 1) }, '-')
    ]),
    h('div', { class: 'level-item' }, [
      h('h1', { class: 'title' }, count)
    ]),
    h('div', { class: 'level-item' }, [
      h('button', { class: 'button', onclick: () => setCount(count + 1) }, '+')
    ])
  ]);
}

element('s-counter', Counter, renderer(patch));
