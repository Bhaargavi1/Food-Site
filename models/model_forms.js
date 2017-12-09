var mongoose = require('mongoose');
var person_Schema = mongoose.Schema({
         name: String,
         email: {
             type : String,
             unique: true
         },
         pswd: String,
         mobile: Number
       });
module.exports =  mongoose.model("Person", person_Schema);