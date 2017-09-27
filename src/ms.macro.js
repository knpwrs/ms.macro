import { createMacro, MacroError } from 'babel-macros';
import ms from 'ms';

module.exports = createMacro(({ babel: { types: t }, references: { default: paths } }) => {
  paths.forEach(({ parentPath }) => {
    let value = null;
    if (parentPath.type === 'CallExpression') {
      value = parentPath.node.arguments[0].value;
    } else if (parentPath.type === 'TaggedTemplateExpression') {
      value = parentPath.node.quasi.quasis[0].value.cooked;
    }
    if (value) {
      const newValue = ms(value);
      if (newValue) {
        parentPath.replaceWith(t.numericLiteral(newValue));
      } else {
        const { line } = parentPath.node.loc.start;
        throw new MacroError(`Invalid input given to ms.macro at line ${line}`);
      }
    }
  });
});
