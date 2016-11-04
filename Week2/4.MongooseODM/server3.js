var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes3')(mongoose);

/*
 ** Connection to the DB
 */
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected correctly to the server');

    Dishes.create({
        name: "UltraPizza",
        description: "Yummy Yummy",
        comments: [{
            rating: 3,
            comment: 'Pretty decent',
            author: "Patrick Patrickson"
        }]
    }, function(err, dish) {
        if (err) throw err;

        console.log('Dish created!');
        console.log(dish);
        var id = dish._id;

        setTimeout(function() {
            Dishes.findByIdAndUpdate(id, {
                $set: {
                    description: 'Updated Yummy Yum'
                }
            }, {
                //returns the updated dish
                new: true
            }).exec(function(err, dish) {
                if (err) throw err;
                console.log('UPDATED DISH! \n', dish);

                dish.comments.push({
                    rating: 5,
                    comment: 'Liking it very much',
                    author: 'Robert Robertson'
                });

                dish.save(function(err, dish) {
                    if (err) throw err;
                    console.log('Updated comments!!! \n', dish);

                    db.collection('dishes').drop(function() {
                        db.close();
                    })
                });

            });
        }, 2000);
    });
});
