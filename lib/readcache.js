'use strict';

/**
 * @module readcache
 */

var fs = require('fs');

var cache = {};

/**
 * Reads a text file and stores it in the cache.
 *
 * @param {string} path - Path to the file you want to read.
 * @param {object} [options] - Optional options object, passed to fs.readFile.
 * @param {string} [options.encoding=utf8] - The expected string encoding, will default to `utf8`.
 * @param {string} [options.flag] - The flag, will default to fs.readFile's
 * @param {function} [callback] - A callback function with signature `function (err, data, stats)`
 */
module.exports = function (path, options, callback) {
    if (typeof options === 'function') {
        callback = options;
        options = {};
    }

    options = options || {};
    options.encoding = options.encoding || 'utf8';

    callback = callback || function () {};

    fs.stat(path, function (err, stats) {
        if (err) {
            return callback(err);
        }
        var document = cache[path];
        if (document && document.mtime >= stats.mtime.getTime()) {
            return callback(null, document.data, { hit: true, mtime: document.mtime });
        }
        fs.readFile(path, options, function (err, data) {
            if (err) {
                return callback(err);
            }
            var mtime = stats.mtime.getTime();
            cache[path] = {
                data: data,
                mtime: mtime
            };
            callback(null, data, { hit: false, mtime: mtime });
        });
    });
};
