module.exports = function(mongoose) {
    var Schema = mongoose.Schema;

    require('mongoose-currency').loadType(mongoose);
    var Currency = mongoose.Types.Currency;

    var promotionSchema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        image: {
            type: String,
        },
        label: {
            type: String,
            default: ''
        },
        price: {
            type: Currency
        },
        description: {
            type: String,
            required: true
        }
    });

    var Promotions = mongoose.model('Promotion', promotionSchema);

    return Promotions;
}
