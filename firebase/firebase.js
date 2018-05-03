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


  var firebaseUser = null;
  const auth = firebase.auth();

  auth.onAuthStateChanged(function(user) {
    if(user){
      firebaseUser = user;
    }
    else {
      firebaseUser = null;
    }
  });

  const database = firebase.database();

  module.exports = {firebaseUser, auth, database};