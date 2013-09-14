var events = require('events');
var eventEmitter = new events.EventEmitter();

var request = require('request');
var _ = require('underscore');

var baseURL = 'https://api.vineapp.com';
var version = '1.3.2';
var userAgent = 'iphone/' + version + ' (iPhone; iOS 7.0; Scale/2.00)';
var vineClient = 'ios/' + version;

var self;

function Twine(args, callback){

	self = this;

	if(args && args.username && args.password){
		self.auth(args.username, args.password, function(user){
			self.setSession(user);
		})
	}

	var key;
	var userId;

}

Twine.prototype = new events.EventEmitter;

Twine.prototype.auth = function(username, password, callback){
	request.post(baseURL + '/users/authenticate', {form:{"deviceToken":randomString(64), "username": username, "password": password}}, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var data = JSON.parse(body).data;
			callback(data);
		}
	})
}

Twine.prototype.setSession = function(args, callback){
	this.key = args.key;
	this.userId = args.userId;

	self.emit('loggedIn');
	if(callback){
		callback(args);
	}
}

Twine.prototype.getUser = function(userId, callback){

	request({url : baseURL + '/users/profiles/' + userId, headers: {"vine-session-id" : this.key , "User-Agent" : userAgent, "X-Vine-Client" : vineClient} }, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			callback(JSON.parse(body).data);
		}
		else {
			console.log(response);
		}
	})
}

Twine.prototype.getMe = function(callback){

	request({url : baseURL + '/users/me', headers: {"vine-session-id" : this.key , "User-Agent" : userAgent, "X-Vine-Client" : vineClient} }, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			callback(JSON.parse(body).data);
		}
		else {
			console.log(response);
		}
	})
}

Twine.prototype.getTimeline = function(callback){

	request({url : baseURL + '/timelines/graph', headers: {"vine-session-id" : this.key , "User-Agent" : userAgent, "X-Vine-Client" : vineClient} }, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			callback(JSON.parse(body).data);
		}
		else {
			console.log(response);
		}
	})
}

Twine.prototype.getUserTimeline = function(userId, callback){

	request({url : baseURL + '/timelines/users/' + userId , headers: {"vine-session-id" : this.key , "User-Agent" : userAgent, "X-Vine-Client" : vineClient} }, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			callback(JSON.parse(body).data);
		}
		else {
			console.log(response);
		}
	})
}

Twine.prototype.searchUsers = function(query, callback){

	request({url : baseURL + '/users/search/' + query , headers: {"vine-session-id" : this.key , "User-Agent" : userAgent, "X-Vine-Client" : vineClient} }, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			callback(JSON.parse(body).data);
		}
		else {
			console.log(response);
		}
	})
}

// Helpers

function randomString(length){
	var data = "";
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	_(length || 16).times(function(){ data += possible[_.random(possible.length-1)]; });

	return data;
}

module.exports = Twine;