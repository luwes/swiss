import augmentor from 'augmentor';
import { camel, compose, completeAssign, CustomEvent, getNativeConstructor } from './utils.js';

export const CONNECTED = 'connected';
export const DISCONNECTED = 'dis' + CONNECTED;

export function element(...enhancers) {
  let enhancer = compose(...enhancers);
  return (renderFn, options) => enhancedElement(renderFn, enhancer, options);
}

function enhancedElement(renderFn, enhancer, options) {
  if (typeof enhancer !== 'function' && typeof options === 'undefined') {
    options = enhancer;
    enhancer = undefined;
  }

  const Native = getNativeConstructor(options && options.extends);
  function CustomElement() {
    if (typeof enhancer !== 'undefined') {
      if (typeof enhancer !== 'function') {
        throw new Error('Expected the enhancer to be a function.');
      }

      const enhancerRef = enhancer;
      enhancer = undefined;
      const element = enhancerRef(CustomElement)(options);
      init.call(element);
      enhancer = enhancerRef;
      return element;
    }

    if (!(this instanceof CustomElement)) {
      return new CustomElement();
    }

    if (typeof Reflect !== 'undefined') {
      return Reflect.construct(Native, [], this.constructor);
    }
    return Native.call(this);
  }

  const proto = CustomElement.prototype = Object.create(Native.prototype);
  proto.constructor = CustomElement;

  CustomElement.observedAttributes = options && options.observedAttributes || [];
  CustomElement.observedAttributes.forEach(name => {
    // it is possible to redefine the behavior at any time
    // simply overwriting get prop() and set prop(value)
    if (!(name in proto)) Object.defineProperty(
      proto,
      camel(name),
      {
        configurable: true,
        get() {
          return this.getAttribute(name);
        },
        set(value) {
          if (value == null)
            this.removeAttribute(name);
          else
            this.setAttribute(name, value);
        }
      }
    );
  });

  const updates = new WeakMap;

  function init() {
    updates.set(this, augmentor(requestUpdate));
  }

  function requestUpdate() {
    this.renderer(this.renderRoot, render.bind(this));
    return this;
  }

  function update() {
    updates.get(this).call(this);
  }

  function connectedCallback() {
    update.call(this);
    this.dispatchEvent(new CustomEvent(CONNECTED));
  }

  function disconnectedCallback() {
    this.dispatchEvent(new CustomEvent(DISCONNECTED));
  }

  function renderer(root, html) {
    root.innerHTML = html();
  }

  function render() {
    return renderFn.call(this, this);
  }

  function attributeChangedCallback(name, oldValue, newValue) {
    if (this.shouldUpdate(oldValue, newValue)) {
      update.call(this);
    }
  }

  function shouldUpdate(oldValue, newValue) {
    return oldValue !== newValue;
  }

  completeAssign(proto, {
    connectedCallback,
    disconnectedCallback,
    attributeChangedCallback,
    shouldUpdate,
    renderer,
    get renderRoot() {
      return this.shadowRoot || this._shadowRoot || this;
    }
  });

  return CustomElement;
}
