function signupController($scope, $http) {

	$scope.signForm = function(txt_email, txt_password, txt_username) {
 
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(txt_username == undefined || txt_email == undefined || txt_password == undefined || txt_email.trim().length == 0 || txt_password.trim().length == 0 || txt_username.trim().length == 0)
        {
            alert("Missing field(s).");
        }   
        else if(!re.test(txt_email)){
            alert("Incorrect email format");
        }  
        else{

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
	}
};

angular.module('SignupCtrl', [])
.controller('signupController', ['$scope', '$http', signupController]);