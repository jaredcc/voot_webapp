var express = require('express');
var router = express.Router();
var path = require('path');
var auth = require(path.resolve(__dirname, "../firebase/index"));
var firebase = require(path.resolve(__dirname, "../firebase/index"));

/* GET elections page. */
router.get('/', function(req, res, next) {
  // Grab user from firebase instance
  var user = auth.firebase.auth.currentUser;
  if (user) { // user exists
    res.render('elections', {status: 'Sign Out'});
  }
  else { // return error message
    res.render('elections', {status: 'Login'});
  }
});

router.get('/user-state', function(req, res, next) {
  var user = auth.firebase.auth.currentUser;
  if (user) { // user exists
    var uid = user.uid;
    var userData;
    firebase.firebase.database.ref('/USERS_TABLE/' + uid).once('value').then(function(snapshot) {
  		userData = {
  			state:(snapshot.val() && snapshot.val().state)
  		};
  	}).then(function() {
      if (!userData.state.trim()) {
        res.send('No User Found');
      } else {
        res.send(userData.state);
      }
    });
  }
  else { // return error message
    res.send('No User Found');
  }
});

module.exports = router;
