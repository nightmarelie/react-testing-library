const config = require('kcd-scripts/jest');

module.exports = {
  ...config,
  setupFilesAfterEnv: ['./test/setup-env.js'],
  // we have no coverageThreshold on this project...
  coverageThreshold: {},
};
