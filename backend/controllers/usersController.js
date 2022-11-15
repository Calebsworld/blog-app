const User = require('../models/User');

const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

// move to admin 
exports.getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    if (!users?.length) {
        res.status(400).json({message: 'No users found'});
    }
    res.json(users);
  
});

exports.updateUser = asyncHandler(async (req, res) => {
    const id = req.params.userId;
    const { username, password } = req.body;

    if (!id || !username || !password) {
        return res.status(400).json({message: 'All fields are required'});
    }

    const user = await User.findById(id).exec()

    if (!user) {
        res.status(400).json({ message: 'User not found'});
    }

    const duplicate = await User.findOne({ username }).lean().exec();
    if (duplicate && duplicate._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' });
    }

    user.username = username;
    if (password) {
        user.password = await bcrypt.hash(password, 10);
    }
    const updatedUser = await user.save();  
    res.json({message: `${updatedUser.username} updated`});
});

exports.deleteUser = asyncHandler(async (req, res) => {
    const id  = req.params.userId;
    
    if (!id) {
        res.status(400).json({ message: 'User ID Required'});  
    }

    const user = await User.findById(id).exec();
    if (!user) {
        res.status(400).json({ message: 'User not found'});
    }
    const result = await user.deleteOne();
    const reply = `Username ${result.username} with ID ${result.id} deleted`
    res.json(reply);
});



