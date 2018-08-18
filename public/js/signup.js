function signupController($scope, $http) {

	$scope.signForm = function(txt_email, txt_password) {
        
        var userBody = {};
        userBody.email = txt_email;
        userBody.password = txt_password;
        $http.post("/users", userBody)
        .then(function(response){
            if(response.data.error)
            {
               console.log(response.data.msg);
               alert(response.data.msg);
            }
            else{
                alert("User created successfully.");                 
            }
        });
         
	}
};


function loginController($scope, $http) {

	$scope.signForm = function(txt_email, txt_password) {
            
        var userBody = {};
        userBody.email = txt_email;
        userBody.password = txt_password;
        $http.post("/users/login", userBody)
        .then(function(response){
            if(response.data.error)
            {
               console.log(response.data.msg);
               alert(response.data.msg);
            }
            else{
                alert("User logged in successfully.");              
            }
        });

	}
};


angular.module('sampleApp')
.controller('signupController', ['$scope', '$http',signupController])
.controller('loginController', ['$scope', '$http', loginController]);