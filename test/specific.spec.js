import React from "react";
import ReactTestRenderer from "react-test-renderer";
import styled from "../src";

const render = (element) => ReactTestRenderer.create(element).toJSON();

describe("specific", () => {
  it("supports mail-specific props", () => {
    const MsoComponent = styled.center`
      mso-hide: all;
    `;
    expect(render(<MsoComponent />)).toMatchInlineSnapshot(`
<center
  style={
    Object {
      "msoHide": "all",
    }
  }
/>
`);
  });

  it("supports vml specific elements", () => {
    const AnchorLock = styled("w:anchorlock")``;
    expect(render(<AnchorLock />)).toMatchInlineSnapshot(`
<w:anchorlock
  style={Object {}}
/>
`);
  });

  it("supports custom attributes", () => {
    const RoundRect = styled.vml.roundrect.attrs({
      "xmlns:v": "urn:schemas-microsoft-com:vml",
      "xmlns:w": "urn:schemas-microsoft-com:office:word",
    })``;
    expect(render(<RoundRect />)).toMatchInlineSnapshot(`
<v:roundrect
  style={Object {}}
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:w="urn:schemas-microsoft-com:office:word"
/>
`);
  });

  it("outputs correct units", () => {
    const Box = styled.center`
      padding: 10px;
      margin: 10in;
      left: -1em;
      right: 5pt;
      line-height: 1.2;
    `;
    expect(render(<Box />)).toMatchInlineSnapshot(`
<center
  style={
    Object {
      "left": "-1em",
      "lineHeight": "1.2",
      "marginBottom": "10in",
      "marginLeft": "10in",
      "marginRight": "10in",
      "marginTop": "10in",
      "paddingBottom": "10px",
      "paddingLeft": "10px",
      "paddingRight": "10px",
      "paddingTop": "10px",
      "right": "5pt",
    }
  }
/>
`);
  });

  it("expands color to 6 digits", () => {
    const Color = styled.p`
      color: #000;
      border: 1px solid #333;
    `;
    expect(render(<Color />)).toMatchInlineSnapshot(`
<p
  style={
    Object {
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
      "color": "#000000",
    }
  }
/>
`);
  });
});
