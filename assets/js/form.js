var app = angular.module('myapp', []);
app.controller('Ctrl_form', function($scope) {
    $scope.email="";
    $scope.pswd="";
    $scope.fname = "";
    $scope.email_login= "" ;
    $scope.paswd = "";
    $scope.showfirst = true;
    $scope.loginshow = false;
    $scope.emailshow = false;
    $scope.login = function(){
         $scope.showfirst = false;
         $scope.loginshow = true;
         $scope.emailshow = false;
        };
    $scope.register = function(){
            $scope.showfirst = true;
            $scope.loginshow = false;
          $scope.emailshow = false;
        };
    $scope.send_mail = function(){
       $scope.showfirst = false;
       $scope.loginshow = false;
       $scope.emailshow = true; 
    }
   });
// For password validation
function passwordValidation(){
var str = document.getElementById("myInput").value;
var y = document.getElementById("write");
 if(str.length < 4){
    y.innerHTML = "too short";
   }
 else if (str.length >50){
    y.innerHTML  = "too long";
    }
 else if (str.search(/\d/) < 0) {
    y.innerHTML = "no number";
    }
 else if (str.search(/[a-z]/) < 0){
    y.innerHTML = "no small letter";
    }
 else if(str.search(/[A-Z]/) < 0 ){
    y.innerHTML = "no capital letter";
    }
 else
    y.innerHTML= " ";
}
