# readcache

`readcache` is a module to keep the contents of a file cached in memory until
it's modified. This is done by comparing the file's `fs.Stats.mtime`.

Originally meant to be used with JSON files, but anything else will do. It
will save you a bunch of `fs.readFile` until it's actually necessary, and
it's less "persistent" than loading JSON files using `require`.

## Installation

Using npm:

```
npm install readcache
```

## Reference

### readcache.readfile (path, [options], [callback])

Gets the contents of the file at `path`.

If the file is not cached yet, or if the file has been modified since the time
it was cached, the file will be read and its contents cached. Otherwise, you
will get the cached contents.

```js
var readcache = require('readcache');

readcache('/path/to/file', function (err, data, stats) {
    console.log(data); // Contents of the file
    console.log(stats); // { "hit": false, "mtime": 1439974339996 }
        
    // The file is cached now, so this time the contents will be coming from 
    // memory, instead of reading the file again
    readcache('/path/to/file', function (err, data, stats) {
        console.log(stats); // { "hit": true, "mtime": 1439974339996 }
    });
});
```

__Arguments__

* `options` - Optional set of options passed to `fs.readFile`
    * `encoding` - The string encoding, defaults to `utf8`
    * `flag` - Defaults to `r`
* `callback` - Optional callback function with signature `(err, data, stats)`
    * `err` - Error, if any
    * `data` - The contents of the file
    * `stats` - Statistics object
        * `hit` - `true` when the cache was hit, `false` otherwise
        * `mtime` - The last known modification time of the cached file

## License

The MIT License (MIT)

Copyright (c) 2015 Arturo Martínez

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.