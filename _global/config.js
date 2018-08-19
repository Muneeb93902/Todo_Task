//var username = 'newuser';		// Database username
//var password = 'newuser';		// Database password

var ip = 'localhost';
var database = 'newdb';
var encryptKey = 'thisispassword';
var serverUrl = 'http://localhost:5000';

exports.username = function () {
  return username;
};

exports.password = function () {
  return password;
};

exports.ip = function () {
  return ip;
};

exports.database = function () {
  return database;
};

exports.encryptKey = function () {
  return encryptKey;
};

exports.serverUrl = function () {
  return serverUrl;
};