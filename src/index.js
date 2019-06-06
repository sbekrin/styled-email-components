import {
  css,
  keyframes,
  createGlobalStyle,
  isStyledComponent,
  ThemeConsumer,
  ThemeContext,
  ThemeProvider,
  withTheme,
  ServerStyleSheet,
  StyleSheetManager,
} from 'styled-components';
import createStyledNativeComponent from 'styled-components/src/models/StyledNativeComponent';
import constructWithOptions from 'styled-components/src/constructors/constructWithOptions';
import StyleSheet from 'react-native-web/src/exports/StyleSheet';
import xhtmlElements from './utils/xhtmlElements';
import createMailStyle from './InlineMailStyle';
import StyledMailComponent from './StyledMailComponent';

const InlineStyle = createMailStyle(StyleSheet);
const StyledNativeComponent = createStyledNativeComponent(InlineStyle);
const styled = tag =>
  constructWithOptions(StyledNativeComponent, tag, {
    ParentComponent: StyledMailComponent,
  });

// Set xhtml element aliases
xhtmlElements.forEach(element =>
  Object.defineProperty(styled, element, {
    enumerable: true,
    configurable: false,
    get() {
      return styled(element);
    },
  })
);

// Set VML (v:*), WML (w:*) and Office (o:*) dynamic aliases
['vml', 'wml', 'office'].forEach(namespace => {
  Object.defineProperty(styled, namespace, {
    enumerable: true,
    configurable: false,
    get() {
      const target = {};
      return new Proxy(target, {
        get(object, property) {
          if (property in object) {
            return object[property];
          }
          if (typeof property === 'string') {
            return styled(`${namespace.charAt(0)}:${property}`);
          }
          return undefined;
        },
      });
    },
  });
});

export default styled;
export {
  css,
  keyframes,
  createGlobalStyle,
  isStyledComponent,
  ThemeConsumer,
  ThemeContext,
  ThemeProvider,
  withTheme,
  ServerStyleSheet,
  StyleSheetManager,
};
