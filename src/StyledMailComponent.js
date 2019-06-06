import React, { Component, createElement } from 'react';
import isValidAttr from '@emotion/is-prop-valid';
import StyleSheet from 'react-native-web/src/exports/StyleSheet';
import { ThemeConsumer } from 'styled-components/src/models/ThemeProvider';
import determineTheme from 'styled-components/src/utils/determineTheme';
import { EMPTY_OBJECT } from 'styled-components/src/utils/empties';
import isFunction from 'styled-components/src/utils/isFunction';
import isDerivedReactComponent from 'styled-components/src/utils/isDerivedReactComponent';
import isStyledComponent from 'styled-components/src/utils/isStyledComponent';
import isTag from 'styled-components/src/utils/isTag';
import isVmlTag from './utils/isVmlTag';

class StyledMailComponent extends Component {
  attrs = {};

  render() {
    return (
      <ThemeConsumer>
        {theme => {
          const {
            as: renderAs,
            forwardedComponent,
            forwardedRef,
            innerRef,
            style = {},
            ...props
          } = this.props;
          const { defaultProps, target } = forwardedComponent;
          const generatedStyles =
            theme === undefined
              ? this.generateAndInjectStyles(theme || EMPTY_OBJECT, this.props)
              : this.generateAndInjectStyles(
                  determineTheme(this.props, theme, defaultProps),
                  this.props
                );
          const element = renderAs || target;
          const elementProps = {
            ...this.attrs,
            ...props,
            style: StyleSheet.flatten([
              generatedStyles,
              this.attrs.style,
              style,
            ]),
            ref: forwardedRef ? forwardedRef : undefined,
          };
          const filteredProps =
            isTag(target) && !isVmlTag(target)
              ? Object.keys(elementProps).reduce(
                  (acc, prop) =>
                    isValidAttr(prop)
                      ? { ...acc, [prop]: elementProps[prop] }
                      : acc,
                  {}
                )
              : elementProps;
          return createElement(element, filteredProps);
        }}
      </ThemeConsumer>
    );
  }

  buildExecutionContext(theme, props, attrs) {
    const context = { ...props, theme };
    if (!attrs.length) return context;
    this.attrs = {};
    attrs.forEach(attrDef => {
      let resolvedAttrDef = attrDef;
      let attrDefWasFn = false;
      let attr;
      let key;
      if (isFunction(resolvedAttrDef)) {
        resolvedAttrDef = resolvedAttrDef(context);
        attrDefWasFn = true;
      }
      for (key in resolvedAttrDef) {
        attr = resolvedAttrDef[key];
        if (!attrDefWasFn) {
          if (
            isFunction(attr) &&
            !isDerivedReactComponent(attr) &&
            !isStyledComponent(attr)
          ) {
            attr = attr(context);
          }
        }
        this.attrs[key] = attr;
        context[key] = attr;
      }
    });
    return context;
  }

  generateAndInjectStyles(theme, props) {
    const { inlineStyle } = props.forwardedComponent;
    const executionContext = this.buildExecutionContext(
      theme,
      props,
      props.forwardedComponent.attrs
    );
    return inlineStyle.generateStyleObject(executionContext);
  }
}

export default StyledMailComponent;
