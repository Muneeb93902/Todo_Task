exports.invalidRequestMsg = function () {
	return "Invalid request";
}

exports.databaseConnectionError = function () {
	return "Database connection failed";
}

exports.databaseServerError = function () {
	return "Database server connection failed";
}

exports.emailExistError = function () {
	return "Email Already exist";
}

exports.emailSendError = function () {
	return "Not able to send email";
}

exports.userNotFoundError = function () {
	return "User not found of given credential.";
}

exports.wrongPasswordError = function () {
	return "Wrong old password.";
}