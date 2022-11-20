const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const LikeSchema = mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
});

LikeSchema.plugin(AutoIncrement, {
    inc_field: 'id',
    start_seq: 1
});

module.exports = mongoose.model('Like', LikeSchema);