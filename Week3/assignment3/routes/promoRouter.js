var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var Promotions = require('../models/promotions')(mongoose);
var app = express();
var Verify = require('./verify');

var promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
    .get(Verify.verifyOrdinaryUser, function(req, res, next) {

        Promotions.find({}, function(err, promotion) {
            if (err) throw err;
            res.json(promotion);
        });

    })
    .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {

        Promotions.create(req.body, function(err, promotion) {
            //req.body contains the json formatted information (promotion) we want to add to the DB
            console.log('Promotion created');
            var id = promotion._id;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added promotion with id: ' + id);
        });

    }).delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {

        Promotions.remove({}, function(err, resp) {
            if (error) throw err;
            res.json(resp);
        });

    });

promoRouter.route('/:promotionId')
    .get(Verify.verifyOrdinaryUser, function(req, res, next) {

        Promotions.findById(req.params.promotionId, function(err, promotion) {
            if (err) throw err;
            res.json(promotion);
        })

    })
    .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {

        Promotions.findByIdAndUpdate(req.params.promotionId, {
            $set: req.body
        }, {
            new: true
        }, function(err, promotion) {
            if (err) throw err;
            res.json(promotion);
        });

    })
    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {

        Promotions.findByIdAndRemove(req.params.promotionId, function(err, resp) {
            if (err) throw err;
            res.json(resp);
        });

    });

module.exports = promoRouter;
