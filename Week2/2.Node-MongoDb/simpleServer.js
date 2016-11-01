var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Connection url
var url = 'mongodb://localhost:27017/conFusion';
//Use connect ethod to connect to the Server
MongoClient.connect(url, function(err, db) {
    assert.equal(err, null);
    console.log("Connected correctly to the server");

    var collection = db.collection("dishes");
    collection.insertOne({
            name: "UltraPizza",
            description: "Ultra description"
        },
        function(err, result) {
            assert.equal(err, null);
            console.log("After Insert: ", result.ops);

            collection.find({}).toArray(function(err, docs) {
                assert.equal(err, null);
                console.log("Found: ", docs);

                db.dropCollection("dishes", function(err, result) {
                    assert.equal(err, null);
                    db.close();
                });
            });
        }
    );
});
