'use strict';

var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var run = require('run-sequence');

gulp.task('lint', function () {
    return gulp.src('./lib/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('unit-test', function (done) {
    gulp.src(['./lib/**/*.js'])
        .pipe(istanbul())
        .pipe(istanbul.hookRequire())
        .on('finish', function () {
            gulp.src(['./test/**/*.js'])
                .pipe(mocha({
                    reporter: 'spec'
                }))
                .pipe(istanbul.writeReports())
                .on('end', done);
        });
});

gulp.task('test', function (callback) {
    run(
        'lint',
        'unit-test',
        callback
    );
});
