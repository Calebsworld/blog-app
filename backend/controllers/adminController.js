const BlogPost = require('../models/BlogPost');
const asyncHandler = require('express-async-handler');
const client = require('../util/s3Client')
const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const crpyto = require('crypto')
const sharp = require('sharp');

const bucketName = process.env.BUCKET_NAME;

const randomImageName = (bytes=32) => crpyto.randomBytes(bytes).toString('hex')

exports.createPosts = asyncHandler (async (req, res) => {        
    const title = req.body.title;
    const content = req.body.content;
    let tags = JSON.parse(req.body.tags);
    tags = tags.map(tag => {
        return { name: tag.name }
    });

    if (!title || !content || !Array.isArray(tags) || !tags.length) {
       return res.status(400).json({message: 'All fields are required'})
    }

    if (!req.file) {
        return res.status(400).json({message: 'File not found'})
      } 

    const duplicate = await BlogPost.findOne({ title }).lean().exec();
    if (duplicate) {
        return res.status(409).json({message: 'duplicate title' });
    }
    
    const imageName = randomImageName()
    const buffer = await sharp(req.file.buffer).resize({height: 1920, width: 1080, fit: 'contain' }).toBuffer()

    const params = {
        Bucket: bucketName,
        Key: imageName,
        Body: buffer,
        ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand(params);
    await client.send(command);

    const blogPostObject = {title, content, imageName, tags };
    const blogPost = await BlogPost.create(blogPostObject);

    if (blogPost) {
        return res.status(201).json({message: `Blog post created ${blogPostObject.title}`});
    } else {
        return res.status(409).json({message: 'Invalid data recieved'});
    }

});

exports.updatePosts =  asyncHandler(async (req, res) => {
    
    const id = req.params.postsId
    const title = req.body.title;
    const content = req.body.content;
    let tags = req.body.tags;
    tags = tags.map(tag => {
         return { name: tag.name }
    })

    if (!id || !title || !content || !Array.isArray(tags) || !tags.length) {
        return res.status(400).json({message: 'All fields are required'})
    }

    const duplicate = await BlogPost.findOne({ title }).lean().exec();

    if (duplicate && duplicate?._id.valueOf() !== id) {
        return res.status(409).json({message: 'Duplicate title' });
    }

    const blogPost = await BlogPost.findById(id);

    if (!blogPost) {
        return res.status(400).json({ message: 'Blog post not found' });
    }

    blogPost.title = title;
    blogPost.content = content;
    blogPost.tags = tags;

    const updatedBlogPost = await blogPost.save(blogPost);
    return res.status(201).json({message: `Successful update: ${updatedBlogPost}`});

 });

exports.deletePosts =  asyncHandler(async (req, res) => {
    const id  = req.params.postsId
    if (!id) {
        return res.status(400).json({ message: 'Blog post ID Required' }); 
    }
    const blogPost = await BlogPost.findById(id);
    if (!blogPost) {
        return res.status(400).json({ message: 'Blog post not found' });
    }

    const params = {
        Bucket: bucketName,
        Key: blogPost.imageName
    }
    const command = new DeleteObjectCommand(params);
    await client.send(command)
    
    const result = await blogPost.deleteOne();
    const reply = `Blog post: ${result.title} deleted`
    res.json(reply);
});
