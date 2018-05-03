var express = require('express');
var router = express.Router();
var path = require('path');
var auth = require(path.resolve(__dirname, "../firebase/index"));

/* GET users listing. */
router.get('/', function(req, res, next) {
  // Grab user from firebase instance
  var user = auth.firebase.auth.currentUser;

  console.log('finding user...');

  if (user) { // user exists
    // Grab user address
    console.log("USER FOUND...");
    res.render('users');
  }
  else { // return error message
    res.render('login');
  }
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  console.log('Logging user in...EMAIL: ' + email + ' PASS: ' + password);
  auth.auth.doSignInWithEmailAndPassword(email, password);
  res.redirect('/users');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  auth.auth.doCreateUserWithEmailAndPassword(email, password);
  res.redirect('/users/login');
});

module.exports = router;
