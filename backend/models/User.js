const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    }, 
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'guest'
        // guest, user, admin 
    }
});

module.exports = mongoose.model('User', userSchema);

