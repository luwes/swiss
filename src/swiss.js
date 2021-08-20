import { define, Element, mixins } from './element.js';
import { PropsMixin } from './mixin-props.js';
import { UpdateMixin } from './mixin-update.js';

/**
 * Quick and dirty way to add default mixins.
 * @type {Array}
 * @ignore
 */
mixins.push(PropsMixin, UpdateMixin);

export { define, mixins, Element, PropsMixin, UpdateMixin };
