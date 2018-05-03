var path = require('path');
var auth = require(path.resolve(__dirname, "./auth"));
var database = require(path.resolve(__dirname, "./database"));
var firebase = require(path.resolve(__dirname, "./firebase"));

module.exports = {auth, database, firebase};