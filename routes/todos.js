var mongoose = require("mongoose");
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var router = express.Router();
var error = require('../utils/errormessages');
var todo = require('../models/todo');
var config = require('../_global/config');
router.route('/:userId')
    .post(function (req, res) {

        MongoClient.connect('mongodb://' + config.ip(), function (err, client) {

          if (err) 
          {
            client.close();
            console.log(err);
            res.json({error:true, msg:error.databaseConnectionError()});
          }
          else
          {
            var db = client.db(config.database());

            var todoBody = {};
            todoBody.text = req.body.text;
            todoBody.userId = req.params.userId;
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
          }
        });
    })
    .get(function (req, res) {

        MongoClient.connect('mongodb://' + config.ip(), function (err, client) {

          if (err) 
          {
            client.close();
            console.log(err);
            res.json({error:true, msg:error.databaseConnectionError()});
          }
          else{
            var db = client.db(config.database());

            var userId = req.params.userId;

            db.collection('todos').find({"userId":userId}).toArray(function(findErr, todos) {
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
          }
        }); 
    });

    router.route('/:todoId/:userId')
    .delete(function (req, res) {
        console.log(req.body._id);
        MongoClient.connect('mongodb://' + config.ip(), function (err, client) {

          if (err) 
          {
            client.close();
            console.log(err);
            res.json({error:true, msg:error.databaseConnectionError()});
          }
          else{

            var db = client.db(config.database());

            var id = new mongoose.Types.ObjectId(req.params.todoId);    
            var userId = req.params.userId;

            db.collection('todos').remove({"_id":id, "userId":userId}, function(findErr, result) {
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
        });
    })
    .put(function (req, res) {
        
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

            var id = new mongoose.Types.ObjectId(req.params.todoId);    
            var userId = req.params.userId;
            var todoBody = {};
            todoBody.text = req.body.text;
            todoBody.userId = req.params.userId;
            todoBody.updatedAt = new Date();

            db.collection('todos').update({"_id": id, "userId":userId}, todoBody, function(findErr, result){
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
        });
    })
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

            db.collection('todos').findOne({"_id" : id, "userId":userId}, function (findErr, result) {
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
        });
    })
module.exports = router;