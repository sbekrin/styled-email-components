import { StatelessComponent, ComponentClass } from 'react';
import styled, {
  ThemedStyledInterface,
  css,
  injectGlobal,
  // isStyledComponent,
  ThemeProvider,
  withTheme,
  ServerStyleSheet,
} from 'styled-components';

type Component<P> = ComponentClass<P> | StatelessComponent<P>;

// https://github.com/styled-components/styled-components/pull/1827
declare function isStyledComponent(target: Component<object>): boolean;

export default styled;
export {
  css,
  injectGlobal,
  isStyledComponent,
  ThemeProvider,
  withTheme,
  ServerStyleSheet,
};
