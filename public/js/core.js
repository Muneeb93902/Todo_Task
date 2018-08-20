function mainController($scope, $http, $localStorage) {
    $scope.formData = {};
    $scope.product = {};
    $scope.todos = [];
    $scope.todoAddShow = false;
    $scope.todoEditShow = false;
    $scope.loaderOverley = false;

    $scope.currentUser = $localStorage.currentUser;
    $scope.currentUsername = $scope.currentUser.username;
    $scope.currentEmail = $scope.currentUser.email;

    /** Firebase Code
      // Initialize Firebase
    var config = {
    apiKey: "AIzaSyD8J75x4YCkGMcX0CUISgLtKXGxHSoM45w",
    authDomain: "dynamic-branch-199113.firebaseapp.com",
    databaseURL: "https://dynamic-branch-199113.firebaseio.com",
    projectId: "dynamic-branch-199113",
    storageBucket: "dynamic-branch-199113.appspot.com",
    messagingSenderId: "918885454907"
    };

    firebase.initializeApp(config);

    const messaging = firebase.messaging();

    messaging.usePublicVapidKey("BC_nfsOu_GGGN0WS-fxOqol3Q24NevsdHLHxElP1K83Q_BReiC1WSYzSvNulIYihQpGzmHFbOaKIHgHt66fWDX4");

    messaging.requestPermission().then(function() {

        messaging.getToken().then(function(currentToken) {
          if (currentToken) {
            console.log('currentToken :', currentToken);
            // sendTokenToServer(currentToken);
            // updateUIForPushEnabled(currentToken);
          } else {
            // Show permission request.
            console.log('No Instance ID token available. Request permission to generate one.');
            // Show permission UI.
            // updateUIForPushPermissionRequired();
            // setTokenSentToServer(false);
          }
        }).catch(function(err) {
          console.log('An error occurred while retrieving token. ', err);
          // showToken('Error retrieving Instance ID token. ', err);
          // setTokenSentToServer(false);
        });


      // console.log('Notification permission granted.');
      // TODO(developer): Retrieve an Instance ID token for use with FCM.
      // ...
    }).catch(function(err) {
      console.log('Unable to get permission to notify.', err);
    });
    **/


    $scope.deletRecord = function(id,index) {
        if (confirm('Are you sure you want to delete this?')) {
            $scope.loaderOverley = true;
             $http.delete("/todos/"+id + "/" + $scope.currentUser._id)
            .then(function(response){
                $scope.loaderOverley = false;
                if(response.error)
                {
                   console.log(data.msg);
                }
                else{
                    
                    $scope.todoAddShow = false;
                    $scope.todoEditShow = false;

                    $scope.todos.splice(index, 1);
                    console.log(response);                    
                }
            });
        }  
    }

    
    $scope.insertRecord = function(todoText) {
        if(todoText.trim().length == 0)
        {
            alert("Please enter text");
        }   
        else
        {
            var todoBody = {};
            todoBody.text = todoText;
            todoBody.createdAt = new Date();
            $http.post("/todos/" + $scope.currentUser._id, todoBody)
            .then(function(response){
                if(response.data.error)
                {
                   console.log(responose.data.msg);
                }
                else{
                    $scope.getAllRecord();
                    $scope.todo_text = "";
                    console.log(response);                    
                }
            });            
        } 

    }

    $scope.addRecord = function(){
        
        $scope.todo_text = "";
        $scope.todoAddShow = true;
        $scope.todoEditShow = false;
    }

    $scope.editRecord = function(todo_updated_text,todo_updated_id){   
        $scope.todo_updated_text = todo_updated_text;
        $scope.todo_updated_id = todo_updated_id;
        $scope.todoEditShow = true;
        $scope.todoAddShow = false;
    }

    $scope.updateRecord = function(todo_updated_text){   

        if(todo_updated_text.trim().length == 0)
        {
            alert("Please enter text");
        }   
        else
        {
            var todoBody = {};
            todoBody.text = todo_updated_text;

            $http.put("/todos/"+$scope.todo_updated_id + "/" + $scope.currentUser._id,todoBody)
            .then(function(response){
                if(response.data.error)
                {
                   console.log(response.data.msg);
                }
                else{
                    $scope.getAllRecord();
                    $scope.todoEditShow = false;
                    console.log(response);                    
                }
            });
        }
    }

    $scope.getAllRecord = function() {    
        $scope.loaderOverley = true;
        $scope.todos = [];
        // when landing on the page, get all todos and show them
        $http.get('/todos' + "/" + $scope.currentUser._id)
        .then(function(data) {
            $scope.loaderOverley = false;
            if(data.data.error)
            {
                console.log(data.data.msg);
            }
            else
            {
                $scope.todos = data.data.item;
                console.log(data.data.item);                
            }
        });
    }

    $scope.getAllUserRecord = function() {    
        $scope.loaderOverley = true;
        $scope.allUserData = [];
        // when landing on the page, get all todos and show them
        $http.get('/users/allUserData')
        .then(function(data) {
            $scope.loaderOverley = false;
            if(data.data.error)
            {
                console.log(data.data.msg);
            }
            else
            {
                $scope.allUserData = data.data.item;                
            }
        });
    }

    $scope.getAllRecord();

    $scope.getAllUserRecord();
};

angular.module('MainCtrl', [])
.controller('mainController', ['$scope', '$http', '$localStorage', mainController]);