const express = require('express');

const adminController = require('../controllers/adminController');

const router = express.Router();


router.get('/api/posts', adminController.getAllPosts);

router.post('/api/posts', adminController.createPosts);

router.post('/api/posts/:postId', adminController.updatePosts);

router.delete('/api/posts/:postsId', adminController.deletePosts);


module.exports = router;