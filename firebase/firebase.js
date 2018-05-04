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

  // auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
  // .then(function() {
  //   // Existing and future Auth states are now persisted in the current
  //   // session only. Closing the window would clear any existing state even
  //   // if a user forgets to sign out.
  //   // ...
  //   // New sign-in will be persisted with session persistence.
  //   return firebase.auth().signInWithEmailAndPassword(email, password);
  // })
  // .catch(function(error) {
  //   // Handle Errors here.
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  // });

  const database = firebase.database();

  module.exports = {firebaseUser, auth, database};
