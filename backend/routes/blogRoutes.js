const express = require('express');

const blogsController = require('../controllers/blogsController');

const router = express.Router();

router.get('/posts', blogsController.getAllPosts);

router.get('/posts/:blogPostId', blogsController.getPostById);

module.exports = router;