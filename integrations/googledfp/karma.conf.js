module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    singleRun: false,
    frameworks: ['jasmine'],
    files: [
      '../../entitycallback/dist/index.min.js',
      'dist/index.min.js',
      'test/**/*.spec.js'
    ]
  });
};