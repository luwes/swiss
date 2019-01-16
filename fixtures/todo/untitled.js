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
