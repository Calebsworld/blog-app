const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = mongoose.Schema({
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
        default: 'user'
        // user, admin 
    }
});

UserSchema.plugin(AutoIncrement, {
    inc_field: '1',
    start_seq: 1
});

module.exports = mongoose.model('User', UserSchema);

