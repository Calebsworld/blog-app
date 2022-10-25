const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const BlogPostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'User' 
    },
    tags: [String],
    likes: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Like',
        default: undefined
    }],
    comments: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Comment',
        default: undefined
    }]
}, 
{
    timestamps: true
});

BlogPostSchema.plugin(AutoIncrement, {
    inc_field: 'post',
    id: 'postNums',
    start_seq: 1
});



module.exports = mongoose.model('BlogPost', BlogPostSchema);

