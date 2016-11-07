module.exports = function(mongoose) {
    var Schema = mongoose.Schema;

    var leaderSchema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        image: {
            type: String,
        },
        designation: {
            type: String
        },
        abbr: {
            type: String
        },
        description: {
            type: String,
            required: true
        }
    });

    var Leaders = mongoose.model('Leader', leaderSchema);

    return Leaders;
}
