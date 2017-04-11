module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    singleRun: true,
    frameworks: ['jasmine'],
    files: [
      'test/fixtures/analytics.js',
      '../../entitycallback/dist/index.min.js',
      'dist/index.min.js',
      'test/**/*.spec.js'
    ]
  });
};