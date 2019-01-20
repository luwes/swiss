const createSimpleRenderer = () => {
  return (createElement) => (options) => {
    const element = createElement(options);

    function renderer(root, html) {
      console.log('simpleRenderer');
      root.innerHTML = html();
    }

    return completeAssign(element, {
      renderer
    });
  };
};

const logger = node => next => (...args) => {
  console.log(1, 'logger');
  const result = next(...args);
  console.log(2, 'logger');
  return result;
};

// const logger2 = node => next => (...args) => {
//   console.log(3, 'logger');
//   const result = next(...args);
//   console.log(4, 'logger');
//   return result;
// };

const enhance = compose(
  applyMiddleware(logger),
  // createSimpleRenderer()
);

// setTimeout(() => {
//   document.querySelector('todo-app').remove();
// }, 1000);

import { html as lithtml, render as litrender } from 'lit-html';

function TodoApp2(element) {
  const [count, setCount] = useState(0);

  return lithtml`
    <a href="#" @click="${() => setCount(count + 1)}">
      Check this out ${count} ${element.value}
    </a>`;
}

const litElement = element(renderer((root, html) => litrender(html(), root)));

customElements.define('todo-app2', litElement(TodoApp2, {
  observedAttributes: ['value']
}));


import { html, render } from 'lighterhtml';
import { applyMiddleware, element, renderer, useState } from 'swiss-element';


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


const lighterElement = element(renderer(render));

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

customElements.define('todo-app', lighterElement(TodoApp, applyMiddleware(logger, createThunkMiddleware()), {
  observedAttributes: ['value']
}));
