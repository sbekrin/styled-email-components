# 💌 styled-email-components

[![npm Version](https://img.shields.io/npm/v/styled-email-components.svg?maxAge=0)](https://www.npmjs.com/package/styled-email-components)
[![Build Status](https://img.shields.io/travis/sergeybekrin/styled-email-components.svg?maxAge=0)](https://travis-ci.org/sergeybekrin/styled-email-components)
[![dependencies Status](https://img.shields.io/david/sergeybekrin/styled-email-components.svg?maxAge=0)](https://david-dm.org/sergeybekrin/styled-email-components)
[![devDependencies Status](https://img.shields.io/david/dev/sergeybekrin/styled-email-components.svg?maxAge=0)](https://david-dm.org/sergeybekrin/styled-email-components?type=dev)

`styled-components` but with inline styles designed for emails! This is an
extension of original API which adopts React Native approach of injecting styles
in node or web enviroments.

## Installation

```sh
# yarn
yarn add styled-email-components styled-components

# npm
npm install --save styled-email-components styled-components
```

ℹ️ Tip: Don't forget to install `styled-components` itself as a peer dependency.

## Getting Started

`styled-email-components` uses same syntax to define components, with tagged
template literals:

```js
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import styled from 'styled-email-components';

const Link = styled.a`
  font-family: sans-serif;
  background: blue;
  color: white;
`;

// That works 😱
console.assert(
  renderToStaticMarkup(<Link href="https://example.com">Hey</Link>),
  '<a href="https://example.com" style="font-family:sans-serif;background-color:blue;color:white;">Hey</a>',
);
```

Check original
[Gettings Started](https://www.styled-components.com/docs/basics#getting-started)
for more examples.

## Extra

In addition to full list of html elements, this module provides handy `vml`,
`wml` and `office` namespaces for Outlook-specific needs:

```js
import styled from 'styled-email-components';

const RoundRect = styled.vml.roundrect.attrs({
  arcsize: '10%',
  strokecolor: '#1e3650',
  fill: 'true',
})`
  v-text-anchor: middle;
  height: 40px;
  width: 200px;
`;

export default RoundRect;
```

Note that all `styled.vml.*`, `styled.wml.*` and `styled.office.*` elements are
passed as-is and not name or type checked.

## API

`styled-email-components` supports all of necessary APIs for building great
emails:

- [`styled`](https://www.styled-components.com/docs/api#styled)
  - [`.attrs`](https://www.styled-components.com/docs/api#attrs)
  - [`.extend`](https://www.styled-components.com/docs/api#extend)
  - [`.withComponent`](https://www.styled-components.com/docs/api#withcomponent)
- [`css`](https://www.styled-components.com/docs/api#css)
- [`injectGlobal`](https://www.styled-components.com/docs/api#injectglobal)
- [`isStyledComponent`](https://www.styled-components.com/docs/api#isstyledcomponent)
- [`withTheme`](https://www.styled-components.com/docs/api#withtheme)
- [`ThemeProvider`](https://www.styled-components.com/docs/api#themeprovider)
- [Server-side rendering](https://www.styled-components.com/docs/advanced#server-side-rendering)

## License

MIT &copy; [Sergey Bekrin](http://bekrin.me/)
