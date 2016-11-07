var mongoose = require('mongoose'),
    Leaders = require('./models/leaders')(mongoose);

/*
 ** Connection to the DB
 */
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error!'));
db.once('open', function() {
    console.log('Connected to the server');

    Leaders.create({
        name: "Thomas Peterson",
        designation: "General Manager",
        abbr: 'GM',
        description: 'The man who manages'
    }, function(err, leader) {
        if (err) throw err;

        console.log('#########Created leader \n', leader, ' with ID ', leader._id);
        var id = leader._id;

        Leaders.findByIdAndUpdate(id, {
            $set: {
                designation: 'Project Manager',
                description: 'Nobody knows what he does'
            }
        }, {
            new: true
        }).exec(function(err, leader) {
            if (err) throw err;

            console.log('##############Updated Leader! \n', leader);
            db.collection('leaders').drop(function() {
                db.close();
            });
        });
    });
});
