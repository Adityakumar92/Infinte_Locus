const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    business: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Business' 
    },
    rating: {
        quality: Number,
        service: Number,
        value: Number
    },
    comment: {
            type: String,
    },
    status: { 
        type: String, 
        default: 'pending' } // 'pending', 'approved', 'rejected'
}, { timestamps: true });

module.exports = mongoose.model('Review', ReviewSchema);