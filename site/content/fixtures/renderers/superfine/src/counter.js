import { h, patch } from 'superfine';
import { element, renderer } from 'swiss-element';
import { useState } from 'swiss-hooks';

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
