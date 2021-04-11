import validAttr from "@emotion/is-prop-valid";
import hoist from "hoist-non-react-statics";
import React from "react";
import determineTheme from "styled-components/src/utils/determineTheme";
import { EMPTY_ARRAY, EMPTY_OBJECT } from "styled-components/src/utils/empties";
import generateComponentId from "styled-components/src/utils/generateComponentId";
import generateDisplayName from "styled-components/src/utils/generateDisplayName";
import getComponentName from "styled-components/src/utils/getComponentName";
import isTag from "styled-components/src/utils/isTag";
import isFunction from "styled-components/src/utils/isFunction";
import isStyledComponent from "styled-components/src/utils/isStyledComponent";
import merge from "styled-components/src/utils/mixinDeep";
import { ThemeContext } from "styled-components/src/models/ThemeProvider";
import StyleSheet from "./stylesheet";
import isVmlTag from "./is-vml-tag";

const identifiers = {};

/* We depend on components having unique IDs */
function generateId(displayName, parentComponentId) {
  const name = typeof displayName !== "string" ? "sc" : escape(displayName);
  // Ensure that no displayName can lead to duplicate componentIds
  identifiers[name] = (identifiers[name] || 0) + 1;
  const componentId = `${name}-${generateComponentId(
    name + identifiers[name]
  )}`;
  return parentComponentId
    ? `${parentComponentId}-${componentId}`
    : componentId;
}

function useResolvedAttrs(theme = EMPTY_OBJECT, props, attrs) {
  // NOTE: can't memoize this
  // returns [context, resolvedAttrs]
  // where resolvedAttrs is only the things injected by the attrs themselves
  const context = { ...props, theme };
  const resolvedAttrs = {};

  attrs.forEach((attrDef) => {
    let resolvedAttrDef = attrDef;
    let key;

    if (isFunction(resolvedAttrDef)) {
      resolvedAttrDef = resolvedAttrDef(context);
    }

    /* eslint-disable guard-for-in */
    for (key in resolvedAttrDef) {
      context[key] = resolvedAttrs[key] = resolvedAttrDef[key];
    }
    /* eslint-enable guard-for-in */
  });

  return [context, resolvedAttrs];
}

function useStyledComponentImpl(forwardedComponent, props, forwardedRef) {
  const {
    attrs: componentAttrs,
    inlineStyle,
    defaultProps,
    shouldForwardProp,
    target,
  } = forwardedComponent;

  // NOTE: the non-hooks version only subscribes to this when !componentStyle.isStatic,
  // but that'd be against the rules-of-hooks. We could be naughty and do it anyway as it
  // should be an immutable value, but behave for now.
  const theme = determineTheme(
    props,
    React.useContext(ThemeContext),
    defaultProps
  );

  const [context, attrs] = useResolvedAttrs(
    theme || EMPTY_OBJECT,
    props,
    componentAttrs
  );

  const generatedStyles = inlineStyle.generateStyleObject(context);

  const refToForward = forwardedRef;

  const elementToBeCreated =
    attrs.$as || props.$as || attrs.as || props.as || target;

  const isTargetTag = isTag(elementToBeCreated);
  const isTargetVmlTag = isVmlTag(elementToBeCreated);
  const computedProps = attrs !== props ? { ...props, ...attrs } : props;
  const propsForElement = {};

  // eslint-disable-next-line guard-for-in
  for (const key in computedProps) {
    if (key[0] === "$" || key === "as") continue;
    else if (key === "forwardedAs") {
      propsForElement.as = computedProps[key];
    } else if (
      shouldForwardProp
        ? shouldForwardProp(key, validAttr, elementToBeCreated)
        : isTargetVmlTag
        ? true
        : isTargetTag
        ? validAttr(key)
        : true
    ) {
      propsForElement[key] = computedProps[key];
    }
  }

  propsForElement.style = StyleSheet.flatten([
    generatedStyles,
    props.style,
    attrs.style,
  ]);

  propsForElement.ref = refToForward;

  return React.createElement(elementToBeCreated, propsForElement);
}

export default (MailInlineStyle) => {
  const createStyledEmailComponent = (target, options, rules) => {
    const isTargetStyledComp = isStyledComponent(target);

    const {
      displayName = generateDisplayName(target),
      componentId = generateId(options.displayName, options.parentComponentId),
      attrs = EMPTY_ARRAY,
    } = options;

    const styledComponentId =
      options.displayName && options.componentId
        ? `${escape(options.displayName)}-${options.componentId}`
        : options.componentId || componentId;

    // fold the underlying StyledComponent attrs up (implicit extend)
    const finalAttrs =
      isTargetStyledComp && target.attrs
        ? target.attrs.concat(attrs).filter(Boolean)
        : attrs;

    // eslint-disable-next-line prefer-destructuring
    let shouldForwardProp = options.shouldForwardProp;

    if (isTargetStyledComp && target.shouldForwardProp) {
      if (options.shouldForwardProp) {
        // compose nested shouldForwardProp calls
        shouldForwardProp = (prop, filterFn, elementToBeCreated) =>
          target.shouldForwardProp(prop, filterFn, elementToBeCreated) &&
          options.shouldForwardProp(prop, filterFn, elementToBeCreated);
      } else {
        // eslint-disable-next-line prefer-destructuring
        shouldForwardProp = target.shouldForwardProp;
      }
    }

    /**
     * forwardRef creates a new interim component, which we'll take advantage of
     * instead of extending ParentComponent to create _another_ interim class
     */
    let WrappedStyledComponent;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const forwardRef = (props, ref) =>
      useStyledComponentImpl(WrappedStyledComponent, props, ref);

    forwardRef.displayName = displayName;

    WrappedStyledComponent = React.forwardRef(forwardRef);

    WrappedStyledComponent.attrs = finalAttrs;
    WrappedStyledComponent.inlineStyle = new MailInlineStyle(
      isTargetStyledComp ? target.inlineStyle.rules.concat(rules) : rules
    );
    WrappedStyledComponent.displayName = displayName;
    WrappedStyledComponent.shouldForwardProp = shouldForwardProp;

    WrappedStyledComponent.styledComponentId = styledComponentId;

    // fold the underlying StyledComponent target up since we folded the styles
    WrappedStyledComponent.target = isTargetStyledComp ? target.target : target;

    WrappedStyledComponent.withComponent = function withComponent(tag) {
      const { componentId: previousComponentId, ...optionsToCopy } = options;

      const newComponentId =
        previousComponentId &&
        `${previousComponentId}-${escape(getComponentName(tag))}`;

      const newOptions = {
        ...optionsToCopy,
        attrs: finalAttrs,
        componentId: newComponentId,
      };

      return createStyledEmailComponent(tag, newOptions, rules);
    };

    Object.defineProperty(WrappedStyledComponent, "defaultProps", {
      get() {
        return this._foldedDefaultProps;
      },

      set(obj) {
        this._foldedDefaultProps = isTargetStyledComp
          ? merge({}, target.defaultProps, obj)
          : obj;
      },
    });

    hoist(WrappedStyledComponent, target, {
      // all SC-specific things should not be hoisted
      attrs: true,
      inlineStyle: true,
      displayName: true,
      shouldForwardProp: true,
      styledComponentId: true,
      target: true,
      withComponent: true,
    });

    return WrappedStyledComponent;
  };

  return createStyledEmailComponent;
};
