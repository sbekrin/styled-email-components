import React from 'react';
import { CHANNEL_NEXT } from 'styled-components/lib/models/ThemeProvider';
import isStyledComponent from 'styled-components/lib/utils/isStyledComponent';
import determineTheme from 'styled-components/lib/utils/determineTheme';
import isValidAttr from 'styled-components/lib/utils/validAttr';
import isTag from 'styled-components/lib/utils/isTag';
import StyleSheet from './stylesheet';
import isVmlTag from './utils/is-vml-tag';

// Based on:
// https://github.com/styled-components/styled-components/blob/master/src/models/StyledNativeComponent.js#L22
class StyledMailComponent extends React.Component {
  static target = null;
  static styledComponentId = '';
  static attrs = {};
  static defaultProps = {};
  static inlineStyle = {};

  unsubscribeId = -1;
  attrs = {};
  state = {
    theme: null,
    generatedStyles: undefined,
  };

  unsubscribeFromContext() {
    if (this.unsubscribeId !== -1) {
      this.context[CHANNEL_NEXT].unsubscribe(this.unsubscribeId);
    }
  }

  buildExecutionContext(theme, props) {
    const { attrs } = this.constructor;
    const context = { ...props, theme };
    if (attrs === undefined) {
      return context;
    }
    this.attrs = Object.keys(attrs).reduce((acc, key) => {
      const attr = attrs[key];
      return {
        ...acc,
        [key]: typeof attr === 'function' ? attr(context) : attr,
      };
    }, {});
    return { ...context, ...this.attrs };
  }

  generateAndInjectStyles(theme, props) {
    const { inlineStyle } = this.constructor;
    const executionContext = this.buildExecutionContext(theme, props);
    return inlineStyle.generateStyleObject(executionContext);
  }

  componentWillMount() {
    const styledContext = this.context[CHANNEL_NEXT];
    if (styledContext !== undefined) {
      const { subscribe } = styledContext;
      this.unsubscribeId = subscribe(nextTheme => {
        const theme = determineTheme(
          this.props,
          nextTheme,
          this.constructor.defaultProps,
        );
        const generatedStyles = this.generateAndInjectStyles(theme, this.props);
        this.setState({ theme, generatedStyles });
      });
    } else {
      const theme = this.props.theme || {};
      const generatedStyles = this.generateAndInjectStyles(theme, this.props);
      this.setState({ theme, generatedStyles });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(prevState => {
      const theme = determineTheme(
        nextProps,
        prevState.theme,
        this.constructor.defaultProps,
      );
      const generatedStyles = this.generateAndInjectStyles(theme, nextProps);
      return { theme, generatedStyles };
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromContext();
  }

  render() {
    const { generatedStyles } = this.state;
    const { target } = this.constructor;
    const props = {
      ...this.attrs,
      ...this.props,
      style: [generatedStyles, this.attrs.style, this.props.style],
    };
    const nextProps = Object.keys(props).reduce((acc, prop) => {
      switch (prop) {
        // Flatten out and resovle all styles
        case 'style':
          return { ...acc, style: StyleSheet.flatten(props.style) };
        // Prevent innerRef of DOM elements
        case 'innerRef':
          const innerRef = props[prop];
          if (isTag(target)) {
            return acc;
          }
          if (isStyledComponent(target)) {
            return { ...acc, innerRef };
          }
          return { ...acc, ref: innerRef };
        // Prevent non-valid DOM or VML attributes
        default:
          if (isTag(target) && !isVmlTag(target) && !isValidAttr(prop)) {
            return acc;
          }
          return { ...acc, [prop]: props[prop] };
      }
    }, {});
    return React.createElement(target, nextProps);
  }
}

export default StyledMailComponent;
