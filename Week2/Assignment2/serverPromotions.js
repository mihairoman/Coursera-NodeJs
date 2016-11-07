var mongoose = require('mongoose'),
    Promotions = require('./models/promotions')(mongoose);
/*
 ** Connection to the DB
 */
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error!'));
db.once('open', function() {
    console.log('Connected to the server');

    Promotions.create({
        name: "Best Promotion",
        description: "Best promotion for best clients",
        price: '$6.00'
    }, function(err, promotion) {
        if (err) throw err;

        console.log('#########Created promotion \n', promotion, ' with ID ', promotion._id);
        var id = promotion._id;

        Promotions.findByIdAndUpdate(id, {
            $set: {
                name: 'Regular Promotion',
                description: 'Regular promotion',
                price: '$2.00'
            }
        }, {
            new: true
        }).exec(function(err, promotion) {
            if (err) throw err;

            console.log('##############Updated Promotion! \n', promotion);
            db.collection('promotions').drop(function() {
                db.close();
            });
        });
    });
});
