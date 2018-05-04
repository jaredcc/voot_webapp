var path = require('path');
var database = require(path.resolve(__dirname, "./firebase"));


//New user sign up write data
const writeUserData = (uid, firstname, lastname, email, street, state, city, zipcode, electionReminders) =>
	database.database.ref('USERS_TABLE/' + uid).set({
		firstname: firstname,
		lastname: lastname,
		email: email,
		street: street,
		state: state,
		city: city,
		zipcode: zipcode,
		electionReminders: electionReminders
	});

var userData;
//read all data associated with a user
function readUserData(uid){
	var userRef = database.database.ref('/USERS_TABLE/' + uid);
	userRef.once('value').then(function(snapshot) {
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
		return userData;
	});

}


module.exports.writeUserData = writeUserData;
module.exports.readUserData = readUserData;
