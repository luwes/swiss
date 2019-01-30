import { element, useState, renderer } from 'swiss-element';
import { html, render } from 'lit-html';

function dispatch(el, first, last) {
  let event = new CustomEvent('change', {
    detail: first + ' ' + last
  });
  el.dispatchEvent(event);
}

function App() {
  const [name, setName] = useState('');

  return html`
    <div class="box">
      <h2 class="title">User Page</h2>
      <h3 class="subtitle">${name}</h3>

      <full-name @change="${ev => ev.detail && setName(ev.detail)}"> </full-name>
    </div>
  `;
}

element('my-app', App, renderer(render));

function FullName(el) {
  const [first, setFirst] = useState('Leonhard');
  const [last, setLast] = useState('Euler ✍️');

  dispatch(el, first, last);

  return html`
    <div class="field">
      <label class="label">First name</label>
      <div class="control">
        <input class="input"
          value="${first}"
          @keyup="${ev => setFirst(ev.target.value)}">
      </div>
    </div>
    <div class="field">
      <label class="label">Last name</label>
      <div class="control">
        <input class="input"
          value="${last}"
          @keyup="${ev => setLast(ev.target.value)}">
      </div>
    </div>
  `;
}

element('full-name', FullName, renderer(render));
