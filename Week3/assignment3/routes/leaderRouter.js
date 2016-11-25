var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var Leaders = require('../models/leaders')(mongoose);
var app = express();
var Verify = require('./verify');

var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
    .get(Verify.verifyOrdinaryUser, function(req, res, next) {

        Leaders.find({}, function(err, leader) {
            if (err) throw err;
            res.json(leader);
        });

    })
    .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {

        Leaders.create(req.body, function(err, leader) {
            //req.body contains the json formatted information (leader) we want to add to the DB
            console.log('Leader created');
            var id = leader._id;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added leader with id: ' + id);
        });

    }).delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {

        Leaders.remove({}, function(err, resp) {
            if (error) throw err;
            res.json(resp);
        });

    });

leaderRouter.route('/:leaderId')
    .get(Verify.verifyOrdinaryUser, function(req, res, next) {

        Leaders.findById(req.params.leaderId, function(err, leader) {
            if (err) throw err;
            res.json(leader);
        })

    })
    .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {

        Leaders.findByIdAndUpdate(req.params.leaderId, {
            $set: req.body
        }, {
            new: true
        }, function(err, leader) {
            if (err) throw err;
            res.json(leader);
        });

    })
    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {

        Leaders.findByIdAndRemove(req.params.leaderId, function(err, resp) {
            if (err) throw err;
            res.json(resp);
        });

    });

module.exports = leaderRouter;
