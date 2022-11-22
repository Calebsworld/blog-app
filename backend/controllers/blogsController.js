const BlogPost = require('../models/BlogPost');
const mongoose = require('mongoose');

const asyncHandler = require('express-async-handler');

exports.getAllPosts = asyncHandler(async (req, res) => {
    const blogPosts = await BlogPost.find();
    if (!blogPosts) {
       return res.status(400).json({message: 'No blog posts found'});
    }
   return res.json(blogPosts);
  
});

exports.getPostById = asyncHandler(async (req, res) => {
    const blogPostId = req.params.blogPostId;
    let blogPost;
    if(mongoose.Types.ObjectId.isValid(blogPostId)) {
        blogPost = await BlogPost.findById(blogPostId);
    } else {
       return res.status(400).json({message: 'Not a valid id'})
    }
    if (!blogPost) {
       return res.status(400).json({message: 'Blog Post does not exist'});
    }
    return res.json(blogPost);
});

