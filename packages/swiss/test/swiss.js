import test from 'tape';
import { define } from 'swiss';

test('simple', function(t) {

  define('s-1', {
    props: {
      autoplay: false
    }
  });

  t.end();
});
