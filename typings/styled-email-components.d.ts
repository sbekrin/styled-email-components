import * as React from 'react'
import {
  css,
  keyframes,
  injectGlobal,
  isStyledComponent,
  consolidateStreamedStyles,
  ThemeProvider,
  withTheme,
  ServerStyleSheet,
  StyleSheetManager,
  ThemedStyledFunction,
  StyledComponentClass,
} from 'styled-components';

// #region xhtmltypes
export interface XHTMLElements {
  a: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
  abbr: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  acronym: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  address: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  applet: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  area: React.DetailedHTMLProps<React.HTMLAttributes<HTMLAreaElement>, HTMLAreaElement>;
  b: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  base: React.DetailedHTMLProps<React.BaseHTMLAttributes<HTMLBaseElement>, HTMLBaseElement>;
  basefont: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  bdo: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  big: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  blockquote: React.DetailedHTMLProps<React.BlockquoteHTMLAttributes<HTMLElement>, HTMLElement>;
  body: React.DetailedHTMLProps<React.HTMLAttributes<HTMLBodyElement>, HTMLBodyElement>;
  br: React.DetailedHTMLProps<React.HTMLAttributes<HTMLBRElement>, HTMLBRElement>;
  button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
  caption: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  center: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  cite: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  code: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  col: React.DetailedHTMLProps<React.ColHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>;
  colgroup: React.DetailedHTMLProps<React.ColgroupHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>;
  dd: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  del: React.DetailedHTMLProps<React.DelHTMLAttributes<HTMLElement>, HTMLElement>;
  dfn: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  dir: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  dl: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDListElement>, HTMLDListElement>;
  dt: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  em: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  fieldset: React.DetailedHTMLProps<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement>;
  font: React.DetailedHTMLProps<React.HTMLAttributes<HTMLFontElement>, HTMLFontElement>;
  form: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;
  h1: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
  h2: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
  h3: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
  h4: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
  h5: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
  h6: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
  head: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadElement>, HTMLHeadElement>;
  hr: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHRElement>, HTMLHRElement>;
  html: React.DetailedHTMLProps<React.HtmlHTMLAttributes<HTMLHtmlElement>, HTMLHtmlElement>;
  i: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  iframe: React.DetailedHTMLProps<React.IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>;
  img: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
  input: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  ins: React.DetailedHTMLProps<React.InsHTMLAttributes<HTMLModElement>, HTMLModElement>;
  isindex: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  kbd: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  label: React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;
  legend: React.DetailedHTMLProps<React.HTMLAttributes<HTMLLegendElement>, HTMLLegendElement>;
  li: React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>;
  link: React.DetailedHTMLProps<React.LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>;
  map: React.DetailedHTMLProps<React.MapHTMLAttributes<HTMLMapElement>, HTMLMapElement>;
  menu: React.DetailedHTMLProps<React.MenuHTMLAttributes<HTMLElement>, HTMLElement>;
  meta: React.DetailedHTMLProps<React.MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>;
  noframes: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  noscript: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  object: React.DetailedHTMLProps<React.ObjectHTMLAttributes<HTMLObjectElement>, HTMLObjectElement>;
  ol: React.DetailedHTMLProps<React.OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>;
  optgroup: React.DetailedHTMLProps<React.OptgroupHTMLAttributes<HTMLOptGroupElement>, HTMLOptGroupElement>;
  option: React.DetailedHTMLProps<React.OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>;
  p: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
  param: React.DetailedHTMLProps<React.ParamHTMLAttributes<HTMLParamElement>, HTMLParamElement>;
  pre: React.DetailedHTMLProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement>;
  q: React.DetailedHTMLProps<React.QuoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>;
  s: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  samp: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  script: React.DetailedHTMLProps<React.ScriptHTMLAttributes<HTMLScriptElement>, HTMLScriptElement>;
  select: React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
  small: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  span: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
  strike: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  strong: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  style: React.DetailedHTMLProps<React.StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement>;
  sub: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  sup: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  table: React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>;
  tbody: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
  td: React.DetailedHTMLProps<React.TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>;
  textarea: React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
  tfoot: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
  th: React.DetailedHTMLProps<React.ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement>;
  thead: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
  title: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTitleElement>, HTMLTitleElement>;
  tr: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>;
  tt: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  u: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  ul: React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>;
  var: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
}
// #endregion

// #region vmlelements
export type VMLAttrs = { [attr: string]: any };
export interface VMLElements {
  shape: React.DetailedHTMLProps<VMLAttrs, HTMLElement>;
  shapetype: React.DetailedHTMLProps<VMLAttrs, HTMLElement>;
  group: React.DetailedHTMLProps<VMLAttrs, HTMLElement>;
  background: React.DetailedHTMLProps<VMLAttrs, HTMLElement>;
  path: React.DetailedHTMLProps<VMLAttrs, HTMLElement>;
  formulas: React.DetailedHTMLProps<VMLAttrs, HTMLElement>;
  handles: React.DetailedHTMLProps<VMLAttrs, HTMLElement>;
  fill: React.DetailedHTMLProps<VMLAttrs, HTMLElement>;
  stroke: React.DetailedHTMLProps<VMLAttrs, HTMLElement>;
  shadow: React.DetailedHTMLProps<VMLAttrs, HTMLElement>;
  textbox: React.DetailedHTMLProps<VMLAttrs, HTMLElement>;
  textpath: React.DetailedHTMLProps<VMLAttrs, HTMLElement>;
  imagedata: React.DetailedHTMLProps<VMLAttrs, HTMLElement>;
  line: React.DetailedHTMLProps<VMLAttrs, HTMLElement>;
  polyline: React.DetailedHTMLProps<VMLAttrs, HTMLElement>;
  curve: React.DetailedHTMLProps<VMLAttrs, HTMLElement>;
  roundrect: React.DetailedHTMLProps<VMLAttrs, HTMLElement>;
  oval: React.DetailedHTMLProps<VMLAttrs, HTMLElement>;
  arc: React.DetailedHTMLProps<VMLAttrs, HTMLElement>;
  image: React.DetailedHTMLProps<VMLAttrs, HTMLElement>;
}
// #endregion

// Helpers, copied from styled-components.d.ts
type KeyofBase = keyof any;
type Diff<T extends KeyofBase, U extends KeyofBase> = ({ [P in T]: P } & { [P in U]: never })[T];
type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;
type WithOptionalTheme<P extends { theme?: T; }, T> = Omit<P, 'theme'> & { theme?: T; };

// Re-define all types with XHTML elements
type ThemedStyledComponentFactories<T> = {
  [TTag in keyof XHTMLElements]: ThemedStyledFunction<XHTMLElements[TTag], T>
};
export interface ThemedBaseStyledInterface<T> extends ThemedStyledComponentFactories<T> {
  <P, TTag extends keyof XHTMLElements>(tag: TTag): ThemedStyledFunction<P, T, P & XHTMLElements[TTag]>;
  <P, O>(component: StyledComponentClass<P, T, O>): ThemedStyledFunction<P, T, O>;
  <P extends { [prop: string]: any; theme?: T }>(component: React.ComponentType<P>): ThemedStyledFunction<P, T, WithOptionalTheme<P, T>>;
}
export type BaseStyledInterface = ThemedBaseStyledInterface<any>;
export type ThemedStyledInterface<T> = ThemedBaseStyledInterface<T>;

// Define vml.*, wml.* and office.* proxy
type AnyAttrs<T> = { [attr: string]: T };
type NamespacedElementFactory<T> = {
  [tag: string]: ThemedStyledFunction<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & AnyAttrs<any>, HTMLElement>, T>
}
type VMLNamespaceFactory<T> = {
  [TTag in keyof VMLElements]: ThemedStyledFunction<VMLElements[TTag], T>
}
type WMLNamespaceFactory<T> = {
  [tag: string]: ThemedStyledFunction<any, T>
}
type OfficeNamespaceFactory<T> = {
  [tag: string]: ThemedStyledFunction<any, T>
}
interface NamespacedStyledInterface<T> extends ThemedStyledInterface<T> {
  vml: VMLNamespaceFactory<any>,
  wml: WMLNamespaceFactory<any>,
  office: OfficeNamespaceFactory<any>,
}

// Re-export it
export type StyledInterface = NamespacedStyledInterface<any>;
declare const styled: StyledInterface;

export default styled;
export {
  css,
  keyframes,
  injectGlobal,
  isStyledComponent,
  consolidateStreamedStyles,
  ThemeProvider,
  withTheme,
  ServerStyleSheet,
  StyleSheetManager,
};
