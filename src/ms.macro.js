import { createMacro } from 'babel-macros';
import ms from 'ms';

module.exports = createMacro(({ babel: { types: t }, references: { default: paths } }) => {
  paths.forEach(({ parentPath }) => {
    if (parentPath.type === 'CallExpression') {
      parentPath.replaceWith(t.numericLiteral(ms(parentPath.node.arguments[0].value)));
    }
  });
});
