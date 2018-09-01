var mongoose = require("mongoose");
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var router = express.Router();
var error = require('../utils/errormessages');
var todo = require('../models/user');
var emailHelper = require('../helper/emailHelper');
var encryptHelper = require('../helper/encryptHelper');
var config = require('../_global/config');
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
var async = require('async');

router.route('/')
    .post(function (req, res) {

        MongoClient.connect('mongodb://' + config.ip(), function (err, client) {

          if (err) 
          {
            client.close();
            console.log(err);
            res.json({error:true, msg:error.databaseConnectionError()});
          }

          var db = client.db(config.database());

          db.collection('users').findOne({"email" : req.body.email}, function (findErr, result) {
          
            if (findErr){
                client.close();
                res.json({error:true, msg:findErr});
            }
            else
            {
            	if(result == null)
            	{
                var userBody = {};
                userBody.email = req.body.email;
                userBody.username = req.body.username;
                userBody.password = bcrypt.hashSync(req.body.password, 10);
                userBody.createdAt = new Date();
                userBody.updatedAt = new Date();

                db.collection('users').insertOne(userBody, function(findErr, result) {
                    client.close();
                    if (findErr){
                        res.json({error:true, msg:findErr});
                    }
                    else
                    {
                        res.json({error:false, item:result});
                    }
                });
            	}
            	else
            	{
               client.close(); 
               res.json({error:true, msg:error.emailExistError()});        
             	}       
            }
          });
        });
    });
router.route('/login')
    .post(function (req, res) {

        MongoClient.connect('mongodb://' + config.ip(), function (err, client) {

          if (err) 
          {
            client.close();
            console.log(err);
            res.json({error:true, msg:error.databaseConnectionError()});
          }

          var db = client.db(config.database());

          db.collection('users').findOne({"email" : req.body.email}, function (findErr, result) {
            if (findErr){
                client.close();
                res.json({error:true, msg:findErr});
            }
            else
            {
              client.close();
            	if(result == null)
            	{
                res.json({error:true, msg:error.userNotFoundError()});        
            	}
            	else
            	{

                var hash = result.password.replace(/^\$2y(.+)$/i, '\$2a$1');
                
                bcrypt.compare(req.body.password, hash, function (err, compareResult) {
                  console.log(compareResult);
                  if (err) {
                    res.json({error:true, msg:err});        
                  } else {
                    if (compareResult === true) {
                      delete result.password;
                      res.json({error:false, item:result});
                    } else {
                      res.json({error:true, msg:error.userNotFoundError()});        
                    }
                  }
                });      					
            	}       
            }
          });
        });
    });
router.route('/resetPassword')
    .post(function (req, res) {

        MongoClient.connect('mongodb://' + config.ip(), function (err, client) {

          if (err) 
          {
            client.close();
            console.log(err);
            res.json({error:true, msg:error.databaseConnectionError()});
          }

          var db = client.db(config.database());

          db.collection('users').findOne({"email" : req.body.email}, function (findErr, result) {
            client.close();
            if (findErr){
                res.json({error:true, msg:findErr});
            }
            else
            {
              if(result == null)
              {
                res.json({error:true, msg:error.userNotFoundError()});        
              }
              else
              {

                var text = result.email;
                var key = encryptHelper.encryptText(text, config.encryptKey());
                var url = config.serverUrl() + "/VerifyInvitation?key=" + key;

                var emailData = {
                  username: result.username,
                  passwordResetURL: url
                };

                emailHelper.emailDocument("your_email","your_password",result.email,"Password reset request", 'htmlTemplate/password_reset.html', 'HTML version of the message',emailData, function(error,data){
                  if(error)
                  {
                    res.json({error:true, msg:errormessages.emailSendError()});
                    console.log(error);
                  }
                  else
                  {
                    res.json({error:false, item:result});
                  }
                });
              }       
            }
          });
        });
    });
router.route('/updatePassword')
    .post(function (req, res) {

        MongoClient.connect('mongodb://' + config.ip(), function (err, client) {

          if(err) 
          {
            client.close();
            console.log(err);
            res.json({error:true, msg:error.databaseConnectionError()});
          }

          var db = client.db(config.database());

          var email = encryptHelper.decryptText(req.body.key, config.encryptKey());

          db.collection('users').findOne({"email" : email}, function (findErr, result) {
            if (findErr){
                client.close();
                res.json({error:true, msg:findErr});
            }
            else
            {
              if(result == null)
              {
                client.close();
                res.json({error:true, msg:error.userNotFoundError()});        
              }
              else
              {

                var userBody = {};
                userBody.email = result.email;
                userBody.username = result.username;
                userBody.password = bcrypt.hashSync(req.body.new_password, 10);
                userBody.createdAt = result.createdAt;
                userBody.updatedAt = new Date();

                db.collection('users').update({"_id": result._id}, userBody, function(findErr, result){
                  client.close();
                  if (findErr){
                      res.json({error:true, msg:findErr});
                  }
                  else
                  {
                      res.json({error:false, item:result});
                  }
                });
              }       
            }
          });
        });
    });        

    router.route('/allUserData')
    .get(function (req, res) {

        MongoClient.connect('mongodb://' + config.ip(), function (findErr, client) {

          if (findErr) 
          {
            client.close();
            console.log(findErr);
            res.json({error:true, msg:error.databaseConnectionError()});
          }
          else
          {
            var db = client.db(config.database());

            var userId = req.params.userId;

            var id = new mongoose.Types.ObjectId(req.params.todoId);

            db.collection('users').find({}).toArray(function(findErr, users) {
              
              if (findErr){
                  client.close();
                  res.json({error:true, msg:findErr});
              }
              else
              {

                var returnArray = [];

                async.forEachSeries(users, function (user, callback) {
                    delete user.password;
                    var userId = "" + user._id;
                    delete user._id;
                    // delete user.email;
                    user.todos = [];

                    db.collection('todos').find({"userId":userId}).toArray(function(findErr, todos) {

                      if(findErr)
                        callback();
                      else
                      {
                        if(todos != null && todos.length > 0)
                        {
                          console.log("todos.length " + todos.length);
                          user.todos = todos;                          
                        }

                        returnArray.push(user);
                        callback();
                      }

                    });

                    /*
                    if (modelObject.category.toLowerCase() == 'property') {
                        financialHelper.evaluatePropertyWorthZooplaAndConvert(customer.app, modelObject, false, function (err, updatedAsset) {
                            returnArray.push(updatedAsset);
                            callback();
                        });
                    }
                    else {
                        returnArray.push(modelObject);
                        callback();
                    }
                    */
                }, function (err) {
                    res.json({error:err, item:returnArray});
                });

                  // res.json({error:false, item:result});
              }
            });
          }
        });
    });
module.exports = router;