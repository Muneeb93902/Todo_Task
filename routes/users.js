var mongoose = require("mongoose");
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var router = express.Router();
var error = require('../utils/errormessages');
var todo = require('../models/todo');
var config = require('../_global/config');
const bcrypt = require('bcrypt');
router.route('/')
    .post(function (req, res) {

        MongoClient.connect('mongodb://' + config.ip(), function (err, client) {

          if (err) 
          {
            console.log(err);
            res.json({error:true, msg:error.databaseConnectionError()});
          }

          var db = client.db(config.database());

          db.collection('users').findOne({"email" : req.body.email}, function (findErr, result) {
            console.log(result);
            if (findErr){
                res.json({error:true, msg:findErr});
            }
            else
            {
            	if(result == null)
            	{
                var userBody = {};
                userBody.email = req.body.email;
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
            console.log(err);
            res.json({error:true, msg:error.databaseConnectionError()});
          }

          var db = client.db(config.database());

          db.collection('users').findOne({"email" : req.body.email}, function (findErr, result) {
            if (findErr){
                res.json({error:true, msg:findErr});
            }
            else
            {
            	if(result == null)
            	{
                console.log('11');
                res.json({error:true, msg:error.userNotFoundError()});        
            	}
            	else
            	{

                console.log(result);
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
                      console.log('22');
                      res.json({error:true, msg:error.userNotFoundError()});        
                    }
                  }
                });      					
            	}       
            }
          });
        });
    });

    /*
    .get(function (req, res) {

        MongoClient.connect('mongodb://' + config.ip(), function (err, client) {

          if (err) 
          {
            console.log(err);
            res.json({error:true, msg:error.databaseConnectionError()});
          }

          var db = client.db(config.database());

          db.collection('todos').find().toArray(function(findErr, todos) {
            client.close();
            if (findErr){
                res.json({error:true, msg:findErr});
            }
            else
            {
                console.log(todos);
                res.json({error:false, item:todos});
            }
          });
        }); 

    });

    router.route('/:todoId')
    .delete(function (req, res) {
        console.log(req.body._id);
        MongoClient.connect('mongodb://' + config.ip(), function (err, client) {

          if (err) 
          {
            console.log(err);
            res.json({error:true, msg:error.databaseConnectionError()});
          }

          var db = client.db(config.database());

          var id = new mongoose.Types.ObjectId(req.params.todoId);    

          db.collection('todos').remove({"_id":id}, function(findErr, result) {
            client.close();
            if (findErr){
                res.json({error:true, msg:findErr});
            }
            else
            {
                res.json({error:false, item:result});
            }
          });
        });
    })
    .put(function (req, res) {
        
        MongoClient.connect('mongodb://' + config.ip(), function (findErr, client) {

          if (findErr) 
          {
            console.log(findErr);
            res.json({error:true, msg:error.databaseConnectionError()});
          }

          var db = client.db(config.database());

          var id = new mongoose.Types.ObjectId(req.params.todoId);    
            var todoBody = {};
            todoBody.text = req.body.text;
            todoBody.updatedAt = new Date();

          db.collection('todos').update({"_id": id}, todoBody, function(findErr, result){
            client.close();
            if (findErr){
                res.json({error:true, msg:findErr});
            }
            else
            {
                res.json({error:false, item:result});
            }
          });
        });
    })
    .get(function (req, res) {

        MongoClient.connect('mongodb://' + config.ip(), function (findErr, client) {

          if (findErr) 
          {
            console.log(findErr);
            res.json({error:true, msg:error.databaseConnectionError()});
          }

          var db = client.db(config.database());

          var id = new mongoose.Types.ObjectId(req.params.todoId);
          db.collection('todos').findOne({"_id" : id}, function (findErr, result) {
            client.close();
            if (findErr){
                res.json({error:true, msg:findErr});
            }
            else
            {
                res.json({error:false, item:result});
            }
          });
        });
    })
    */
module.exports = router;