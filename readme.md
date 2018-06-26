# 💌 styled-email-components

[![npm Version](https://img.shields.io/npm/v/styled-email-components.svg)](https://www.npmjs.com/package/styled-email-components)
[![Build Status](https://img.shields.io/travis/sergeybekrin/styled-email-components.svg)](https://travis-ci.org/sergeybekrin/styled-email-components)
[![dependencies Status](https://img.shields.io/david/sergeybekrin/styled-email-components.svg)](https://david-dm.org/sergeybekrin/styled-email-components)
[![devDependencies Status](https://img.shields.io/david/dev/sergeybekrin/styled-email-components.svg)](https://david-dm.org/sergeybekrin/styled-email-components?type=dev)

[`styled-components`](https://www.styled-components.com/) for emails. This is an
extension of original API which adopts React Native like approach of injecting
styles.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Motivation](#motivation)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Differences](#differences)
- [API](#api)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Motivation

`styled-components` is a universal styling solution for various target
environments with great developer experience and low learning curve.
Unfortunately there's no way of using it natively to build React-based emails
due to email clients limitations. This module adds all nessecary features to
build mail-first components.

## Installation

```sh
# yarn
yarn add styled-email-components styled-components

# npm
npm install --save styled-email-components styled-components
```

ℹ️ Don't forget to install `styled-components` itself as a peer dependency.

## Getting Started

`styled-email-components` uses same syntax to define components:

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

## Differences

These are key differences compared to original implementation:

- Styles are set inline
- `styled.*` aliases uses
  [XHTML 1.0 Transitional](https://www.w3.org/TR/xhtml1/#a_dtd_XHTML-1.0-Transitional)
  list of elements instead of HTML5
- [Outlook specific](https://en.wikipedia.org/wiki/Vector_Markup_Language)
  `styled.vml.*`, `styled.wml.*` and `styled.office.*` elements are proxied
- Hex colors are expanded to 6 characters

## API

`styled-email-components` modifies only `styled` implementation and mirrors rest
of API as-is:

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
