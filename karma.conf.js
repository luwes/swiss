// Karma configuration
// Generated on Fri Jan 18 2019 07:34:40 GMT-0500 (Eastern Standard Time)

const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const istanbul = require('rollup-plugin-istanbul');

process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],

    // list of files / patterns to load in the browser
    files: [
      { pattern: 'packages/*/test/**/*.js', type: 'module' },
      { pattern: 'packages/*/src/**/*.js', type: 'module' },
      { pattern: 'packages/*/node_modules/*/esm/**/*.js', type: 'module' },
    ],

    // list of files / patterns to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'packages/*/test/**/*.js': ['rollup']
    },

    rollupPreprocessor: {
        output: {
            format: 'iife', // Helps prevent naming collisions.
            name: 'swissElement', // Required for 'iife' format.
            sourcemap: 'inline' // Sensible for testing.
        },
        preserveSymlinks: true,
        plugins: [
            nodeResolve({
              module: true,
              jsnext: true
            }),
            commonjs(),
            istanbul({
                include: 'packages/*/src/**/*.js'
            })
        ]
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
      reporters: [
        { type: 'text' },
        {type: 'lcov'}
      ]
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeCustom'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    customLaunchers: {
      ChromeCustom: {
        base: 'ChromeHeadless',
        options: {
          settings: {
            webSecurityEnabled: false
          }
        },
        flags: [
          '--headless',
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-gpu',
          '--disable-web-security',
          '--disable-translate',
          '--disable-extensions',
          '--remote-debugging-port=9223'
        ],
        debug: true
      }
    }
  });
};
