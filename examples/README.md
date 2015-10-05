# Return format description

  * `appid` - Steam Application ID. If it's 999999, then data for this application is hidden on developer's request, sorry.
  * `owners` - owners of this application on Steam. **Beware of free weekends!**
  * `owners_variance` - variance in owners. The real number of owners lies somewhere on owners +/- owners_variance range.   
  * `players_forever` - people that have played this game since March 2009.
  * `players_forever_variance` - variance for total players.
  * `players_2weeks` - people that have played this game in the last 2 weeks.
  * `players_2weeks_variance` - variance for the number of players in the last two weeks. 
  * `average_forever` - average playtime since March 2009. In minutes.
  * `average_2weeks` - average playtime in the last two weeks. In minutes.
  * `median_forever` - median playtime since March 2009. In minutes.
  * `median_2weeks` - median playtime in the last two weeks. In minutes.
  * `ccu` - peak CCU yesterday.

# Methods

## SteamSpy.request
Main method. All other methods are shorthands that use this method.

```javascript
var SteamSpy = require('steamspy');
var client = new SteamSpy();

/**
 * Makes a single request to SteamSpy API. Use this in case of absence of shorthands
 * @param {String} method API request method (e.g 'appdetails', 'top100in2weeks')
 * @param {Object} params API request parameters applied to URL querystring (e.g {appid: 730})
 * @param {SteamSpy~requestCallback} cb Callback executed after API response
 * */
   
client.request('appdetails', {appid: 10}, function (err, response, data) {
  if ( !err ) {
      console.log(data);
  }
});
```

## SteamSpy.all

Returns all games with owners data sorted by owners.

```javascript
var SteamSpy = require('steamspy');
var client = new SteamSpy();

/**
 * Returns all games with owners data sorted by owners.
 * @param {SteamSpy~requestCallback} cb Callback executed after API response
 * */

client.all(function (err, response, data) {
  if ( !err ) {
      console.log(data);
  }
});
```

## SteamSpy.appdetails

Returns details for the specific application. Requires `appid` parameter.

```javascript
var SteamSpy = require('steamspy');
var client = new SteamSpy();

/**
 * Returns details for the specific application. Requires *appid* parameter.
 * @param {Number} appid Steam Application ID. If it's 999999, then data for this application is hidden on developer's request, sorry.
 * @param {SteamSpy~requestCallback} cb Callback executed after API response
 * */

client.appdetails(730, function (err, response, data) {
  if ( !err ) {
      console.log(data);
  }
});
```

## SteamSpy.genre

Returns games in this particular genre. Requires `genre` parameter.

```javascript
var SteamSpy = require('steamspy');
var client = new SteamSpy();

/**
 * Returns games in this particular genre. Requires *genre* parameter.
 * @param {String} genre Steam genre string
 * @param {SteamSpy~requestCallback} cb Callback executed after API response
 * */

client.genre('Early Access', function (err, response, data) {
  if ( !err ) {
      console.log(data);
  }
});
```

## SteamSpy.top100in2weeks

Returns Top 100 games by players in the last two weeks.

```javascript
var SteamSpy = require('steamspy');
var client = new SteamSpy();

/**
 * Returns Top 100 games by players in the last two weeks.
 * @param {SteamSpy~requestCallback} cb Callback executed after API response
 * */

client.top100in2weeks(function (err, response, data) {
  if ( !err ) {
      console.log(data);
  }
});
```

## SteamSpy.top100forever

Returns Top 100 games by players since March 2009.

```javascript
var SteamSpy = require('steamspy');
var client = new SteamSpy();

/**
 * Returns Top 100 games by players since March 2009.
 * @param {SteamSpy~requestCallback} cb Callback executed after API response
 * */

client.top100forever(function (err, response, data) {
  if ( !err ) {
      console.log(data);
  }
});
```

## SteamSpy.top100owned

Returns Top 100 games by owners.

```javascript
var SteamSpy = require('steamspy');
var client = new SteamSpy();

/**
 * Returns Top 100 games by owners.
 * @param {SteamSpy~requestCallback} cb Callback executed after API response
 * */

client.top100owned(function (err, response, data) {
  if ( !err ) {
      console.log(data);
  }
});
```
