import expandRule from "css-shorthand-expand";
import { conv as expandHexColor } from "color-shorthand-hex-to-six-digit";
import camelCase from "lodash.camelcase";

function shouldExpandRule(name) {
  return [
    "background",
    "font",
    "padding",
    "margin",
    "border",
    "border-width",
    "border-style",
    "border-color",
    "border-top",
    "border-right",
    "border-bottom",
    "border-left",
    "border-radius",
    "outline",
  ].includes(name);
}

function convertCssPairsToStyle(rules) {
  return (
    rules
      // Expand shorthand rules
      .reduce((out, [name, value]) => {
        if (shouldExpandRule(name)) {
          const expanded = expandRule(name, value);
          const next = Object.keys(expanded).map((rule) => [
            rule,
            expanded[rule],
          ]);
          return [...out, ...next];
        }
        return [...out, [name, value]];
      }, [])
      // Expand colors to 6 digits
      .reduce((out, [name, value]) => {
        return {
          ...out,
          [camelCase(name)]: /color/i.test(name)
            ? expandHexColor(value)
            : value,
        };
      }, {})
  );
}

export default convertCssPairsToStyle;
