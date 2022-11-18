const express = require('express');

const blogsController = require('../controllers/blogsController');

const router = express.Router();

router.get('/blogs', blogsController.getAllPosts);

router.get('/blogs/:blogPostId', blogsController.getPostById);

module.exports = router;