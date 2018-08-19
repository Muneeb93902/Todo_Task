function loginController($scope, $http, $location, $localStorage) {

	$scope.signForm = function(txt_email, txt_password) {
                
        $scope.loaderOverley = true;        
        var userBody = {};
        userBody.email = txt_email;
        userBody.password = txt_password;
        $http.post("/users/login", userBody)
        .then(function(response){
            $scope.loaderOverley = false;
            if(response.data.error)
            {
               console.log(response.data.msg);
               alert(response.data.msg);
            }
            else{
                alert("User logged in successfully.");    
                $localStorage.currentUser = response.data.item;
                $location.path("/todo");          
            }
        });

	}
};


angular.module('LoginCtrl',[])
.controller('loginController', ['$scope', '$http', '$location', '$localStorage', loginController]);