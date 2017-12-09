var img = document.getElementById('img');
var ingred = document.getElementById('ingred');
var rec = document.getElementById('recipe');
var name = document.getElementById('name');
var rev = document.getElementById('reviews');
var c;
var app = angular.module('myapp', []);
app.controller('Ctrl_recipe', function($scope) {
    $scope.name_dish="";
    $scope.special="";
});
app.controller('Ctrl_view_image', function($scope,$http){
     $http({
      method: "GET",
      url: "/getimg"
    }).then(function mySuccess(response){
        $scope.object = response.data;
         var len = $scope.object.length;
         for(var i =0; i< len; i++){
          img.innerHTML += "<div class = 'col-lg-3 col-md-3 col-sm-3 col-xs-10 views'><div class = 'w3-card-4 w3-white card_view'><img src = '/up/" + $scope.object[i].image_path + "' class = 'img-view'><div class = 'caption text-center'><a href = '/dish/:" + $scope.object[i]._id + "'</a>" + $scope.object[i].name_dish + "</div></div></div>";   
         }
    },function myError(response){
        alert("Error");
    });   
});
app.controller('Ctrl_view', function($scope,$http,$rootScope){
     $http({
      method: "GET",
      url: "/dishes"
    }).then(function mySuccess(response){
        $scope.object = response.data;
        $rootScope.a = 'dsd';
        $scope.chef = $scope.object.name_chef;
        $scope.name = $scope.object.name_dish;
        $scope.time = $scope.object.cook_time;
        $scope.ingred = $scope.object.ingred.replace(/\n\r?/g, '<hr>');
        ingred.innerHTML += $scope.ingred;
        $scope.recipe = $scope.object.recipe.replace(/\n\r?/g,'<hr>') ;
        rec.innerHTML += $scope.recipe ;
    },function myError(response){
        alert("Error");
    });
});
app.controller('reviews_Ctrl', function($scope, $http, $rootScope){
    $http({
      method: "GET",
      url: "/get_review"
    }).then(function mySuccess(response){
        $scope.object = response.data;
        var len = $scope.object.length;
        for(var i = 0; i< len; i++){
          rev.innerHTML+= "<div class='container'><img src='/a/images/avtar.png' alt='Avatar' style='width:90px'><p>" + $scope.object[i].name + "<span class = 'dishes'>For " + $scope.object[i].dish + "</span><p>" + $scope.object[i].reviews + "</p></div>";    
        } 
    },function myError(response){
        alert("Error");
    });
});
