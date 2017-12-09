var mongoose = require('mongoose');
var review_Schema = mongoose.Schema({
   name:{
       type: String,
       required: true
   },
   dish:{
       type:String,
       required:true,
   },
    reviews:{
        type:String,
        required:true
    }
}); 
module.exports =  mongoose.model("Reviews", review_Schema);