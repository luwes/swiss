import { CustomEventPonyfill as CE } from '../src/utils.js';

it('should ponyfill the CustomEvent', function() {
  const event = new CE('test');
  const handler = sinon.spy();
  document.body.addEventListener('test', handler);
  document.body.dispatchEvent(event);

  expect(handler).to.have.been.calledOnce;
});
