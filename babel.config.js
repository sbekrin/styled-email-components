module.exports = {
  presets: ["./vendor/styled-components/babel-preset"],
  plugins: [
    // Replace `styled-components/src/*` imports with relative `./vendor/styled-components/*` to let rollup bundle the original sources
    [
      "babel-plugin-module-resolver",
      {
        alias: {
          "styled-components/src":
            "./vendor/styled-components/packages/styled-components/src",
        },
      },
    ],
  ],
};
