var mongoose = require('mongoose');
var recepi_Schema = mongoose.Schema({
        name_chef: {
             type : String,
             required: true
            },
          name_dish: {
             type : String,
             required: true,
             unique: true
            },
          cook_time: {
             type : String,
             required: true
            },
          ingred: {
             type : String,
             required: true
            },
          recipe: {
             type : String,
             required: true
            }
       });
recepi_Schema.path('name_dish').index({ unique: true });
module.exports =  mongoose.model("Recepi", recepi_Schema);