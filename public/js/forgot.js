function forgotController($scope, $http) {

	$scope.signForm = function(txt_email) {
                
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(txt_email == undefined || txt_email.trim().length == 0)
        {
            alert("Please enter email");
        }   
        else if(!re.test(txt_email)){
            alert("Incorrect email format");
        }  
        else{

            $scope.loaderOverley = true;        
            var userBody = {};
            userBody.email = txt_email;
            $http.post("/users/resetPassword", userBody)
            .then(function(response){
                $scope.loaderOverley = false;
                if(response.data.error)
                {
                   console.log(response.data.msg);
                   alert(response.data.msg);
                }
                else{
                    alert("Password Reset request sent successfully.");              
                }
            });

        }      
	}
};


angular.module('ForgotCtrl',[])
.controller('forgotController', ['$scope', '$http', forgotController]);