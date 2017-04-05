module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    singleRun: true,
    frameworks: ['jasmine'],
    files: [
      'dist/index.min.js',
      'test/**/*.spec.js'
    ]
  });
};