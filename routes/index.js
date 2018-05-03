var express = require('express');
var router = express.Router();
var path = require('path');
var auth = require(path.resolve(__dirname, "../firebase/index"));

/* GET home page. */
router.get('/', function(req, res, next) {
  // Grab user from firebase instance
  var user = auth.firebase.auth.currentUser;
  if (user) { // user exists
    res.render('index', {status: 'Sign Out'});
  }
  else { // return error message
    res.render('index', {status: 'Login'});
  }
});

module.exports = router;
