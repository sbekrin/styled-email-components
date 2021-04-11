import nodeResolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import json from "rollup-plugin-json";
import flow from "rollup-plugin-flow";
import { terser } from "rollup-plugin-terser";
import sourceMaps from "rollup-plugin-sourcemaps";
import pkg from "./package.json";

/**
 * NODE_ENV explicit replacement is only needed for standalone packages, as webpack
 * automatically will replace it otherwise in the downstream build.
 */

const cjs = {
  exports: "named",
  format: "cjs",
  sourcemap: true,
};

const esm = {
  format: "esm",
  sourcemap: true,
};

const getCJS = (override) => ({ ...cjs, ...override });
const getESM = (override) => ({ ...esm, ...override });

const commonPlugins = [
  flow({
    // needed for sourcemaps to be properly generated
    pretty: true,
  }),
  sourceMaps(),
  json(),
  nodeResolve(),
  babel({
    configFile: require.resolve("./babel.config.js"),
    exclude: ["node_modules/**"],
  }),
  commonjs({
    ignoreGlobal: true,
    namedExports: {
      "react-is": ["isElement", "isValidElementType", "ForwardRef", "typeof"],
    },
  }),
  replace({
    __VERSION__: JSON.stringify(pkg.version),
  }),
];

// this should always be last
const minifierPlugin = terser({
  compress: {
    passes: 2,
  },
  sourcemap: true,
});

const configBase = {
  input: "./src/index.js",

  // \0 is rollup convention for generated in memory modules
  external: (id) =>
    !id.startsWith("\0") && !id.startsWith(".") && !id.startsWith("/"),
  plugins: commonPlugins,
};

const serverConfig = {
  ...configBase,
  output: [
    getESM({ file: "dist/styled-email-components.esm.js" }),
    getCJS({ file: "dist/styled-email-components.cjs.js" }),
  ],
  plugins: configBase.plugins.concat(
    replace({
      __SERVER__: JSON.stringify(true),
    }),
    minifierPlugin
  ),
};

const browserConfig = {
  ...configBase,
  output: [
    getESM({ file: "dist/styled-email-components.browser.esm.js" }),
    getCJS({ file: "dist/styled-email-components.browser.cjs.js" }),
  ],
  plugins: configBase.plugins.concat(
    replace({
      __SERVER__: JSON.stringify(false),
    }),
    minifierPlugin
  ),
};

export default [serverConfig, browserConfig];
