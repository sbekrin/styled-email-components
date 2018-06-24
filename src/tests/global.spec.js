import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { injectGlobal, ServerStyleSheet } from '../';

describe('global', () => {
  const Document = props => {
    injectGlobal`
      html {
        color: ${props.color};
      }
    `;
    return <html {...props} />;
  };

  it('works with `injectGlobal`', () => {
    const sheet = new ServerStyleSheet();
    renderToStaticMarkup(sheet.collectStyles(<Document color="blue" />));
    expect(sheet.getStyleTags()).toMatchSnapshot();
  });
});
