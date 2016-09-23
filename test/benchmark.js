'use strict';

var Benchmark = require('benchmark');
var path = require('path');
var fs = require('fs');

var readcache = require('../lib/readcache');

var suite = new Benchmark.Suite;

suite.add('readcache', {
    defer: true,
    fn: function (deferred) {
        readcache(path.join(__dirname, 'testfile.json'), function () {
            deferred.resolve();
        })
    }
}).add('readFile', {
    defer: true,
    fn: function (deferred) {
        fs.readFile(path.join(__dirname, 'testfile.json'), function () {
            deferred.resolve();
        });
    }
}).add('require', {
    defer: true,
    fn: function (deferred) {
        var json = require('./testfile.json');
        deferred.resolve();
    }
});

module.exports = suite;