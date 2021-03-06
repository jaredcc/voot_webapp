var firebase = require('firebase');
var firebaseui = require('firebaseui');
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  //signInSuccessUrl: //localhost:3000,
  signInOptions: [
    // providers you want to offer your users.
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ]
};
var ui;

function startFirebase() {
  ui.start('#firebaseui-auth-container', uiConfig)
}

window.onload = function () {
  // firebase = require('firebase');
  // firebaseui = require('firebaseui');
  ui = new firebaseui.auth.AuthUI(firebase.auth());

  startFirebase();
}
