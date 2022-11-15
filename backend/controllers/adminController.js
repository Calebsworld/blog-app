const BlogPost = require('../models/BlogPost');

const asyncHandler = require('express-async-handler');
const multer = require('multer');

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

// middleware that processes a file and stores it in a memory before placing image in s3 bucket
const storage = multer.memoryStorage()
const upload = multer({ storage: storage, limits: { fieldSize: 10 * 1024 * 1024 } })

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

exports.createPosts = (upload.single('image'), asyncHandler (async (req, res) => {    
    const { title, content, tags} = req.body;
    
    // if (!title || !content || !Array.isArray(tags) || !tags.length) {
    //     res.status(400).json({message: 'All fields are required'})
    // }

    // const duplicate = await BlogPost.findOne({ title }).lean().exec();
    // if (duplicate) {
    //     return res.status(409).json({message: 'duplicate title' });
    // }

    // const blogPostObject = {title, content, tags};
    // // const blogPost = await BlogPost.create(blogPostObject);

    // // if (blogPostObject) {
    // //     res.status(201).json({message: `Blog post created ${blogPostObject.title}`});
    // // } else {
    // //     res.status(409).json({message: 'Invalid data recieved'});
    // // }

    // const s3 = new S3Client({
    //     credentials: {
    //         accessKeyId:  accessKey,
    //         secretAccessKey: secretAccessKey,
    //     },
    //     region: bucketRegion
    // });

    console.log(req.file)
    
    // const params = {
    //     Bucket: bucketName,
    //     Key: req.file.originalname,
    //     Body: req.file.buffer,
    //     ContentType: req.file.mimetype,
    // };

    // const command = new PutObjectCommand(params);
    // await s3.send(command);
}));

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
