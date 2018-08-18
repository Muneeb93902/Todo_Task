//var username = 'newuser';		// Database username
//var password = 'newuser';		// Database password

var ip = 'localhost';
var database = 'newdb';

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