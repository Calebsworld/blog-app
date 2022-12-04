const BlogPost = require('../models/BlogPost');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const client = require('../util/s3Client')

const bucketName = process.env.BUCKET_NAME;

exports.getAllPosts = asyncHandler(async (req, res) => {
   try {
      const blogPosts = await BlogPost.find();
      const mappedblogPosts = blogPosts.map(async post => {
         const getObjectParams = {
            Bucket: bucketName,
            Key: post.imageName,
         }
         const command = new GetObjectCommand(getObjectParams);
         const url = await getSignedUrl(client, command, { expiresIn: 60 })
         return {...post.toObject(), imageUrl: url };
      })
      const results = await Promise.all(mappedblogPosts)
      if (!results) {
         return res.status(400).json({message: 'No blog posts found'});
      }
      return res.status(200).json(results);
   } catch(err) {
      console.log(err)
      return res.status(500).json({message: 'Server error'})
   }
});

exports.getPostById = asyncHandler(async (req, res) => {
   const blogPostId = req.params.blogPostId;
   if (!mongoose.Types.ObjectId.isValid(blogPostId)) {
      return res.status(400).json({message: 'Not a valid id'})
   }
   const blogPost = await BlogPost.findById(blogPostId);
   if (!blogPost) {
      return res.status(400).json({message: 'Blog Post does not exist'});
   }
   return res.json(blogPost);
});

