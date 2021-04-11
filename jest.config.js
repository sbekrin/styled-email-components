module.exports = {
  testPathIgnorePatterns: ["/node_modules/", "/vendor/"],
  transformIgnorePatterns: ["/node_modules/(?!styled-components).+\\.js$"],
  setupFiles: ['./vendor/styled-components/packages/styled-components/src/test/globals.js']
} 