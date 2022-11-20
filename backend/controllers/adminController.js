const BlogPost = require('../models/BlogPost');

const asyncHandler = require('express-async-handler');

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

exports.createPosts = asyncHandler (async (req, res) => {        
   
    const title = req.body.title;
    const content = req.body.content;
    const tags = req.body.tags
    
    if (!title || !content || !Array.isArray(tags) || !tags.length) {
       return res.status(400).json({message: 'All fields are required'})
    }

    if (!req.file) {
        throw Error("FILE_MISSING");
      } 

    const duplicate = await BlogPost.findOne({ title }).lean().exec();
    if (duplicate) {
        return res.status(409).json({message: 'duplicate title' });
    }

    const blogPostObject = {title, content, tags};
    const blogPost = await BlogPost.create(blogPostObject);

    if (blogPost) {

        const s3 = new S3Client({
            credentials: {
                accessKeyId: accessKey,
                secretAccessKey: secretAccessKey,
            },
            region: bucketRegion
        });
    
        const params = {
            Bucket: bucketName,
            Key: req.file.originalname,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        };
    
        const command = new PutObjectCommand(params);
        await s3.send(command);

        return res.status(201).json({message: `Blog post created ${blogPostObject.title}`});
    } else {
        return res.status(409).json({message: 'Invalid data recieved'});
    }

});

exports.updatePosts =  asyncHandler(async (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const content = req.body.content; 

    if (!id || !title || !content || !Array.isArray(tags) || !tags.length) {
        return res.status(400).json({message: 'All fields are required'})
    }

    const duplicate = await User.findOne({ title }).lean().exec();

    if (duplicate && duplicate._id.toSring() !== id) {
        return res.status(409).json({message: 'duplicate title' });
    }

    const blogPost = await BlogPost.findById(id);

    if (!blogPost) {
        return res.status(400).json({ message: 'Blog post not found' });
    }

    blogPost.title = title;
    blogPost.content = content;
    blogPost.tags = tags;

    // update image in s3 bucket

    const updatedBlogPost = await BlogPost.save(blogPost);
    res.status(201).json({message: `Successful update: ${updatedBlogPost}`});

});

exports.deletePosts =  asyncHandler(async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ message: 'Blog post ID Required' }); 
    }
    const blogPost = await BlogPost.findById(id);
    if (!blogPost) {
        return res.status(400).json({ message: 'Blog post not found' });
    }
    const result = await blogPost.deleteOne();
    const reply = `Blog post: ${result.title} by ${result.author} with ID ${result.id} deleted`
    res.json(reply);

});
