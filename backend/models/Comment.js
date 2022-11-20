const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const CommentSchema = mongoose.Schema({
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
    inc_field: 'id',
    start_seq: 1
});

module.exports = mongoose.model('Comment', CommentSchema);