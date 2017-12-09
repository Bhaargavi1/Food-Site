var review = document.getElementById('review');
var hotel = document.getElementById('hotel_name');
var dish = document.getElementsByClassName('dish');
var price = document.getElementsByClassName('price');
var quantity = document.getElementsByClassName('quantity');
var final_price = document.getElementsByClassName('final_price');
var placeorder = document.getElementById('order_place');
var vieworder = document.getElementById('view_order');
var mydish = document.getElementById('mydish');
var myquantity = document.getElementById('myquantity');
var myprice = document.getElementById('myprice');
var cost = document.getElementById('cost');
var order = document.getElementById('orders_view');
var del = document.getElementById('delete');
var comp = document.getElementById('comp');
var o =document.getElementById('order');
var o_get = document.getElementById('order_get')
var app = angular.module('myApp', []);
// fun funtion called to change the display as per the filters
function fun(){
	var x = document.getElementsByTagName("input");
    var a = document.getElementsByClassName('select-options');
  
  // For categories type -- filter
        for(var k = 2; k<10; k++){
        if(x[k].checked === false){
            var s = k-2;
             a[s].style.display = "none";
            }
        else if(x[k].checked === true){
            var s = k-2;
            a[s].style.display = "block";
        }
    }
// For Cost type Filters
    var high = x[0].checked;
    var low = x[1].checked;
      if(high === false){
            for(var j = 0; j<a.length; j++){
                if(j%2 == 0){
                    a[j].style.display = "block";
                }
                else{
                    a[j].style.display = "none";
                }
           }
        }
      if(low === false){
            for(var j = 0; j<a.length; j++){
                if(j%2 == 0){
                    a[j].style.display = "none";
                }
                else{
                    a[j].style.display = "block";
                }
           }
        }
      if(high == false && low === false){
        for(var j = 0; j<a.length; j++){
            a[j].style.display = "none";
        }
    }
     if(high == false || low == false){
         for(var k = 2; k<10; k++){
            x[k].disabled = true;
        }
   }
     else{
         for(var k = 4; k<12; k++){
            x[k].disabled = false;
        }
    }
}
app.controller('reviews_hotel_Ctrl', function($scope, $http){
    $http({
      method: "GET",
      url: "/get_review_hotel"
    }).then(function mySuccess(response){
        $scope.object = response.data;
        var len = $scope.object.length;
        for(var i = 0; i<len; i++){
            if(hotel.innerHTML == $scope.object[i].restaurant)
              review.innerHTML+= "<div class='container2'><img src='/a/images/avtar.png' alt='Avatar' style='width:90px;'><p>" + $scope.object[i].name + "<p>" + $scope.object[i].reviews + "</p></div>";            
        }
    },function myError(response){
        alert("Error");
    });
});
app.controller('order_Ctrl',function($scope){
    var arr_dish= [], arr_quant = [], arr_price = [];
    $scope.dish = '';
    $scope.quant = '';
    $scope.price = '';
    // These 3 variables will be saved in mongoose database
    var j =0;
    $scope.addItem = function(){
        var len = dish.len;
        var id = event.srcElement.id;
        var q = quantity[id-1].innerHTML;
        var quan = Number(q);
        var p =  price[id-1].innerHTML;
        var pr = Number(p);
        var fp = final_price[id-1].innerHTML;
        var fpr = Number(fp);
        quantity[id-1].innerHTML = (quan + 1);
        final_price[id-1].innerHTML = (fpr + pr); 
        // For arr_dish contains all dishes 
        if(quantity[id - 1].innerHTML == 1) {
            $scope.dish += dish[id-1].innerHTML + ',';
            arr_dish = $scope.dish.split(",");
        // For arr_quantity containing all quantities
            arr_quant += quantity[id-1].innerHTML + ',';
            arr_quant = arr_quant.split(",");
            $scope.quant = arr_quant.toString();
        // For arr_price containing all prices
            arr_price += final_price[id-1].innerHTML + ',';
            arr_price = arr_price.split(",");
            $scope.price = arr_price.toString();
       }
       else{
           for(i=0; i< arr_dish.length;i++){
               if(dish[id-1].innerHTML == arr_dish[i]){
                   arr_quant[i] = quantity[id-1].innerHTML;
                   arr_price[i] = final_price[id-1].innerHTML;
               }
           } 
        }
    }
    $scope.bill = function(){
        placeorder.style.display = 'none';
        vieworder.style.display = 'block';
        $scope.total_price = 0;
        var price;
        for(i=0;i<arr_dish.length;i++){
            mydish.innerHTML += arr_dish[i] + '<br>';
            myquantity.innerHTML += arr_quant[i] + '<br>';
            myprice.innerHTML += arr_price[i] + '<br>';
            price = Number(arr_price[i]);
            $scope.total_price += price;
        }
        cost.innerHTML = $scope.total_price;
    }
    
});
app.controller('Ctrl_orders', function($scope, $http){
    $http({
      method: "GET",
      url: "/get_orders"
    }).then(function mySuccess(response){
        $scope.object = response.data;
        var len = $scope.object.length;
        for(var i = 0; i<len; i++){
              o.style.display = 'block';
               var d = $scope.object[i].dish;
               var q = $scope.object[i].quantity;
               var p = $scope.object[i].price;
               dish = d.split(',');
               quan = q.split(',');
               pr = p.split(',');
            for(j=0;j<dish.length;j++){
               mydish.innerHTML += dish[j] + '<br>';
               myquantity.innerHTML += quan[j] + '<br>';
               myprice.innerHTML += pr[j] + '<br>';
            }
            $scope.c = $scope.object[i].total
            cost.innerHTML += "<h2 class = 'color_navy'>Total Cost is " + $scope.c + "</h2>";
            del.innerHTML += "<a href = '/delete/:" + $scope.object[i]._id + "'>Cancel  Order</a>";
            comp.innerHTML += "<a href = '/delete/:" + $scope.object[i]._id + "'>Order Completed </a>";
        }
    },function myError(response){
        alert("Error");
    });
});