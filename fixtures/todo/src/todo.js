import { html, render } from 'lighterhtml';
import { element, renderer, useState } from 'swiss-element';

const lighterElement = element(renderer(render));

function TodoApp(element) {
  const [count, setCount] = useState(0);

  return html`
    <a href="#" onclick="${() => setCount(count + 1)}">
      Check this out ${count} ${element.value}
    </a>`;
}

customElements.define('todo-app', lighterElement(TodoApp, {
  observedAttributes: ['value']
}));
