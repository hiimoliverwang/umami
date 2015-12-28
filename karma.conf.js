// Karma configuration
// Generated on Wed Dec 16 2015 12:04:53 GMT-0800 (PST)

module.exports = function(config) {

  var configuration = {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha','chai'],


    // list of files / patterns to load in the browser
    files: [
      'client/lib/angular/angular.js',
      'client/lib/angular-route/angular-route.js',
      'client/lib/angular-nlp-compromise/dist/angular-nlp-compromise.min.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'client/app/**/*.js',
      'specs/client/services.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'client/app/**/*.js': ['babel']
    },
    babelPreprocessor: {
      options: {
        presets: ['es2015'],
        sourceMap: 'inline'
      },
      filename: function (file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','nyan','unicorn'],


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
    browsers: ["Chrome"],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    }



  };

  if (process.env.TRAVIS) {
    configuration.browsers = ['Chrome_travis_ci'];
    configuration.autoWatch = false;
  }

  config.set(configuration)
}
