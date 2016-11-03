var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

const dboper = require('./operations'),
    url = 'mongodb://localhost:27017/conFusion',
    collection = "dishes";

MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to the server");

    //First DB access
    dboper.insertDocument(db, {
            name: "Bellington",
            description: "YumYum"
        },
        collection,
        function(result) {
            console.log(" Insertion Result ", result.ops);
            //Second DB access - in the callback function
            dboper.findDocuments(db, collection, function(docs) {
                console.log(docs);
                //third DB call - in the callback function for findDocuments
                dboper.updateDocument(db, {
                        name: "Bellington"
                    }, {
                        description: "Updated Document"
                    }, collection,
                    function(result) {
                        console.log("Update result ", result);
                        //4th DB call - findDocuments after the update
                        dboper.findDocuments(db, collection, function(docs) {
                            console.log(docs);
                            //5th DB call - drop the collection
                            db.dropCollection(collection, function(result) {
                                console.log(result);
                                db.close();
                            });
                        })
                    });
            });
        }
    );
});
