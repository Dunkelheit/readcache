'use strict';

var benchmark = require('gulp-benchmark');
var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');

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
            gulp.src(['./test/**/*.test.js'])
                .pipe(mocha({
                    reporter: 'spec'
                }))
                .pipe(istanbul.writeReports())
                .on('end', done);
        });
});

gulp.task('benchmark', function () {
    return gulp.src('test/benchmark.js', { read: false })
        .pipe(benchmark({
            reporters: benchmark.reporters.etalon('readcache')
        }));
});

gulp.task('test', ['lint', 'unit-test']);

gulp.task('default', ['test']);