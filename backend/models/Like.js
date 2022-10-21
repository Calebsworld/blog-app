const mongoose = require('mongoose');

const mongoose = require('mongoose');

const Like = mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
});

module.exports = Like;