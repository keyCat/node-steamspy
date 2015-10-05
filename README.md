[![Build Status](https://travis-ci.org/keyCat/node-steamspy.svg?branch=master)](https://travis-ci.org/keyCat/node-steamspy) [![NPM](https://nodei.co/npm/steamspy.png?mini=true)](https://www.npmjs.com/package/steamspy)

# SteamSpy for Node.js
An asynchronous client library for the [SteamSpy](http://steamspy.com/) [API](http://steamspy.com/api.php).

```javascript
var SteamSpy = require('steamspy');

var client = new SteamSpy();

client.all(function (err, response, data) {
  if ( !err ) {
      console.log(data);
  }
});
```

## Installation

`npm install steamspy`

## Options

You may want to supply options to new instance:

```javascript
var SteamSpy = require('steamspy');
var client = new SteamSpy({
    // defaults
    api_url: 'http://steamspy.com/api.php',
    request_options: {
      headers: {
        'Accept': 'application/json',
        'Connection': 'keep-alive',
        'User-Agent': 'node-steamspy/' + VERSION
      }
    }
});
```

`api_url` - API URL

`request_options` - options object for the [request](https://github.com/request/request) module

Generally, you should be ok with default options.

## Usage

[API return format description](https://github.com/keyCat/node-steamspy/tree/master/examples#return-format-description)

Methods:

* [SteamSpy.request](https://github.com/keyCat/node-steamspy/tree/master/examples#steamspyrequest)
* [SteamSpy.all](https://github.com/keyCat/node-steamspy/tree/master/examples#steamspyall)
* [SteamSpy.appdetails](https://github.com/keyCat/node-steamspy/tree/master/examples#steamspyappdetails)
* [SteamSpy.genre](https://github.com/keyCat/node-steamspy/tree/master/examples#steamspygenre)
* [SteamSpy.top100in2weeks](https://github.com/keyCat/node-steamspy/tree/master/examples#steamspytop100in2weeks)
* [SteamSpy.top100forever](https://github.com/keyCat/node-steamspy/tree/master/examples#steamspytop100forever)
* [SteamSpy.top100owned](https://github.com/keyCat/node-steamspy/tree/master/examples#steamspytop100owned)

## Caveats

There is a limit on the number of requests you can make per second, as stated in the [kind of documentation](http://steamspy.com/api.php):

```
Allowed poll rate - 4 requests per second.
```

This library does not provide any queuing/throttling solution and you probably would want to make it specific to your application.

## License

Copyright (c) 2015 Ilya Gorbachevsky

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

