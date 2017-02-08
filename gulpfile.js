'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');
const coveralls = require('gulp-coveralls');

gulp.task('default', ['test']);

gulp.task('test', () => {
  gulp.src('test/index.js', {read: false}).pipe(mocha());
});

gulp.task('coveralls', () => gulp.src('./coverage/lcov.info').pipe(coveralls()));
