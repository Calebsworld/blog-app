const express = require('express');
const multer = require('multer');

const adminController = require('../controllers/adminController');

const router = express.Router();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage, limits: { fieldSize: 25 * 1024 * 1024 } })

router.post('/posts', upload.single('image'), adminController.createPosts);

router.post('/posts/:postsId', upload.single('image'), adminController.updatePosts);

router.delete('/posts/:postsId', adminController.deletePosts);


module.exports = router;