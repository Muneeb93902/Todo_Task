function signupController($scope, $http) {

	$scope.signForm = function(txt_email, txt_password, txt_username) {
        
        $scope.loaderOverley = true;
        var userBody = {};
        userBody.email = txt_email;
        userBody.password = txt_password;
        userBody.username = txt_username;
        $http.post("/users", userBody)
        .then(function(response){
            $scope.loaderOverley = false;
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

angular.module('SignupCtrl', [])
.controller('signupController', ['$scope', '$http', signupController]);