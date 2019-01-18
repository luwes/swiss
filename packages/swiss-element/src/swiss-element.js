import augmentor from './augmentor.js';
import {
  camel,
  compose,
  completeAssign,
  CustomEvent,
  getNativeConstructor
} from './utils.js';

export const CONNECTED = 'connected';
export const DISCONNECTED = 'dis' + CONNECTED;

export function element(...enhancers) {
  return (component, enhancer, options) => {
    if (typeof enhancer !== 'function' && typeof options === 'undefined') {
      options = enhancer;
      enhancer = undefined;
    }
    return enhancedElement(
      component,
      compose(
        enhancer,
        ...enhancers
      ),
      options
    );
  };
}

function enhancedElement(component, enhancer, options) {
  const Native = getNativeConstructor(options && options.extends);
  function SwissElement() {
    if (typeof enhancer !== 'undefined') {
      if (typeof enhancer !== 'function') {
        throw new Error('Expected the enhancer to be a function.');
      }

      const enhancerRef = enhancer;
      enhancer = undefined;
      const element = enhancerRef(SwissElement)(options);
      init.call(element);
      enhancer = enhancerRef;
      return element;
    }

    if (!(this instanceof SwissElement)) {
      return new SwissElement();
    }

    if (typeof Reflect !== 'undefined') {
      return Reflect.construct(Native, [], this.constructor);
    }
    return Native.call(this);
  }

  const proto = (SwissElement.prototype = Object.create(Native.prototype));
  proto.constructor = SwissElement;

  SwissElement.observedAttributes =
    (options && options.observedAttributes) || [];
  SwissElement.observedAttributes.forEach(name => {
    // it is possible to redefine the behavior at any time
    // simply overwriting get prop() and set prop(value)
    if (!(name in proto))
      Object.defineProperty(proto, camel(name), {
        configurable: true,
        get() {
          return this.getAttribute(name);
        },
        set(value) {
          if (value == null) this.removeAttribute(name);
          else this.setAttribute(name, value);
        }
      });
  });

  const updates = new WeakMap();
  let isRendering = false;

  function init() {
    updates.set(this, augmentor(patch.bind(this)));
  }

  function patch() {
    const fragment = component.call(this, this);
    return this.render.call(this, fragment);
  }

  function render(fragment) {
    if (isRendering) {
      throw new Error('Render loop.');
    }

    try {
      isRendering = true;
      this.renderer(this.renderRoot, () => fragment);
    } finally {
      isRendering = false;
    }

    return fragment;
  }

  function renderer(root, html) {
    root.innerHTML = html();
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
    render,
    get renderRoot() {
      return this.shadowRoot || this._shadowRoot || this;
    }
  });

  return SwissElement;
}
