'use strict';

var path = require('path');
var expect = require('chai').expect;

var readcache = require('../lib/readcache');

describe('readcache', function () {

    it('Reads a file for the first time and caches it', function (done) {
        readcache(path.join(__dirname, './testdata.json'), function (err, data, stats) {
            expect(err).to.be.null;
            expect(data).to.be.a('string');
            expect(stats).to.be.an('object');
            expect(stats).to.have.property('hit', false);
            done();
        });
    });

    it('Reads a file for the second time and returns the cached version', function (done) {
        readcache(path.join(__dirname, './testdata.json'), function (err, data, stats) {
            expect(err).to.be.null;
            expect(data).to.be.a('string');
            expect(stats).to.be.an('object');
            expect(stats).to.have.property('hit', true);
            done();
        });
    });

    it('Allows using custom options', function (done) {
        readcache(path.join(__dirname, './testdata.json'), { encoding: 'utf16' }, function (err, data, stats) {
            expect(err).to.be.null;
            expect(data).to.be.a('string');
            expect(stats).to.be.an('object');
            expect(stats).to.have.property('hit', true);
            done();
        });
    });

    it('Throws an error when reading an unexisting file', function (done) {
        readcache(path.join(__dirname, './bogus.json'), function (err/*, data, stats*/) {
            expect(err).to.be.an('error');
            done();
        });
    });
});