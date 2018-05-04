var express = require('express');
var router = express.Router();
var path = require('path');
var auth = require(path.resolve(__dirname, "../firebase/index"));
var database = require(path.resolve(__dirname, "../firebase/index"));
var firebase = require(path.resolve(__dirname, "../firebase/index"));

/* GET users listing. */
router.get('/', function(req, res, next) {
  // Grab user from firebase instance
  var user = auth.firebase.auth.currentUser;
  if (user) { // user exists
    var uid = user.uid;
    database.database.readUserData(uid);
    /*res.render('users', {status: 'Sign Out', firstname: userData.firstname, lastname: userData.lastname, email: userData.email, street: userData.street, state: userData.state, city: userData.city, county: userData.county, zipcode: userData.zipcode});*/
  } else { // return error message
    res.render('login', {status: 'Login'});
  }
});

router.get('/profile', function(req, res, next) {
  // Grab user from firebase instance
  var user = auth.firebase.auth.currentUser;
  if (user) { // user exists
    var uid = user.uid;
    var userData;
    firebase.firebase.database.ref('/USERS_TABLE/' + uid).once('value').then(function(snapshot) {
  		userData = {
  			firstname:(snapshot.val() && snapshot.val().firstname),
  			lastname:(snapshot.val() && snapshot.val().lastname),
  			email:(snapshot.val() && snapshot.val().email),
  			street:(snapshot.val() && snapshot.val().street),
  			state:(snapshot.val() && snapshot.val().state),
  			city:(snapshot.val() && snapshot.val().city),
  			county:(snapshot.val() && snapshot.val().county),
  			zipcode:(snapshot.val() && snapshot.val().zipcode)
  		};
  	}).then(function() {
      console.log(userData);
      res.render('users', {
        status: 'Sign Out',
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        street: userData.street,
        state: userData.state,
        city: userData.city,
        county: userData.county,
        zipcode: userData.zipcode
      });
    });

  } else { // return error message
    res.render('login', {status: 'Login'});
  }
});

router.get('/login', function(req, res, next) {
  // Grab user from firebase instance
  var user = auth.firebase.auth.currentUser;
  if (user) { // user exists
    res.render('signout', {status: 'Sign Out'});
  } else { // return error message
    res.render('login', {status: 'Login'});
  }
});

router.post('/login', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  auth.auth.doSignInWithEmailAndPassword(email, password);
  res.render('signout', {status: 'Sign Out'});
});

router.get('/signup', function(req, res, next) {
  // Grab user from firebase instance
  var user = auth.firebase.auth.currentUser;
  if (user) { // user exists
    res.render('signout', {status: 'Sign Out'});
  } else { // return error message
    res.render('signup', {status: 'Login'});
  }
});

router.post('/signup', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  auth.auth.doCreateUserWithEmailAndPassword(email, password).then(function() {
    auth.auth.doSignInWithEmailAndPassword(email, password).then(function() {
      var firstname = req.body.firstname;
      var lastname = req.body.lastname;
      var email = req.body.email;
      var street = req.body.address;
      var state = req.body.state;
      var city = req.body.city;
      var county = req.body.county;
      var zipcode = req.body.zipcode;
      // var user = firebase.firebase.firebaseUser;
      var user = auth.firebase.auth.currentUser;
      var uid = user.uid;
      database.database.writeUserData(uid, firstname, lastname, email, street, state, city, county, zipcode, "true");
      res.redirect('/users/profile');
    });
  });
});

router.get('/signout', function(req, res, next) {
  // Grab user from firebase instance
  var user = auth.firebase.auth.currentUser;
  if (user) { // user exists
    res.render('signout', {status: 'Sign Out'});
  } else {
    res.render('signout', {status: 'Login'});
  }
});

router.post('/signout', function(req, res, next) {
  auth.auth.doSignOut();
  res.render('login', {status: 'Login'});
});

module.exports = router;
