const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'Client'
    }
});

module.exports = mongoose.model('User', userSchema);

