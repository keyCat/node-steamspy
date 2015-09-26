var assert = require('chai').assert;
var nock = require('nock');

var SteamSpy = require('../lib/steamspy');
var VERSION = require('../package.json').version;

describe('SteamSpy', function () {

    describe('Constructor', function () {
        var DEFAULTS = {};
        before(function () {
            DEFAULTS = {
                api_url: 'http://steamspy.com/api.php',
                request_options: {
                    headers: {
                        'Accept': 'application/json',
                        'Connection': 'keep-alive',
                        'User-Agent': 'node-steamspy/' + VERSION
                    }
                }
            };
        });

        it('creates new instance', function () {
            var client = new SteamSpy();
            assert.instanceOf(client, SteamSpy);
        });

        it('new instance has defaults', function () {
            var client = new SteamSpy();
            assert.deepEqual(DEFAULTS, client.options);
        });

        it('accepts and overrides options', function () {
            var opts = {
                api_url: 'http://google.com',
                custom: true,
                request_options: {
                    'Connection': 'close'
                }
            };
            var client = new SteamSpy(opts);
            assert.equal(client.options.api_url, opts.api_url);
            assert.ok(client.options.custom);
            assert.equal(client.options.request_options['Connection'], opts.request_options['Connection'])
        });

        it('new instance has request object', function () {
            var client = new SteamSpy();
            assert.property(client, '__request');
        });
    });

    describe('Methods', function () {

        describe('request', function () {
            it('exist', function () {
                var client = new SteamSpy();
                assert.isFunction(client.request);
            });

            it('makes get requests to api_url', function ( done ) {
                var url = 'http://node.steamspy';
                var method = 'all';
                var client = new SteamSpy({api_url: url});
                nock(url).get('/').query({request: method}).reply(200, {});
                client.request(method, function ( err, response ) {
                    assert.equal(response.statusCode, 200);
                    assert.isNull(err);
                    done();
                });
            });

            it('returns error when request is failing', function ( done ) {
                var url = 'http://node.steamspy';
                var method = 'all';
                var client = new SteamSpy({api_url: url});
                nock(url).get('/').query({request: method}).replyWithError({message: 'HTTP Error', code: 'GENERIC_HTTP_ERROR'});
                client.request(method, function ( err ) {
                    assert.isNotNull(err);
                    assert.equal(err.code, 'GENERIC_HTTP_ERROR');
                    done();
                });
            });

            it('returns error when response status !== 200', function ( done ) {
                var url = 'http://node.steamspy';
                var method = 'all';
                var client = new SteamSpy({api_url: url});

                nock(url).get('/').query({request: method}).reply(403, {});
                client.request(method, function ( err, response ) {
                    assert.equal(response.statusCode, 403);
                    assert.isNotNull(err);
                    done();
                });
            });

            it('returns error when response is empty', function ( done ) {
                var url = 'http://node.steamspy';
                var method = 'all';
                var client = new SteamSpy({api_url: url});

                nock(url).get('/').query({request: method}).reply(200);
                client.request(method, function ( err ) {
                    assert.isNotNull(err);
                    done();
                });
            });
        });

        describe('all', function () {
            it('exist', function () {
                var client = new SteamSpy();
                assert.isFunction(client.all);
            });
        });

        describe('appdetails', function () {
            it('exist', function () {
                var client = new SteamSpy();
                assert.isFunction(client.appdetails);
            });
        });

        describe('genre', function () {
            it('exist', function () {
                var client = new SteamSpy();
                assert.isFunction(client.genre);
            });
        });

        describe('top100in2weeks', function () {
            it('exist', function () {
                var client = new SteamSpy();
                assert.isFunction(client.top100in2weeks);
            });
        });

        describe('top100forever', function () {
            it('exist', function () {
                var client = new SteamSpy();
                assert.isFunction(client.top100forever);
            });
        });

        describe('top100owned', function () {
            it('exist', function () {
                var client = new SteamSpy();
                assert.isFunction(client.top100owned);
            });
        });
    });
});
