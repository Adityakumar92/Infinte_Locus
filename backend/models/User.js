const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        email: { 
            type: String, 
            unique: true },
        password: {
            type: String,
            require: true
        },
        role: { type: String, 
            default: 'user' 
        }
    },{
        timestamps: true
    }
)

module.exports = mongoose.model('User', UserSchema);
