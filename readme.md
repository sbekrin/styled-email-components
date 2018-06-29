# 💌 styled-email-components

[![npm Version](https://img.shields.io/npm/v/styled-email-components.svg)](https://www.npmjs.com/package/styled-email-components)
[![Build Status](https://img.shields.io/travis/sergeybekrin/styled-email-components.svg)](https://travis-ci.org/sergeybekrin/styled-email-components)
[![dependencies Status](https://img.shields.io/david/sergeybekrin/styled-email-components.svg)](https://david-dm.org/sergeybekrin/styled-email-components)
[![devDependencies Status](https://img.shields.io/david/dev/sergeybekrin/styled-email-components.svg)](https://david-dm.org/sergeybekrin/styled-email-components?type=dev)

Extension of [`styled-components`](https://www.styled-components.com/) with
essential features for building email components.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Motivation](#motivation)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [API](#api)
  - [`styled.*`](#styled)
  - [`styled.vml.*`](#styledvml)
  - [Other APIs](#other-apis)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Motivation

`styled-components` is a universal styling solution with great developer
experience and low learning curve. Unfortunately, there's no native support for
inline styling which is essential for building emails. This module adds all
necessary features to build mail-first components.

## Installation

Don't forget to install `styled-components` itself as a peer dependency.

yarn:

```sh
yarn add styled-email-components styled-components
```

npm:

```sh
npm install --save styled-email-components styled-components
```

## Getting Started

Check original
[Gettings Started](https://www.styled-components.com/docs/basics#getting-started)
for more examples.

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

## API

### `styled.*`

This module sets list of XHTML 1.0 Transitional
[element aliases](./src/utils/xhtml-elements.js) instead of original HTML5 set,
which is a widely used doctype in mails.

### `styled.vml.*`

In addition to XHTML elements, `styled.vml.*`, `styled.wml.*` and
`styled.office.*` aliases are available. These are simple proxies and pass tag
names as-is with `v:`, `w:` and `o:` prefixes respectevly.

### Other APIs

[Original APIs](https://www.styled-components.com/docs/api) are mirrored without
any modifications from `styled-components`. Make sure to check
[server-side rendering](https://www.styled-components.com/docs/advanced#server-side-rendering)
for rendering the final email.

## License

MIT &copy; [Sergey Bekrin](http://bekrin.me/)
