import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import styled, { css } from '../';

const render = element => ReactTestRenderer.create(element).toJSON();

describe('styled', () => {
  it('works with `styled.component`', () => {
    const Link = styled.a`
      font-weight: bold;
      color: blue;
    `;
    expect(render(<Link>Hey</Link>)).toMatchSnapshot();
  });

  it('works with `styled(Component)`', () => {
    const Link = styled(props => <a {...props} />)`
      font-weight: bold;
      color: green;
    `;
    expect(render(<Link>Hey</Link>)).toMatchSnapshot();
  });

  it('interpolates props-based values correctly', () => {
    const Text = styled.p`
      color: #333;
      font-size: ${props => (props.big ? 32 : 16)}px;
    `;
    expect(render(<Text big>Hey</Text>)).toMatchSnapshot();
  });

  it('composes components', () => {
    const Link = styled.a`
      text-decoration: underline;
      font-size: 16px;
      color: blue;
    `;
    const Button = styled(Link)`
      text-decoration: none;
      font-weight: bold;
      padding: 5px 10px;
      background: blue;
      color: white;
    `;
    const BigButton = styled(Button)`
      padding: 10px 20px;
      font-size: 20px;
    `;
    expect(
      render(<BigButton href="https://example.com">Click me</BigButton>),
    ).toMatchSnapshot();
  });

  it('works with `.attrs`', () => {
    const Action = styled.a.attrs({
      href: 'https://example.com',
      target: 'blank',
    })`
      color: blue;
    `;
    expect(render(<Action>Click me</Action>)).toMatchSnapshot();
  });

  it('works with `.extend`', () => {
    const Text = styled.p`
      font-size: 16px;
      color: #333;
    `;
    const BigText = Text.extend`
      font-size: 32px;
    `;
    expect(render(<BigText>Hey</BigText>)).toMatchSnapshot();
  });

  it('works with `.withComponent`', () => {
    const Text = styled.p`
      color: green;
    `;
    const Heading = Text.withComponent('h1');
    expect(render(<Heading>Hey</Heading>)).toMatchSnapshot();
  });

  it('works with `css` helper', () => {
    const mixin = css`
      color: ${props => (props.primary ? 'blue' : '#333')};
    `;
    const Link = styled.a`
      font-size: 16px;
      ${mixin};
    `;
    expect(render(<Link primary>Click</Link>)).toMatchSnapshot();
  });

  it('warns about nested rules', () => {
    let lastConsoleWarn;
    const originalConsoleWarn = console.warn;
    console.warn = (...message) => (lastConsoleWarn = message.join(' '));
    const Invalid = styled.div`
      color: #333;

      // This would't work
      .nested {
        color: blue;
      }
    `;
    expect(render(<Invalid />)).toMatchSnapshot();
    expect(lastConsoleWarn).toMatchSnapshot();
    console.warn = originalConsoleWarn;
  });

  it('expands style rules', () => {
    const Box = styled.p`
      border: 1px solid #333;
      background: #333;
    `;
    expect(render(<Box />)).toMatchSnapshot();
  });

  it('merges with `style` prop', () => {
    const Link = styled.a`
      font-size: 16px;
      color: red;
    `;
    expect(render(<Link style={{ color: 'blue' }} />)).toMatchSnapshot();
  });
});
