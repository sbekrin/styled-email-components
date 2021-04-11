import constructWithOptions from "styled-components/src/constructors/constructWithOptions";
import xhtmlElements from "./xhtml-elements";
import StyleSheet from "./stylesheet";
import createInlineStyle from "./inline-style";
import createStyledEmailComponent from "./styled-email-component";

const InlineStyle = createInlineStyle(StyleSheet);
const StyledEmailComponent = createStyledEmailComponent(InlineStyle);
const styled = (tag) => constructWithOptions(StyledEmailComponent, tag);

// Set xhtml element aliases
xhtmlElements.forEach((element) =>
  Object.defineProperty(styled, element, {
    enumerable: true,
    configurable: false,
    get() {
      return styled(element);
    },
  })
);

// Set VML (v:*), WML (w:*) and Office (o:*) dynamic aliases
["vml", "wml", "office"].forEach((namespace) => {
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
          if (typeof property === "string") {
            return styled(`${namespace.charAt(0)}:${property}`);
          }
          return undefined;
        },
      });
    },
  });
});

export {
  createGlobalStyle,
  css,
  isStyledComponent,
  keyframes,
  ServerStyleSheet,
  StyleSheetConsumer,
  StyleSheetContext,
  StyleSheetManager,
  ThemeConsumer,
  ThemeContext,
  ThemeProvider,
  useTheme,
  version,
  withTheme,
} from "styled-components/src/base";

export default styled;
