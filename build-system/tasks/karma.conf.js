import rollupConfig from './rollup.config.js';

function getRollupConfigForTest(config) {
  config.external = config.external || [];
  config.output.globals = config.output.globals || {};
  config.external.push('chai');
  config.output.globals.chai = 'chai';
  return config;
}

module.exports =  {
  frameworks: ['mocha', 'chai'],
  files: ['test/**/*.js'],
  reporters: ['progress'],
  mochaReporter: {
    output: 'full',
    colors: {
      success: 'green',
      error: 'red',
      info: 'yellow'
    },
    symbols: {
      success: '●',
      error: '●',
      info: '○'
    }
  },
  port: 9876,
  colors: true,
  logLevel: 'error',
  browsers: ['Chrome_no_extensions_headless'],
  customLaunchers: {
    Chrome_no_extensions_headless: {
      base: 'ChromeHeadless',
      flags: ['--disable-extensions', '--no-sandbox', '--autoplay-policy=no-user-gesture-required']
    }
  },
  autoWatch: false,
  singleRun: true,
  concurrency: Infinity,
  client: {
    mocha: {
      reporter: 'html'
    }
  },
  preprocessors: {
    'test/**/*.js': ['rollup']
  },
  rollupPreprocessor: getRollupConfigForTest(rollupConfig)
};
