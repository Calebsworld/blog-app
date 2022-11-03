const { findById } = require('../models/BlogPost');
const BlogPost = require('../models/BlogPost');

const asyncHandler = require('express-async-handler');

exports.getAllPosts = asyncHandler(async (req, res) => {
    const blogPosts = await BlogPost.find();
    if (!blogPosts) {
        res.status(400).json({message: 'No blog posts found'});
    }
    res.json(blogPosts);
  
});

exports.getPostById = asyncHandler(async (req, res) => {
    // make this work with my own custom id not the default _id provided by Mongo 
    const blogPostId = req.params.blogPostId;
    const blogPost = await BlogPost.findById(blogPostId);
    if (!blogPost) {
        res.status(400).json({message: 'Blog Post does not exist'});
    }
    res.json(blogPost);
});

