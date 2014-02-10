// Karma configuration

// base path, that will be used to resolve files and exclude
basePath = '';

// list of files / patterns to load in the browser
files = [
// we use jasmine as test framework
JASMINE, JASMINE_ADAPTER,

// external required ../../main/webapp/vendor lib
    '../lib/underscore/underscore-min.js',
    '../lib/jquery/jquery.min.js',
    '../lib/angular/angular.min.js',
    '../lib/angular-mocks/angular-mocks.js',
    //'../lib/angular-scenario/angular-scenario.js',
    // application src under test
    '../src/**/*.js',
    // test src
    './mock/**/*Mock.js', 
    './spec/**/*Test.js'  ];

preprocessors = {
  '../src/**/*.js' : 'coverage'
};

// list of files to exclude
exclude = [];

// test results reporter to use
// possible values: dots || progress || growl
reporters = [ 'progress', 'coverage', 'junit' ];

// web server port
port = 9090;

// cli runner port
runnerPort = 9900;

// enable / disable colors in the output (reporters and logs)
colors = true;

// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO ||
// LOG_DEBUG
logLevel = LOG_INFO;

// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;

// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
// browsers = [ 'PhantomJS' ];

browsers = [ 'PhantomJS' ];

// If browser does not capture in given timeout [ms], kill it
captureTimeout = 10000;

// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;

coverageReporter = {
  type : 'lcov',
  dir : 'test_output/coverage/'
}

junitReporter = {
  outputFile : 'test_output/js-unit.xml',
  suite : 'e2e'
};
