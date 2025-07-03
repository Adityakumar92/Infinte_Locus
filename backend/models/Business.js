const mongoose = require('mongoose');
const BusinessSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        category:  {
            type: String,
            require: true
        },
        location:  {
            type: String,
            require: true
        },
        description:  {
            type: String,
            require: true
        },
        averageRating:  {
            type: Number
        },
    }
)

module.exports = mongoose.model('Business', BusinessSchema);