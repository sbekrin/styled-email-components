// This script installs transitive devDependencies of SC required for build
const { spawnSync } = require('child_process');
const pkg = require('styled-components-project/package.json');

const transitiveDepedencies = pkg.devDependencies;
const buildDependencies = Object.entries(transitiveDepedencies)
  .filter(([name]) => name.startsWith('babel') || name.startsWith('rollup'))
  // .map(([name, version]) => [name, version.replace(/^\^|^~/, '')])
  .map(([name, version]) => [name, version].join('@'));

spawnSync('yarn', ['add', '--dev', ...buildDependencies], { stdio: 'inherit' });
