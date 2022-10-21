const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Like = mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
});

LikeSchema.plugin(AutoIncrement, {
    inc_field: 'like',
    id: 'id',
    start_seq: 1
});

module.exports = Like;