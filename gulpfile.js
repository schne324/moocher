'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');

gulp.task('test', () => {
  gulp.src('test/index.js', {read: false}).pipe(mocha());
});
