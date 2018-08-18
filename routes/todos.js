var mongoose = require("mongoose");
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var router = express.Router();
var error = require('../utils/errormessages');

require('../models/todo');
router.route('/')
    .post(function (req, res) {

        MongoClient.connect('mongodb://newuser:newuser@localhost:27017/newdb', function(err, db)
        {
            if(err)
            {
                res.json({error: error.databaseConnectionError()});
            }
            else
            {
                db.collection("products").insertOne(req.body, function(err, response) {
                    db.close();
                    if (err) 
                    {
                        res.json({error: error.invalidRequestMsg()});
                    }
                    else
                    {
                        res.json(response);
                    }
                });
            }
        });    

    })
    .put(function (req, res) {
        console.log(req.body._id);
        MongoClient.connect('mongodb://newuser:newuser@localhost:27017/newdb', function(err, db)
        {
            if(err)
            {
                res.json({error: error.databaseConnectionError()});
            }
            else
            {
                var id = new mongoose.Types.ObjectId(req.body._id);
                var productObject = req.body;
                delete productObject._id;
                db.collection("products").update({"_id": id}, productObject, function(err, data)
                {
                    db.close();
                    if (err) 
                    {   
                        console.log(err)
                        res.json({error: error.invalidRequestMsg()});
                    }
                    else
                    {
                        res.json(data);
                    }
                });
            }
        });
    })
    .delete(function (req, res) {
        console.log(req.body._id);
        MongoClient.connect('mongodb://newuser:newuser@localhost:27017/newdb', function(err, db)
        {
            if(err)
            {
                res.json({error: error.databaseConnectionError()});
            }
            else
            {
                var id = new mongoose.Types.ObjectId(req.body._id);
                
                db.collection("products").remove({"_id":id}, function(err, result) {
                    db.close();
                    if(err) 
                    {
                        res.json({error: error.invalidRequestMsg()});
                    }
                    else{
                        res.json(result);
                    }
               });
            }

        });
    })
    .get(function (req, res) {

        MongoClient.connect('mongodb://newuser:newuser@localhost:27017/newdb', function(err, db)
        {
            if(err)
            {
                res.json({error: error.databaseConnectionError()});
            }
            else
            {
                db.collection("products").find().toArray(function(err, items) {
                    db.close();
                    if(err) 
                    {
                        res.json({error: error.invalidRequestMsg()});
                    }
                    else{
                        res.json(items);
                    }
               });
            }

        });
    });

    router.route('/:productId')
    .get(function (req, res) {
        MongoClient.connect('mongodb://newuser:newuser@localhost:27017/newdb', function(err, db)
        {
            if(err)
            {
               res.json({error: error.databaseConnectionError()});
            }
            else
            {
                var id = new mongoose.Types.ObjectId(req.params.productId);
                db.collection("products").findOne({"_id" : id}, function(err, result) {
                    db.close();
                    if (err)
                    {
                        res.json({error: error.invalidRequestMsg()});                    
                    }
                    else
                    {
                        console.log(result);
                        res.json(result);
                    }
                });
            }
        }); 
    })
module.exports = router;