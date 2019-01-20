import { html, render } from 'lighterhtml';
import { applyMiddleware, compose, element, renderer, useState } from 'swiss-element';


function createThunkMiddleware(extraArgument) {
  return ({ render }) => {
    return next => fragment => {
      if (typeof fragment === 'function') {
        return fragment(render, extraArgument);
      }

      return next(fragment);
    };
  };
}

const logger = element => next => (fragment) => {
  console.log(element, fragment);
  console.log(1, 'logger');
  const result = next(fragment);
  console.log(2, 'logger');
  return result;
};

function TodoApp(element) {
  const [count, setCount] = useState(0);

  return function(render) {
    return Promise.resolve().then(() => {
      setTimeout(() => {
        render(html`
          <a href="#" onclick="${() => setCount(count + 1)}">
            Check this out ${count} ${element.value}
          </a>`);
      }, 1000);
    });
  };
}

const enhance = compose(
  renderer(render),
  applyMiddleware(logger, createThunkMiddleware())
);

element('todo-app', TodoApp, enhance, {
  observedAttributes: ['value']
});
