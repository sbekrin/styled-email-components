import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import styled, { withTheme, ThemeProvider } from '../';

describe('theme', () => {
  it('works with `styled.component`', () => {
    const Link = styled.a`
      color: ${props => props.theme.color};
    `;
    expect(
      renderToStaticMarkup(
        <ThemeProvider theme={{ color: 'green' }}>
          <Link>Link</Link>
        </ThemeProvider>,
      ),
    ).toMatchSnapshot();
  });

  it('works with `styled(Component)`', () => {
    const Heading = props => <h1 {...props} />;
    const StyledHeading = styled(Heading)`
      font-size: ${props => props.theme.size};
    `;
    expect(
      renderToStaticMarkup(
        <ThemeProvider theme={{ size: '30px' }}>
          <StyledHeading>Hey</StyledHeading>
        </ThemeProvider>,
      ),
    ).toMatchSnapshot();
  });

  it('works with `withTheme`', () => {
    const Component = ({ theme, innerRef, ...rest }) => <div {...rest} />;
    const ThemedComponent = withTheme(Component);
    const WrapperComponent = props => <ThemedComponent {...props} />;
    const StyledComponent = styled(WrapperComponent)``;
    expect(
      renderToStaticMarkup(
        <ThemeProvider theme={{ attribute: 42 }}>
          <StyledComponent />
        </ThemeProvider>,
      ),
    ).toMatchSnapshot();
  });
});
