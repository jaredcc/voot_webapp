var express = require('express');
var router = express.Router();
var path = require('path');
var auth = require(path.resolve(__dirname, "../firebase/index"));

/* GET representatives page. */
router.get('/', function(req, res, next) {
  // Grab user from firebase instance
  var user = auth.firebase.auth.currentUser;
  if (user) { // user exists
    res.render('representatives', {status: 'Sign Out'});
  }
  else { // return error message
    res.render('representatives', {status: 'Login'});
  }
});

router.post('/user-address', function(req, res, next) {
  // TODO: Use firebase to check if logged in. If
  // the user is logged in return their saved address

  // Grab user from firebase instance
  var user = auth.firebase.auth.currentUser;

  if (user) { // user exists
    // Grab user address
  }
  else { // return error message
    res.send('No User Found');
  }
});

module.exports = router;
