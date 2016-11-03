var assert = require('assert');

exports.insertDocument = function(db, document, collection, callback) {
    //get the documents collection
    var coll = db.collection(collection);
    //insert documents
    coll.insert(document, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted " + result.result.n + " douments into the document " +
            "collection " + collection);
        callback(result);
    });
};

exports.findDocuments = function(db, collection, callback) {
    var coll = db.collection(collection);
    coll.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        callback(docs);
    });
};

exports.removeDocument = function(db, document, collection, callback) {
    var coll = db.collection(collection);
    coll.deleteOne(document, function(err, result) {
        assert.equal(err, null);
        console.log("Removed the document " + document);
        callback(result);
    });
};

exports.updateDocument = function(db, document, update, collection, callback) {
    //get the documents collection
    var coll = db.collection(collection);
    //insert documents
    coll.updateOne(document, { $set: update }, null, function(err, result) {
        assert.equal(err, null);
        console.log("Updated the document with " + " from " +
            "collection " + collection);
        callback(result);
    });
};
