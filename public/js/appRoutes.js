angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: '../view/signup.html',
			controller: 'signupController'
		})

		.when('/login', {
			templateUrl: '../view/login.html',
			controller: 'loginController'
		})

		.when('/forgot', {
			templateUrl: '../view/forgot_password.html',
			controller: 'forgotController'
		})

		.when('/VerifyInvitation', {
			templateUrl: '../view/update_password.html',
			controller: 'resetController'
		})

		.when('/todo', {
			templateUrl: '../view/todo.html',
			controller: 'mainController'	
		});
		
	$locationProvider.html5Mode(true);

}]);