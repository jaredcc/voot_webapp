var express = require('express');
var router = express.Router();
var path = require('path');
var auth = require(path.resolve(__dirname, "../firebase/index"));
var firebase = require(path.resolve(__dirname, "../firebase/index"));

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

/* GET User's current address. */
router.get('/user-address', function(req, res, next) {
  // Grab user from firebase instance
  var user = auth.firebase.auth.currentUser;
  if (user) { // user exists
    var uid = user.uid;
    var userData;
    firebase.firebase.database.ref('/USERS_TABLE/' + uid).once('value').then(function(snapshot) {
  		userData = {
  			street:(snapshot.val() && snapshot.val().street),
  			state:(snapshot.val() && snapshot.val().state),
  			city:(snapshot.val() && snapshot.val().city),
  			zipcode:(snapshot.val() && snapshot.val().zipcode)
  		};
  	}).then(function() {
      if (!userData.street.trim() || !userData.state.trim() || !userData.city.trim() || !userData.zipcode.trim()) {
        res.send('No User Found');
      } else {
        res.send(userData.street + ' ' + userData.city + ' ' + userData.state + ' ' +userData.zipcode);
      }
    });
  }
  else { // return error message
    res.send('No User Found');
  }
});

module.exports = router;
