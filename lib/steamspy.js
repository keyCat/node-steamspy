'use strict';

/**
 * Dependencies
 * */

var request = require('request');
var extend = require('deep-extend');

// Module version
var VERSION = require('../package.json').version;

// Module defaults
var DEFAULTS = {
    api_url: 'http://steamspy.com/api.php',
    request_options: {
        headers: {
            'Accept': 'application/json',
            'Connection': 'keep-alive',
            'User-Agent': 'node-steamspy/' + VERSION
        }
    }
};

/**
 * SteamSpy constructor
 * @class
 * @param {Object} options Options object
 * */

function SteamSpy( options ) {
    if ( !(this instanceof SteamSpy) ) return new SteamSpy(options);

    this.VERSION = VERSION;
    this.options = extend(DEFAULTS, options);
    this.__request = request.defaults(this.options.request_options);
}

SteamSpy.prototype = {

    /**
     * Makes a single request to SteamSpy API. Use this in case of absence of shorthands
     * @param {String} method API request method (e.g 'appdetails', 'top100in2weeks')
     * @param {Object} params API request parameters applied to URL querystring (e.g {appid: 730})
     * @param {SteamSpy~requestCallback} cb Callback executed after API response
     * */

    request: function ( method, params, cb ) {
        if ( typeof params === 'function' ) {
            cb = params;
            params = {};
        }
        params = extend(params, {request: method});
        this.__request({
            method: 'get',
            url: this.options.api_url,
            qs: params
        }, function ( err, response, data ) {
            if ( err ) {
                cb(err, response, data);
            } else {
                try {
                    data = JSON.parse(data);
                } catch ( parseError ) {
                    cb(new Error('Status Code: ' + response.statusCode), response, data);
                }

                if ( response.statusCode === 200 ) {
                    cb(null, response, data);
                } else {
                    cb(new Error('Status Code: ' + response.statusCode), response, data);
                }
            }
        });
    },

    // shorthands for API methods below

    /**
     * Returns all games with owners data sorted by owners.
     * @param {SteamSpy~requestCallback} cb Callback executed after API response
     * */

    all: function ( cb ) {
        this.request('all', cb);
    },

    /**
     * Returns details for the specific application. Requires *appid* parameter.
     * @param {Number} appid Steam Application ID. If it's 999999, then data for this application is hidden on developer's request, sorry.
     * @param {SteamSpy~requestCallback} cb Callback executed after API response
     * */

    appdetails: function ( appid, cb ) {
        this.request('appdetails', {appid: appid}, cb);
    },

    /**
     * Returns games in this particular genre. Requires *genre* parameter.
     * @param {String} genre Steam genre string
     * @param {SteamSpy~requestCallback} cb Callback executed after API response
     * */

    genre: function ( genre, cb ) {
        this.request('genre', {genre: genre}, cb);
    },

    /**
     * Returns Top 100 games by players in the last two weeks.
     * @param {SteamSpy~requestCallback} cb Callback executed after API response
     * */

    top100in2weeks: function ( cb ) {
        this.request('top100in2weeks', cb);
    },

    /**
     * Returns Top 100 games by players since March 2009.
     * @param {SteamSpy~requestCallback} cb Callback executed after API response
     * */

    top100forever: function ( cb ) {
        this.request('top100forever', cb);
    },

    /**
     * Returns Top 100 games by owners.
     * @param {SteamSpy~requestCallback} cb Callback executed after API response
     * */

    top100owned: function ( cb ) {
        this.request('top100owned', cb);
    }
};

/**
 * API request callback
 * @callback SteamSpy~requestCallback
 * @param {Error} err Error
 * @param {Object} data Object with API response
 * @param {Object} response HTTP response object
 * */

module.exports = SteamSpy;
