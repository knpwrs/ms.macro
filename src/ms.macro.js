import { createMacro } from 'babel-macros';
import ms from 'ms';

module.exports = createMacro(({ babel: { types: t }, references: { default: paths } }) => {
  paths.forEach(({ parentPath }) => {
    if (parentPath.type === 'CallExpression') {
      const value = ms(parentPath.node.arguments[0].value);
      parentPath.replaceWith(t.numericLiteral(value));
    } else if (parentPath.type === 'TaggedTemplateExpression') {
      const value = ms(parentPath.node.quasi.quasis[0].value.cooked);
      parentPath.replaceWith(t.numericLiteral(value));
    }
  });
});
