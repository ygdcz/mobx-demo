const { version } = require('./package.json');

module.exports = {
  'process.env.VERSION': JSON.stringify(version || '_'),
  'process.env.CI_COMMIT_SHA': JSON.stringify(process.env.CI_COMMIT_SHA || '_'),
  'process.env.CI_BUILD_TIME': JSON.stringify(new Date())
};
