// public/core.js
var sampleApp = angular.module('sampleApp', []);



function mainController($scope, $http) {
    $scope.formData = {};
    $scope.product = {};

    $scope.showProduct = function(product) {
        $scope.product = product;
      //...
    };



    // when landing on the page, get all todos and show them
    $http.get('/todos')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })€
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createProduct = function() {
        $http.post('/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.clickButton = function(){
        
    }
}
