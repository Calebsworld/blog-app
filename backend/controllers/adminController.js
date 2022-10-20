const multer = require('multer');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
    credentials: {
        accessKeyId:  accessKey,
        secretAccessKey: secretAccessKey,
    },
    region: bucketRegion
});

module.exports = getPosts = async (req, res, next) => {
    // Gets all posts from DB and serves to client via JSON
};

module.exports = createPosts = upload.single('image'), async (req, res, next) => {
    // Create new blog posts instance in DB

    // puts blog image into the s3 bucket

    const params = {
        Bucket: bucketName,
        Key: req.file.originalname,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);
};

module.exports = updatePosts = async (req, res, next) => {
    // Update an instance of a posts in the DB by ID
};

module.exports = deletePosts = async (req, res, next) => {
    // Delete an instance of a posts from the DB by ID
};
