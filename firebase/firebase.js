var firebase = require('firebase');

//Initialize Firebase
var config = {
    apiKey: "AIzaSyAoT8tW_4Hh89ns4msbumBf9kDaa5CqCgI",
    authDomain: "vootapp-2a028.firebaseapp.com",
    databaseURL: "https://vootapp-2a028.firebaseio.com",
    projectId: "vootapp-2a028",
    storageBucket: "vootapp-2a028.appspot.com",
    messagingSenderId: "108880894642"
};
firebase.initializeApp(config);

// Anytime a login happens (or sign out)
// the current firebase user is updated
// by this function
var authdata = null;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    authdata = user;
  }
  else {
   authdata = null;
  }
});

const auth = firebase.auth();


module.exports.auth = auth;
module.exports.authdata = authdata;
