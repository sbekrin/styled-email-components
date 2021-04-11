import generateComponentId from "styled-components/src/utils/generateComponentId";
import flatten from "styled-components/src/utils/flatten";
import parse from "postcss-safe-parser";
import cssToStyle from "./css-to-style";

const generated = new Map();

export const resetStyleCache = () => {
  generated.clear();
};

export default (stylesheet) => {
  return class MailInlineStyle {
    constructor(rules) {
      this.rules = rules;
    }

    generateStyleObject(executionContext) {
      const flatStyles = flatten(this.rules, executionContext).join("");
      const hash = generateComponentId(flatStyles);
      if (!generated.has(hash)) {
        const rules = [];
        parse(flatStyles).each((node) => {
          switch (node.type) {
            case "decl":
              rules.push([node.prop, node.value]);
              return;
            case "comment":
              return;
            default:
              if (process.env.NODE_ENV !== "production") {
                console.warn(
                  `Node of type ${node.type} not supported as an inline style`
                );
              }
          }
        });
        const styles = cssToStyle(rules);
        const instance = stylesheet.create({ generated: styles });
        generated.set(hash, instance.generated);
      }
      return generated.get(hash);
    }
  };
};
