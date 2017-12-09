var mongoose = require('mongoose');
var image_Schema = mongoose.Schema({
          name_dish: {
             type : String,
             required: true,
             unique: true
            },
          image_path: {
             type : String,
             required: true
            }
       });
module.exports =  mongoose.model("Img", image_Schema);