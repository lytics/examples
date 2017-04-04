'use strict';

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect'),
    gutil = require('gulp-util');

gulp.task('build:js', function () {
  gulp.src('src/*.js')
    .pipe(gulp.dest('dist'))
    .pipe(uglify().on('error', gutil.log))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch('src/**/*', ['build:js']);
});

gulp.task('preview', function () {
  connect.server({
    port: 8080,
    root: '.',
    livereload: true
  });
});

gulp.task('default', ['build:js', 'preview', 'watch']);