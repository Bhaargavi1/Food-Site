var mongoose = require('mongoose');
var order_schema = mongoose.Schema({
         name: {
                type:String,
                required:true,
               unique:true
          },
         dish: String,
         price: String,
         quantity: String,
         total: Number
       });
module.exports =  mongoose.model("Orders", order_schema);