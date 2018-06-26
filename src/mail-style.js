import expandHexColor from 'color-shorthand-hex-to-six-digit';
import createInlineStyle from 'styled-components/lib/models/InlineStyle';

export default stylesheet => {
  const InlineStyle = createInlineStyle(stylesheet);
  return class InlineMailStyle extends InlineStyle {
    generateStyleObject(executionContext) {
      const styleId = super.generateStyleObject(executionContext);
      const style = stylesheet.resolve(styleId);
      return Object.keys(style).reduce((acc, rule) => {
        // Transform unitless numbers to pixels
        if (typeof style[rule] === 'number') {
          if (['lineHeight'].includes(rule)) {
            return { ...acc, [rule]: style[rule].toString() };
          }
          return { ...acc, [rule]: `${style[rule]}px` };
        }
        // Expand hex colors
        if (rule.toLowerCase().includes('color')) {
          return { ...acc, [rule]: expandHexColor(style[rule]) };
        }
        return { ...acc, [rule]: style[rule] };
      }, {});
    }
  };
};
