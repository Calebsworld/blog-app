const express = require('express');

const router = express.Router();

const usersController = require('../controllers/usersController');
 
router.get('/users', usersController.getAllUsers);

router.post('users/:userId', usersController.updateUser);

router.delete('users/:userId', usersController.deleteUser);


module.exports = router;