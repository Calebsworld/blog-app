const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

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

CommentSchema.plugin(AutoIncrement, {
    inc_field: 'comment',
    id: 'id',
    start_seq: 1
});

module.exports = Comment;