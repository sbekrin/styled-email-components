import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import prettier from 'prettier';
import styled from 'styled-email-components';

const format = html => prettier.format(html, { parser: 'html' });

describe('namespace', () => {
  it('supports vml, wml and office namespaces', () => {
    const RoundRect = styled.vml.roundrect.attrs({
      arcsize: '10%',
      strokecolor: '#1e3650',
      fill: 'true',
    })`
      v-text-anchor: middle;
      height: 40px;
      width: 200px;
    `;
    const Lock = styled.wml.anchorlock``;
    const Fill = styled.vml.fill.attrs({
      type: 'tile',
      src: 'https://i.imgur.com/0xPEf.gif',
      color: '#556270',
    })``;
    const Text = styled.center`
      font-family: sans-serif;
      font-weight: bold;
      font-size: 13px;
      color: #fff;
    `;
    const Button = ({ children, ...rest }) => (
      <RoundRect {...rest}>
        <Lock />
        <Fill />
        <Text>{children}</Text>
      </RoundRect>
    );
    expect(
      format(
        renderToStaticMarkup(
          <Button href="https://example.com">Click me</Button>
        )
      )
    ).toMatchSnapshot(`
"
<v:roundrect arcsize=\\"10%\\"
  strokecolor=\\"#1e3650\\"
  fill=\\"true\\"
  href=\\"https://example.com\\"
  style=\\"v-text-anchor:middle;height:40px;width:200px\\">
  <w:anchorlock />

  <v:fill type=\\"tile\\"
    src=\\"https://i.imgur.com/0xPEf.gif\\"
    color=\\"#556270\\" />

  <center style=\\"font-family:sans-serif;font-weight:bold;font-size:13px;color:#ffffff\\">Click me
  </center>
</v:roundrect>"
`);
  });
});
