'use strict';

var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;

var readcache = require('../lib/readcache');

var testFile = path.join(__dirname, './testfile.json');

describe('readcache', function () {

    it('Reads a file for the first time and caches it', function (done) {
        readcache(testFile, function (err, data, stats) {
            expect(err).to.be.null;
            expect(data).to.be.a('string');
            expect(stats).to.be.an('object');
            expect(stats).to.have.property('hit', false);
            done();
        });
    });

    it('Reads a file for the second time and returns the cached version', function (done) {
        readcache(testFile, function (err, data, stats) {
            expect(err).to.be.null;
            expect(data).to.be.a('string');
            expect(stats).to.be.an('object');
            expect(stats).to.have.property('hit', true);
            done();
        });
    });

    it('Refreshes the cache when the file is modified', function (done) {
        fs.writeFile(testFile, '{"lorem": "ipsum"}', function (err) {
            fs.stat(testFile, function (err, stats) {
                readcache(path.join(testFile), function (err, data, stats) {
                    expect(err).to.be.null;
                    expect(data).to.be.a('string');
                    expect(stats).to.be.an('object');
                    expect(stats).to.have.property('hit', false);
                    done();
                });
            });
        });
    });

    it('Allows using custom options', function (done) {
        readcache(testFile, { encoding: 'utf16' }, function (err, data, stats) {
            expect(err).to.be.null;
            expect(data).to.be.a('string');
            expect(stats).to.be.an('object');
            expect(stats).to.have.property('hit', true);
            done();
        });
    });

    it('Options can be falsy', function (done) {
        readcache(testFile, null, function (err, data, stats) {
            expect(err).to.be.null;
            expect(data).to.be.a('string');
            expect(stats).to.be.an('object');
            expect(stats).to.have.property('hit', true);
            done();
        });
    });

    it('Callback may not be present', function (done) {
        readcache(testFile);
        done();
    });

    it('Throws an error when reading an unexisting file', function (done) {
        readcache(path.join(__dirname, './bogus.json'), function (err/*, data, stats*/) {
            expect(err).to.be.an('error');
            done();
        });
    });
});