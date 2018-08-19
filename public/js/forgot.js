function forgotController($scope, $http) {

	$scope.signForm = function(txt_email) {
                
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
};


angular.module('ForgotCtrl',[])
.controller('forgotController', ['$scope', '$http', forgotController]);