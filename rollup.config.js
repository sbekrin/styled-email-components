require('babel-register')({
  presets: [['env', { targets: { node: 'current' } }]],
  ignore: [/node_modules\/(?!styled-components)/],
});

const path = require('path');
const babel = require('rollup-plugin-babel');
const alias = require('rollup-plugin-alias');
const configs = require('styled-components-project/packages/styled-components/rollup.config');

const [, , serverConfig, browserConfig] = configs.default;
const patch = config => ({
  ...config,
  plugins: [
    // Adjust babel config to transpile sc itself
    ...config.plugins.map(plugin =>
      plugin.name === 'babel'
        ? babel({
            include: [
              'src/**',
              'node_modules/{styled-components-project,react-native-web}/**',
            ],
            plugins: ['external-helpers'],
          })
        : plugin
    ),
    // Add `styled-components` monorepo alias
    alias({
      'styled-components': path.dirname(
        require.resolve(
          'styled-components-project/packages/styled-components/package.json'
        )
      ),
    }),
  ],
  // Bake in essential internals
  external(id) {
    if (/styled-components\/src|react-native-web\/src/.test(id)) {
      return false;
    }
    if (/styled-components/.test(id)) {
      return true;
    }
    return config.external(id);
  },
  // Output `styled-email-components` instead of `styled-components`
  output: config.output.map(output => {
    return {
      ...output,
      file: output.file.replace('styled-components', 'styled-email-components'),
    };
  }),
});

module.exports = [patch(serverConfig), patch(browserConfig)];
