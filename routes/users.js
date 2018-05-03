var express = require('express');
var router = express.Router();
var path = require('path');
var auth = require(path.resolve(__dirname, "../firebase/index"));

/* GET users listing. */
router.get('/', function(req, res, next) {
  // Grab user from firebase instance
  var user = auth.firebase.auth.currentUser;
  if (user) { // user exists
    res.render('users', {status: 'Sign Out'});
  }
  else { // return error message
    res.render('login', {status: 'Login'});
  }
});

router.get('/login', function(req, res, next) {
  // Grab user from firebase instance
  var user = auth.firebase.auth.currentUser;
  if (user) { // user exists
    res.render('signout', {status: 'Sign Out'});
  }
  else { // return error message
    res.render('login', {status: 'Login'});
  }
});

router.post('/login', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  auth.auth.doSignInWithEmailAndPassword(email, password);
  res.render('signout', { status: 'Sign Out'});
});

router.get('/signup', function(req, res, next) {
  // Grab user from firebase instance
  var user = auth.firebase.auth.currentUser;
  if (user) { // user exists
    res.render('signout', {status: 'Sign Out'});
  }
  else { // return error message
    res.render('signup', {status: 'Login'});
  }
});

router.post('/signup', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  auth.auth.doCreateUserWithEmailAndPassword(email, password);
  // res.redirect('/users/login');
  res.render('login', {status: 'Login'});
});

router.get('/signout', function(req, res, next) {
  // Grab user from firebase instance
  var user = auth.firebase.auth.currentUser;
  if (user) { // user exists
    res.render('signout', { status: 'Sign Out'});
  }
  else {
    res.render('signout', { status: 'Login'});
  }
});

router.post('/signout', function(req, res, next) {
  auth.auth.doSignOut();
  res.render('index');
});

module.exports = router;
