var Person = require('../models/model_forms.js');
var nodemailer = require('nodemailer');
// Function signup called for signup
// Declaring the global variable to get login/register data
var a = 10;
module.exports.signup= function(req,res){
     var personInfo = req.body;
     var newPerson = new Person({
         name: personInfo.fname,
         email: personInfo.email,
         pswd: personInfo.pswd,
         mobile:personInfo.mobile
        });
    module.exports.name = personInfo.fname;
    console.log(module.exports.name);
    /* making the value of a to "" so that in getdata last registered name is retrieved */ 
    newPerson.save(function(err){
            if(err){
              console.log('show_message', {message: "Database error", type: "error"});
             res.render('forms.html');
            }
            else  {
              console.log('show_message', {message: "New person added"});
              res.render('main.html'); 
            }
         });
 };
// Function for login
module.exports.login = function(req,res){
     var userInfo = req.body; 
     var mail = userInfo.email_login;
     var pass = userInfo.paswd;
     Person.findOne({email:mail, pswd : pass}, function(err, result){
         if(err)
             console.log(err);
         else{
            if(result == null)
                res.render('forms.html');
            else{
                console.log("Success");
                res.render('main.html');
                module.exports.name = result.name;
                console.log(module.exports.name);
            } 
         }
   });    
};
// Function for password Sending
module.exports.send = function(req,res){
var mail_reset = req.body.email_reset;
Person.findOne({'email':mail_reset}, function(err, mail_res){
        if(err)
            console.log(err);
        else{
            if(mail_res == null)
                res.send("No Email Found.Please GO Back and Register yourself");
            else{
                 console.log(mail_res);
                res.render('forms.html');
                data = mail_res.email;
                message = "Your password is " + mail_res.pswd;
              var smtpTransport = nodemailer.createTransport({
                   service: "Gmail",
                   auth: {
                       user: 'bhaargavi.127@gmail.com',
                       pass: '@Iamenginer1'
                   }
               });
             var mailOptions = {
                 from: '<bhaargavi.127@gmail.com>',
                 to: data,
                 subject: 'Sending Email using Node.js',
                 html: message
             };
             smtpTransport.sendMail(mailOptions, function(error, info){
                 if (error) {
                     console.log(error);
                 } else {
                     console.log('Email sent:');
                 }
                });
               }
            }
});
};
