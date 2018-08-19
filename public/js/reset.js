function resetController($scope, $http, $location) {

    var abc = $location.search();
    var key = "";

    if(abc.hasOwnProperty("key"))
    {
        key = abc.key;
    }

	$scope.signForm = function(txt_new_password) {
                
        var userBody = {};
        userBody.new_password = txt_new_password;
        userBody.key = key;
        $scope.loaderOverley = true;
        $http.post("/users/updatePassword", userBody)
        .then(function(response){
            $scope.loaderOverley = false;
            if(response.data.error)
            {
               console.log(response.data.msg);
               alert(response.data.msg);
            }
            else{
                alert("Password Updated Successfully.");              
            }
        });

	}
};


angular.module('ResetCtrl',[])
.controller('resetController', ['$scope', '$http', '$location', resetController]);