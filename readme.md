# 💌 styled-email-components

[![npm Version](https://img.shields.io/npm/v/styled-email-components.svg)](https://www.npmjs.com/package/styled-email-components)
[![Build Status](https://img.shields.io/travis/sbekrin/styled-email-components.svg)](https://travis-ci.org/sbekrin/styled-email-components)
[![dependencies Status](https://img.shields.io/david/sbekrin/styled-email-components.svg)](https://david-dm.org/sbekrin/styled-email-components)
[![devDependencies Status](https://img.shields.io/david/dev/sbekrin/styled-email-components.svg)](https://david-dm.org/sbekrin/styled-email-components?type=dev)
[![Greenkeeper badge](https://badges.greenkeeper.io/sbekrin/styled-email-components.svg)](https://greenkeeper.io/)

Extension of [styled-components](https://www.styled-components.com/) with
essentials for building email-first components.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Motivation](#motivation)
- [Features](#features)
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
inline styling which is necessary for building mails. This module adds all
missing features to fill the gap and enable you to build mail-first components.

## Features

- Styles are injected inline
- Shorthand rules are expanded
- [`styled.*` aliases](./src/utils/xhtmlElements.js) are XHTML compliant
- [Outlook-specific elements](#styledvml) first-class support
- Compatible with [original APIs](https://www.styled-components.com/docs/api)
- Provides TypeScript typings

## Installation

```sh
# yarn
yarn add styled-email-components styled-components

# npm
npm install --save styled-email-components styled-components
```

## Getting Started

Check original
[Gettings Started](https://www.styled-components.com/docs/basics#getting-started)
guide for more examples.

```js
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import styled from 'styled-email-components';

const Link = styled.a`
  font-family: sans-serif;
  background: blue;
  color: white;
`;

renderToStaticMarkup(<Link href="https://example.com">Hey</Link>),
// 👇 output
// <a href="https://example.com" style="font-family:sans-serif;background-color:blue;color:white;">Hey</a>
```

## API

### `styled.*`

This module sets list of XHTML 1.0 Transitional
[element aliases](./src/utils/xhtmlElements.js) instead of the original HTML5
set, which is a widely used doctype in emails.

### `styled.vml.*`

In addition to XHTML elements, `styled.vml.*`, `styled.wml.*` and
`styled.office.*` aliases are available. These are simple proxies and pass tag
names as-is with `v:`, `w:` and `o:` prefixes respectevly.

### Other APIs

[Original APIs](https://www.styled-components.com/docs/api) are mirrored without
any changes from `styled-components`. Make sure to check
[server-side rendering](https://www.styled-components.com/docs/advanced#server-side-rendering)
guide for rendering the final email.

## License

MIT &copy; [Sergey Bekrin](http://bekrin.me/)
