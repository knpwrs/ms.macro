import test from 'ava';
import foo from './';

test('sanity check', (t) => {
  t.is(foo, 'foo');
});
