const express = require('express');

const adminController = require('../controllers/adminController');

const router = express.Router();


router.get('/posts', adminController.getAllPosts);

router.get('/posts/:postId', (req, res) => {
    // Implement in admin controller
});

router.post('/posts', adminController.createPosts);

router.post('/posts/:postId', adminController.updatePosts);

router.delete('/posts/:postsId', adminController.deletePosts);


module.exports = router;