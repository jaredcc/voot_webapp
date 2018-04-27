var path = require('path');
//var auth = require('./firebase');
var auth = require(path.resolve(__dirname, "./firebase"));


//New user sign up
const doCreateUserWithEmailAndPassword = (email, password) =>
	auth.createUserWithEmailAndPassword(email, password);

//login existing user
const doSignInWithEmailAndPassword = (email, password) =>
	auth.SignInWithEmailAndPassword(email, password);

//Sign out
const doSignOut = () =>
	auth.signOut();

//Password reset
const doPasswordReset = (email) =>
	auth.sendPasswordResetEmail(email);

//Password change
const doPasswordUpdate = (password) =>
	auth.currentUser.updatePassword(password);

module.exports.doCreateUserWithEmailAndPassword = doCreateUserWithEmailAndPassword;
module.exports.doSignInWithEmailAndPassword = doSignInWithEmailAndPassword;
module.exports.doSignOut = doSignOut;
module.exports.doPasswordReset = doPasswordReset;
module.exports.doPasswordUpdate = doPasswordUpdate;
