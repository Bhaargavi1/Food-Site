var mongoose = require('mongoose');
var review_rest = mongoose.Schema({
   name:{
       type: String,
       required: true
   },
   restaurant:{
       type:String,
       required:true
   },
    reviews:{
        type:String,
        required:true
    }
}); 
module.exports =  mongoose.model("Reviews_rest", review_rest);