var Orders = require('../models/models_orders.js');
var P = require('../controllers/controller_forms.js');
 
module.exports.save = function(req,res){
     console.log(P.name);
     var order = req.body;
     var newOrder = new Orders({
         name: P.name,
         dish: order.dishes,
         price: order.price,
         quantity:order.quantity,
         total:order.total
        });
    newOrder.save(function(err){
            if(err){
              console.log(err);
                res.send("Error Please Try again");
            }
            else  {
              console.log('show_message', {message: "New order added"});
              res.render('restaurant/hotels/orders.html');
            }
         });
};
module.exports.get = function(req,res){
     Orders.find({name:P.name}, function(err,data){
        console.log(data);
         res.send(data);
    });
};
module.exports.delete = function(req,res){
    var arr = req.params.id;
    var newid = arr.split(":");
  Orders.remove({_id: newid[1]}, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not delete order with id " + req.params.id});
        } else {
            res.render('restaurant/hotels/orders.html');
        }
    });
};