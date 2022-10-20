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
        default: Date.now()
    },
    likes: [{
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'User'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
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

