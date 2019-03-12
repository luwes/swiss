import { applyMiddleware, compose, element, renderer } from 'swiss-element';
import thunk from 'swiss-thunk';

function Nav() {
  // Returns a function here enabling delay, condition, split the render.
  return render => {
    render(`<progress class="progress" max="100"></progress>`);

    customElements.whenDefined('s-message').then(() => {
      render(`<s-message></s-message>`);
    });
  };
}

element('s-nav', Nav, compose(applyMiddleware(thunk), renderer()));

function Message() {
  return `
    <article class="message is-success">
      <div class="message-header">
        <p>Success</p>
      </div>
      <div class="message-body">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.
      </div>
    </article>
  `;
}

setTimeout(() => element('s-message', Message), 1000);
