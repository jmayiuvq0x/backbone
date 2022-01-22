var _ = require('underscore');

// Browsers to run on Sauce Labs platforms
var sauceBrowsers = _.reduce([
  ['firefox', 'latest'],
  ['firefox', '60'],
  ['firefox', '40'],
  ['firefox', '11'],

  ['chrome', 'latest'],
  ['chrome', '60'],
  ['chrome', '40'],
  ['chrome', '26'],

  // latest Edge as well as pre-Blink versions
  ['microsoftedge', 'latest', 'Windows 10'],
  ['microsoftedge', '18', 'Windows 10'],
  ['microsoftedge', '13', 'Windows 10'],

  ['internet explorer', 'latest', 'Windows 10'],
  ['internet explorer', '10', 'Windows 8'],
  ['internet explorer', '9', 'Windows 7'],
  // Older versions of IE no longer supported by Sauce Labs

  ['safari', 'latest', 'macOS 11'],
  ['safari', '12', 'macOS 10.14'],
  ['safari', '11', 'macOS 10.13'],
  ['safari', '8', 'OS X 10.10'],

], function(memo, platform) {
  // internet explorer -> ie
  var label = platform[0].split(' ');
  if (label.length > 1) {
    label = _.invoke(label, 'charAt', 0);
  }
  label = (label.join('') + '_v' + platform[1]).replace(' ', '_').toUpperCase();
  memo[label] = _.pick({
    base: 'SauceLabs',
    browserName: platform[0],
    version: platform[1],
    platform: platform[2]
  }, Boolean);
  return memo;
}, {});

module.exports = function(config) {
  if ( !process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY ) {
    // eslint-disable-next-line no-console
    console.log('Sauce environments not set --- Skipping');
    return process.exit(0);
  }

  config.set({
    basePath: '',
    frameworks: ['qunit'],
    singleRun: true,
    browserDisconnectTolerance: 5,
    browserNoActivityTimeout: 240000,

    // list of files / patterns to load in the browser
    files: [
      'test/vendor/jquery.js',
      'test/vendor/json2.js',
      'test/vendor/underscore.js',
      'backbone.js',
      'test/setup/*.js',
      'test/*.js'
    ],

    // Number of sauce tests to start in parallel
    concurrency: 2,

    // test results reporter to use
    reporters: ['dots', 'saucelabs'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    sauceLabs: {
      build: 'GH #' + process.env.GITHUB_RUN_NUMBER + ' (' + process.env.GITHUB_RUN_ID + ')',
      startConnect: true,
      tunnelIdentifier: process.env.GITHUB_JOB
    },

    captureTimeout: 120000,
    customLaunchers: sauceBrowsers,

    // Browsers to launch, commented out to prevent karma from starting
    // too many concurrent browsers and timing sauce out.
    browsers: _.keys(sauceBrowsers)
  });
};
