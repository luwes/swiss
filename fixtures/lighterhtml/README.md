# 🇨🇭element + [lighterhtml](https://github.com/WebReflection/lighterhtml/)

```js
import { element, useState, renderer } from 'swiss-element';
import { html, render } from 'lighterhtml';

function dispatch(el, first, last) {
  let event = new CustomEvent('change', {
    detail: first + ' ' + last
  });
  el.dispatchEvent(event);
}

function App() {
  const [name, setName] = useState('');

  return html`
    <h2>User Page</h2>

    <h3>${name}</h3>

    <p>Change name:</p>
    <full-name onchange="${ev => ev.detail && setName(ev.detail)}"> </full-name>
  `;
}

element('my-app', App, renderer(render));

function FullName(el) {
  const [first, setFirst] = useState('Leonhard');
  const [last, setLast] = useState('Euler ✍️');

  dispatch(el, first, last);

  return html`
    <form>
      <label for="first">First</label>
      <input
        value="${first}"
        onkeyup="${ev => setFirst(ev.target.value)}"
        type="text"
        name="first"
      />

      <label for="last">Last</label>
      <input
        value="${last}"
        onkeyup="${ev => setLast(ev.target.value)}"
        type="text"
        name="last"
      />
    </form>

    <style>
      form {
        border: none;
        display: grid;
        grid-template-columns: 20% 80%;
      }
    </style>
  `;
}

element('full-name', FullName, renderer(render));
```
