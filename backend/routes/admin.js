const express = require('express');

const adminController = require('./controllers/adminControlller');

const router = express.Router();


router.get('/api/posts', adminController.getPosts);

router.post('/api/posts', adminController.createPosts);

router.post('/api/posts/:postId', adminController.updatePosts);

router.delete('/api/posts/:postId', adminController.deletePosts);


module.exports = router;