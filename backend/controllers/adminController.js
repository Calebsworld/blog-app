const BlogPost = require('../models/BlogPost');

const asyncHandler = require('express-async-handler');
const multer = require('multer');


// const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

// const storage = multer.memoryStorage()
// const upload = multer({ storage: storage })

// const bucketName = process.env.BUCKET_NAME;
// const bucketRegion = process.env.BUCKET_REGION;
// const accessKey = process.env.ACCESS_KEY;
// const secretAccessKey = process.env.SECRET_ACCESS_KEY;

// const s3 = new S3Client({
//     credentials: {
//         accessKeyId:  accessKey,
//         secretAccessKey: secretAccessKey,
//     },
//     region: bucketRegion
// });

exports.getAllPosts = asyncHandler(async (req, res) => {
    const blogPosts = BlogPost.find();
    if (!blogPosts) {
        res.status(400).json({message: 'No blog posts found'});
    }
    res.json(blogPosts);
  
});

exports.createPosts =  asyncHandler(async (req, res) => {    
// upload.single('image') goes before callback

    const { title, content, image, tags, author } = req.body;

    if (!title || !content || !image || !Array.isArray(tags) || !tags.length || !author) {
        res.status(400).json({message: 'All fields are required'})
    }

    const duplicate = await User.findOne({ title }).lean().exec();
    if (duplicate) {
        return res.status(409).json({message: 'duplicate title' });
    }

    const blogPostObject = {title, content, image, tags, author };n
    const blogPost = await BlogPost.create(blogPostObject);

    if (blogPost) {
        res.status(201).json({message: `Blog post created ${blogPost.title} by ${blogPost.author}`});
    } else {
        res.status(409).json({message: 'Invalid data recieved'});
    }
    
    
    
    // const params = {
    //     Bucket: bucketName,
    //     Key: req.file.originalname,
    //     Body: req.file.buffer,
    //     ContentType: req.file.mimetype,
    // };

    // const command = new PutObjectCommand(params);
    // await s3.send(command);

});

exports.updatePosts =  asyncHandler(async (req, res) => {
    const { id, title, content, image, tags, author } = req.body;

    if (!id || !title || !content || !image || !Array.isArray(tags) || !tags.length || !author) {
        res.status(400).json({message: 'All fields are required'})
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
