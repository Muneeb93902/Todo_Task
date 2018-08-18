var mongoose = require("mongoose");
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var router = express.Router();
var error = require('../utils/errormessages');
var config = require('../_global/config');
var todo = require('../models/todo');
var config = require('../_global/config');
router.route('/')
    .post(function (req, res) {

        MongoClient.connect('mongodb://' + config.ip(), function (err, client) {

          if (err) 
          {
            console.log(err);
            res.json({error:true, msg:error.databaseConnectionError()});
          }

          var db = client.db(config.database());

            var todoBody = {};
            todoBody.text = req.body.text;
            todoBody.createdAt = new Date();
            todoBody.updatedAt = new Date();


          db.collection('todos').insertOne(todoBody, function(findErr, result) {
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
module.exports = router;