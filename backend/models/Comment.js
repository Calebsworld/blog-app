const mongoose = require('mongoose');

const Comment = mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    body: String,
    date: () => date.now(),
    likes: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Like'
    }] 
});

module.exports = Comment;