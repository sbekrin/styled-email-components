import React from "react";
import ReactTestRenderer from "react-test-renderer";
import styled, { css } from "../src";

const render = (element) => ReactTestRenderer.create(element).toJSON();

describe("styled", () => {
  it("works with `styled.component`", () => {
    const Link = styled.a`
      font-weight: bold;
      color: blue;
    `;
    expect(render(<Link>Hey</Link>)).toMatchInlineSnapshot(`
<a
  style={
    Object {
      "color": "blue",
      "fontWeight": "bold",
    }
  }
>
  Hey
</a>
`);
  });

  it("works with `styled(Component)`", () => {
    const Link = styled((props) => <a {...props} />)`
      font-weight: bold;
      color: green;
    `;
    expect(render(<Link>Hey</Link>)).toMatchInlineSnapshot(`
<a
  style={
    Object {
      "color": "green",
      "fontWeight": "bold",
    }
  }
>
  Hey
</a>
`);
  });

  it("interpolates props-based values correctly", () => {
    const Text = styled.p`
      color: #333;
      font-size: ${(props) => (props.big ? 32 : 16)}px;
    `;
    expect(render(<Text big>Hey</Text>)).toMatchInlineSnapshot(`
<p
  style={
    Object {
      "color": "#333333",
      "fontSize": "32px",
    }
  }
>
  Hey
</p>
`);
  });

  it("composes components", () => {
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
    expect(render(<BigButton href="https://example.com">Click me</BigButton>))
      .toMatchInlineSnapshot(`
<a
  href="https://example.com"
  style={
    Object {
      "backgroundColor": "blue",
      "color": "white",
      "fontSize": "20px",
      "fontWeight": "bold",
      "paddingBottom": "10px",
      "paddingLeft": "20px",
      "paddingRight": "20px",
      "paddingTop": "10px",
      "textDecoration": "none",
    }
  }
>
  Click me
</a>
`);
  });

  it("works with `.attrs`", () => {
    const Action = styled.a.attrs({
      href: "https://example.com",
      target: "blank",
    })`
      color: blue;
    `;
    expect(render(<Action>Click me</Action>)).toMatchInlineSnapshot(`
<a
  href="https://example.com"
  style={
    Object {
      "color": "blue",
    }
  }
  target="blank"
>
  Click me
</a>
`);
  });

  it("works with `.withComponent`", () => {
    const Text = styled.p`
      color: green;
    `;
    const Heading = Text.withComponent("h1");
    expect(render(<Heading>Hey</Heading>)).toMatchInlineSnapshot(`
<h1
  style={
    Object {
      "color": "green",
    }
  }
>
  Hey
</h1>
`);
  });

  it("works with `css` helper", () => {
    const mixin = css`
      color: ${(props) => (props.primary ? "blue" : "#333")};
    `;
    const Link = styled.a`
      font-size: 16px;
      ${mixin};
    `;
    expect(render(<Link primary>Click</Link>)).toMatchInlineSnapshot(`
<a
  style={
    Object {
      "color": "blue",
      "fontSize": "16px",
    }
  }
>
  Click
</a>
`);
  });

  it("warns about nested rules", () => {
    let lastConsoleWarn;
    const originalConsoleWarn = console.warn;
    console.warn = (...message) => (lastConsoleWarn = message.join(" "));
    const Invalid = styled.div`
      color: #333;

      // This won't work
      .nested {
        color: blue;
      }
    `;
    expect(render(<Invalid />)).toMatchInlineSnapshot(`
<div
  style={
    Object {
      "color": "#333333",
    }
  }
/>
`);
    expect(lastConsoleWarn).toMatchInlineSnapshot(
      `"Node of type rule not supported as an inline style"`
    );
    console.warn = originalConsoleWarn;
  });

  it("expands style rules", () => {
    const Box = styled.p`
      border: 1px solid #333;
      background: #333;
    `;
    expect(render(<Box />)).toMatchInlineSnapshot(`
<p
  style={
    Object {
      "backgroundColor": "#333333",
      "borderBottomColor": "#333333",
      "borderBottomStyle": "solid",
      "borderBottomWidth": "1px",
      "borderLeftColor": "#333333",
      "borderLeftStyle": "solid",
      "borderLeftWidth": "1px",
      "borderRightColor": "#333333",
      "borderRightStyle": "solid",
      "borderRightWidth": "1px",
      "borderTopColor": "#333333",
      "borderTopStyle": "solid",
      "borderTopWidth": "1px",
    }
  }
/>
`);
  });

  it("overrides and merges styles by value from `style` prop", () => {
    const Link = styled.a`
      font-size: 16px;
      color: red;
    `;
    expect(render(<Link style={{ color: "blue" }} />)).toMatchInlineSnapshot(`
<a
  style={
    Object {
      "color": "blue",
      "fontSize": "16px",
    }
  }
/>
`);
  });

  it("overrides and merges styles by value from `.attrs`", () => {
    const Link = styled.a.attrs({
      style: {
        color: "red",
      },
    })`
      font-size: 16px;
      color: blue;
    `;
    expect(render(<Link />)).toMatchInlineSnapshot(`
<a
  style={
    Object {
      "color": "red",
      "fontSize": "16px",
    }
  }
/>
`);
  });

  it("works with styles-returning function API", () => {
    const Link = styled.a(({ color }) => ({ color }));
    expect(render(<Link color="blue" />)).toMatchInlineSnapshot(`
<a
  color="blue"
  style={
    Object {
      "color": "blue",
    }
  }
/>
`);
  });
});
