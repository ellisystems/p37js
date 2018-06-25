import gulpcore from 'gulp';
import gulphelp from 'gulp-help';
import minimist from 'minimist';
import { Server as Karma } from 'karma';
import webserver from 'gulp-webserver';
import defaultKarmaConf from './karma.conf';
import app from '../app';

const gulp = gulphelp(gulpcore);


const argv = minimist(process.argv.slice(2));

// In spirit and some cases practice, based on:
// https://github.com/ampproject/amphtml/blob/master/build-system/tasks/runtime-test.js
export const TestTask = {
  _karmaConf: {},
  setOpts: function(args) {
    // http://karma-runner.github.io/2.0/config/configuration-file.html
    const config = {};
    if (args.level || args.verbose) {
      config.logLevel = args.level;
      console.log('DEBUG: args -', args);
    }
    if (args.watch || args.w) {
      config.singleRun = false;
    }
    if (args.port || args.p) {
      const port = args.port || args.p;
      config.port = port;
    }
    if (args.host || args.h) {
      const host = args.host || args.h;
      config.hostname = host;
    }
    if (args.chrome) {
      config.browsers = ['Chrome'];
    }
    if (args.reporter) {
      config.reporters = [args.reporter];
    }
    return config;
  },
  getKarmaConf: function(assigns) {
    return Object.assign({}, defaultKarmaConf, assigns || {});
  },
  run: function() {
    if (argv.verbose) {
      console.log('DEBUG:', __filename);
    }
    let resolver;
    const deferred = new Promise(resolverIn => {resolver = resolverIn;});
    const opts = this.setOpts(argv);
    const config = this.getKarmaConf(opts);

    if (argv.verbose) {
      console.log('DEBUG: karma.conf', JSON.stringify(config));
    }

    const server = gulp.src(process.cwd(), {base: '.'}).pipe(webserver({
      port: 31862,
      host: 'localhost',
      directoryListing: true,
      middleware: [app]
    }).on('kill', function() {
      console.log('Shutting down test server on localhost:31862');
    }));
    new Karma(config, function(exitCode) {
      server.emit('kill');
      resolver();
      return Promise.resolve(exitCode);
    }).on('run_start', function() {
      resolver();
    }).on('run_complete', function() {
      return Promise.resolve({ msg: 'success' });
    }).on('browser_complete', function(browser) {
      return Promise.resolve({ msg: 'success' });
    }).start();
    return deferred.then(() => {
      return Promise.resolve(0);
    });
  }
};

gulp.task('test', 'Runs tests', [], function() {
  return TestTask.run();
}, {
  options: {
    'verbose': '  debug logging enabled',
    'port': '  port, karma server port',
    'host': '  port, karma server host name',
    'watch': '  turn off karma singleRun',
    'chrome': '  run in Chrome browser. Default: headless chrome',
    'reporter': '  karma reporter. Default: progress',
    'level': '  karma log level error|warn|info|debug . Default: error'
  }
});
