var express = require('express');
var router = express.Router();
var path = require('path');
var auth = require(path.resolve(__dirname, "../firebase/index"));

/* GET polling locations page. */
router.get('/', function(req, res, next) {
  // Grab user from firebase instance
  var user = auth.firebase.auth.currentUser;
  if (user) { // user exists
    res.render('locations', {status: 'Sign Out'});
  }
  else { // return error message
    res.render('locations', {status: 'Login'});
  }
});

module.exports = router;
