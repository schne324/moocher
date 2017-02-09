'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');
const coveralls = require('gulp-coveralls');

process.env['COVERALLS_REPO_TOKEN'] = 'QVGNfyhtN1G9JRG5f7jm7nFCkg61w4L9K';

gulp.task('default', ['test-coverage', 'coveralls']);

gulp.task('test', () => {
  return gulp.src('test/index.js', {read: false})
    .pipe(mocha());
});

gulp.task('test-coverage', ['pre-coverage'], () => {
  return gulp.src('test/index.js', {read: false})
    .pipe(mocha())
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
});

gulp.task('pre-coverage', () => {
  return gulp.src('index.js')
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('coveralls', () => {
  return gulp.src('/coverage/lcov.info')
    .pipe(coveralls());
});
