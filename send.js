const admin = require("firebase-admin");
const registeredToken = [];

exports.initializeFCMApp = function () {
	var serviceAccount = require(__dirname + "/" + "dynamic-branch-199113-firebase-adminsdk-9scjn-1a00923620.json");

	admin.initializeApp({
	  credential: admin.credential.cert(serviceAccount),
	  databaseURL: "https://dynamic-branch-199113.firebaseio.com"
	});
};

exports.addRegisteredToken = function (token) {
	registeredToken.push(token);
};

exports.getRegisteredToken = function () {
	return registeredToken;
};

exports.sendMessage = function () {

	var payload = {
	  notification: {
	    title: "This is a Notification",
	    body: "This is the body of the notification message."
	  }
	};

	var options = {
	  priority: "high",
	  timeToLive: 60 * 60 *24
	};

	admin.messaging().sendToDevice(registrationToken, payload, options)
	  .then(function(response) {
	    console.log("Successfully sent message:", response);
	  })
	  .catch(function(error) {
	    console.log("Error sending message:", error);
	});
};

