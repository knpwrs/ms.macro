import test from 'ava';
import macroPlugin from 'babel-macros';
import { transform } from 'babel-core';
import { stripIndent } from 'common-tags';

const run = code => transform(code, {
  babelrc: false,
  plugins: [macroPlugin],
  filename: __filename,
}).code.trim();

const expected = stripIndent`
  const ONE_DAY = 86400000;
  const TWO_DAYS = 172800000;
`;

test('CallExpression', (t) => {
  const input = stripIndent`
    import ms from './ms.macro';
    const ONE_DAY = ms('1 day');
    const TWO_DAYS = ms('2 days');
  `;
  const output = run(input);
  t.is(output, expected);
});

test('TaggedTemplateExpression', (t) => {
  const input = stripIndent`
    import ms from './ms.macro';
    const ONE_DAY = ms\`1 day\`;
    const TWO_DAYS = ms\`2 days\`;
  `;
  const output = run(input);
  t.is(output, expected);
});
