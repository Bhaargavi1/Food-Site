var Reviews = require('../models/model_reviews_kitchen.js');
var D = require('../controllers/controller_recipes.js');
var P = require('../controllers/controller_forms.js');

module.exports.save= function(req,res){
    console.log(P.name);
 var review = req.body;
  var newReview = new Reviews({
         name: P.name,
         dish: review.name_dish,
         reviews: review.review,
        });

    newReview.save(function(err){
            if(err){
              console.log(err);
                res.render('tiny_kitchen/Viewing/view.html'); 
            }
            else  {
              console.log('show_message', {message: "New review added"});
              res.render('tiny_kitchen/tiny.html');
            }
         });
    Reviews.find({}, function(err,data){
        console.log(data);
    });
};

module.exports.get_review = function(req,res){ 
  Reviews.find({},function(err,data){
       res.send(data);
    });
};