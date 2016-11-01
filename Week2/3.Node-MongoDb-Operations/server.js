var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var dboper = require('./operations'),
    url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to the server");

    dboper.insertDocument(db, {
            name: "Bellington",
            description: "YumYum"
        },
        "dishes",
        function (result) {
            console.log(result.ops);
        }
    );
});
