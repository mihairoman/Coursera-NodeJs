var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var Dishes = require('../models/dishes')(mongoose),
    Verify = require('./verify'),
    app = express();

var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
    .get(Verify.verifyOrdinaryUser, function(req, res, next) {

        Dishes.find({}, function(err, dish) {
            if (err) throw err;
            res.json(dish);
        });

    })
    .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
        Dishes.create(req.body, function(err, dish) {
            //req.body contains the json formatted information (dish) we want to add to the DB
            console.log('Dish created');
            var id = dish._id;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added dish with id: ' + id);
        });

    }).delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {

        Dishes.remove({}, function(err, resp) {
            if (error) throw err;
            res.json(resp);
        });

    });

dishRouter.route('/:dishId')
    .get(Verify.verifyOrdinaryUser, function(req, res, next) {

        Dishes.findById(req.params.dishId, function(err, dish) {
            if (err) throw err;
            res.json(dish);
        })

    })
    .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {

        Dishes.findByIdAndUpdate(req.params.dishId, {
            $set: req.body
        }, {
            new: true
        }, function(err, dish) {
            if (err) throw err;
            res.json(dish);
        });

    })
    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {

        Dishes.findByIdAndRemove(req.params.dishId, function(err, resp) {
            if (err) throw err;
            res.json(resp);
        });

    });

dishRouter.route('/:dishId/comments')
    .get(Verify.verifyOrdinaryUser, function(req, res, next) {

        Dishes.findById(req.params.dishId, function(err, dish) {
            if (err) throw err;
            res.json(dish.comments);
        });

    })
    .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
        if (err) throw err;

        dish.comments.push(req.body);
        dish.save(function(err, dish) {
            if (err) throw err;
            console.log('Updated Comments for ', dish);
            res.json(dish);
        });
    })
    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {

        Dishes.findById(req.patams.dishId, function(err, dish) {
            if (err) throw err;
            var i = dish.comments.length - 1;
            for (i; i >= 0; i--) {
                dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save(function(err, result) {
                if (err) throw err;
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end('All comments were deleted!');
            })
        });

    });

dishRouter.route('/:dishId/comments/:commentId')
    .get(Verify.verifyOrdinaryUser, function(req, res, next) {
        Dishes.findById(req.params.dishId, function(err, dish) {
            if (err) throw err;
            res.json(dish.comments.id(req.params.commentId));
        });
    })
    .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
        Dishes.findById(req.params.dishId, function(err, dish) {
            if (err) throw err;
            dish.comments.id(req.params.commentId).remove();
            dish.comments.push(req.body);
            dish.save(function(err, dish) {
                if (err) throw err;
                console.log('Updated Comments for : ', dish);
                res.json(dish);
            });
        });
    })
    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
        Dishes.findById(req.params.dishId, function(err, dish) {
            dish.comments.id(req.params.commentId).remove();
            dish.save(function(err, resp) {
                if (err) throw err;
                res.json(resp);
            })
        });
    });

module.exports = dishRouter;
