exports.invalidRequestMsg = function () {
	return "Invalid request";
}

exports.databaseConnectionError = function (moduleName) {
	return "Database connection failed";
}

exports.databaseServerError = function (moduleName) {
	return "Database server connection failed";
}