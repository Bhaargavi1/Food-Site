var Recipe = require('../models/model_recipe.js');
var Image_files = require('../models/model_image.js');
var a;
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var newpath, newid;
module.exports.upload= function(req,res){
     var myrecepi = req.body;
     var newrecipe = new Recipe({
         name_chef: myrecepi.name_chef,
         name_dish: myrecepi.name_dish,
         cook_time: myrecepi.cook_time,
         ingred: myrecepi.ingred,
         recipe:myrecepi.recipe,
        });
    a = myrecepi.name_dish;
    newrecipe.save(function(err){
            if(err){
              console.log('show_message', {message: "Database error", type: "error"});
             res.render('tiny_kitchen/Uploading/upload.html');
            }
            else  {
              console.log('show_message', {message: "New recipe added"});
              res.render('tiny_kitchen/Uploading/upload_image.html'); 
            }
         });
};
module.exports.image= function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
       var p = files.file.path;
       var n = files.file.name;
         if(path.extname(n) == ('.png' || '.jpg' || '.jpeg')){
             var newpath = path.resolve('./uploads/' + n);
             fs.rename(p, newpath, function (err) {
             console.log('File uploaded and moved!');
             var newimage = new Image_files({
                name_dish: a,
                image_path: n
             });
              newimage.save(function(err){
                 if(err){
                     console.log(err);
                     res.render('tiny_kitchen/Uploading/upload_image.html'); 
                 } 
                  else{
                      console.log("Image is saved ");
                      res.render('tiny_kitchen/tiny.html')
                  }
              });
          });
    }
        else{
            res.send("The file uploaded is not an image please upload only an image. Go back to upload image")
        }
    });
    Image_files.find({},function(err,res){
        console.log(res);
    })
};
module.exports.getimages = function(req,res){
    Image_files.find({},function(err,response){
        console.log(response.length);
        res.send(response);
    });
}
module.exports.getrec = function(req,res){
  var arr = req.params.id;
  newid = arr.split(":"); 
  res.render('tiny_kitchen/Viewing/view.html');
}
module.exports.getdish = function(req,res){
 //array which contains : and the id so thats why the 2nd element of the id
    console.log(newid);
    Image_files.findById({_id: newid[1]}, function(err, data) {
      if(!err){
         var name = data.name_dish;
          Recipe.findOne({name_dish : name}, function(err,recipe){
              if(!err){
                 res.send(recipe);
                  console.log("Sent the dish");
                  module.exports.name = recipe.name_dish;
              }
              else{
                console.log("error in sending dish");   
              }
          });
      }
      else{
          res.send("File Not Found");
      }
  });
}
   