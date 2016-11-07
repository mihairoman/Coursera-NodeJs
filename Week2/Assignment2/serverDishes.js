var mongoose = require('mongoose'),
    Dishes = require('./models/dishes')(mongoose);

/*
 ** Connection to the DB
 */
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error!'));
db.once('open', function() {
    console.log('Connected to the server');

    Dishes.create({
        name: "My Peperonnies",
        description: "Best pizza",
        category: "pizza",
        price: '$14.00',
        comments: [{
            rating: 5,
            comment: 'Delicious!',
            author: 'Tommy'
        }, {
            rating: 3,
            comment: 'Pretty average',
            author: 'Ann'
        }]
    }, function(err, dish) {
        if (err) throw err;

        console.log('#########Created dish \n', dish, ' with ID ', dish._id);
        var id = dish._id;

        Dishes.findByIdAndUpdate(id, {
            $set: {
                price: '$11.50'
            }
        }, {
            new: true
        }).exec(function(err, dish) {
            if (err) throw err;

            console.log('##############Updated Dish! \n', dish);
            // Dishes.findOne({
            //     _id: dish._id
            // }).select({
            //     comments: {
            //         $elemMatch: {
            //             rating: {
            //                 $lte: 3
            //             }
            //         }
            //     }
            // }).exec(function(err, dish) {
            //if (err) throw err;
            //console.log("######THE COMMENT \n", dish.comments);

            dish.comments.push({
                rating: 4,
                comment: "Pleasant experience",
                author: "Harry"
            });

            dish.save(function(err, dish) {
                if (err) throw err;
                console.log('#######New comments! \n', dish);

                db.collection('dishes').drop(function() {
                    db.close();
                });

            })
        });
    });
});
