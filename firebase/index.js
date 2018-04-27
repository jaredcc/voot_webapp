var path = require('path');
var auth = require(path.resolve(__dirname, "./auth"));
var firebase = require(path.resolve(__dirname, "./firebase"));

module.exports = {auth, firebase};