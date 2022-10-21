const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const BlogPostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 
    body: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
        default: process.env.author
    },
    date: {
        type: date,
        required: true,
        default: () => Date.now()
    },
    likes: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Like'
    }],
    comments: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Like'
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

