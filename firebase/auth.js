var path = require('path');
//var auth = require('./firebase');
var firebase = require(path.resolve(__dirname, "./firebase"));


//New user sign up
const doCreateUserWithEmailAndPassword = (email, password) =>
	firebase.auth.createUserWithEmailAndPassword(email, password);

//login existing user
const doSignInWithEmailAndPassword = (email, password) =>
	firebase.auth.signInWithEmailAndPassword(email, password)
		.catch(function(error){
			console.log(error);
	});

//Sign out
const doSignOut = () =>
	firebase.auth.signOut();

//Password reset
const doPasswordReset = (email) =>
	firebase.auth.sendPasswordResetEmail(email);

//Password change
const doPasswordUpdate = (password) =>
	firebase.auth.currentUser.updatePassword(password);

module.exports.doCreateUserWithEmailAndPassword = doCreateUserWithEmailAndPassword;
module.exports.doSignInWithEmailAndPassword = doSignInWithEmailAndPassword;
module.exports.doSignOut = doSignOut;
module.exports.doPasswordReset = doPasswordReset;
module.exports.doPasswordUpdate = doPasswordUpdate;
