// Requiring all Important things
var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended : true}));
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/food',{ useMongoClient: true});
mongoose.Promise = require('bluebird');

// Using express.static to get the filename of css,images, jss
app.use('/a',express.static("assets"));
app.use('/up',express.static("uploads"));

// Setting engine for html
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine','html');

// All HTML forms File
app.get('/',function(req,res){
  res.render('forms.html'); 
});
app.get('/pass_reset',function(req,res){
   res.render('reset_pass.html'); 
});
app.get('/main', function(req,res){
   res.render('main.html'); 
}); 

// All HTML Files for tiny kitchen
app.get('/tiny_kit', function(req,res){
   res.render('tiny_kitchen/tiny.html'); 
});
app.get('/upload', function(req,res){
   res.render('tiny_kitchen/Uploading/upload.html'); 
});
app.get('/view_recipe', function(req,res){
   res.render('tiny_kitchen/Viewing/view_recipe.html'); 
});
app.get('/review', function(req,res){
   res.render('tiny_kitchen/Viewing/reviews.html'); 
});

// All HTML Files for restaurant search 
app.get('/home', function(req,res){
   res.render('restaurant/home.html'); 
});
app.get('/collect_delhi', function(req,res){
   res.render('restaurant/search/collections-delhi.html'); 
});
app.get('/quick_delhi', function(req,res){
   res.render('restaurant/search/quick-delhi.html'); 
});
app.get('/local_delhi', function(req,res){
   res.render('restaurant/search/localities-delhi.html'); 
});
app.get('/rest1', function(req,res){
   res.render('restaurant/hotels/hotel1.html'); 
});
app.get('/rest2', function(req,res){
   res.render('restaurant/hotels/hotel2.html'); 
});
app.get('/rest3', function(req,res){
   res.render('restaurant/hotels/hotel3.html'); 
});
app.get('/rest4', function(req,res){
   res.render('restaurant/hotels/hotel4.html'); 
});
app.get('/rest5', function(req,res){
   res.render('restaurant/hotels/hotel5.html'); 
});
app.get('/orders', function(req,res){
   res.render('restaurant/hotels/orders.html'); 
});

// All Controller Files
var form = require(path.join(__dirname+'/controllers/controller_forms.js'));
var recepi = require(path.join(__dirname+'/controllers/controller_recipes.js'));
var review_kit = require(path.join(__dirname+'/controllers/controller_reviews.js'));
var review_rest = require(path.join(__dirname+'/controllers/controller_rev_rest.js'));
var orders = require(path.join(__dirname+'/controllers/controller_orders.js'));

// Posting forms 
app.post('/register', form.signup);
app.post('/login',form.login);
app.post('/send',form.send);


// Posting recipes
app.post('/recipe_save', recepi.upload);
app.post('/image', recepi.image);
 
// Retrieving Recipes
app.get('/getimg', recepi.getimages);
app.get('/dish/:id', recepi.getrec);
app.get('/dishes', recepi.getdish);


// Posting Reviews
app.post('/review', review_kit.save);
//Getting Reviews
app.get('/get_review', review_kit.get_review);

//Posting Reviews for hotels
app.post('/review_hotel', review_rest.save);
//Getting Reviews
app.get('/get_review_hotel', review_rest.get_review);

// Posting Order 
app.post('/placeorder',orders.save);
// Viewing Order
app.get('/get_orders',orders.get);
// Deleting Order
app.get('/delete/:id',orders.delete);
app.listen(8000);
//Listening to the port
