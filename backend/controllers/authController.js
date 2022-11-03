const User = require('../models/User');

const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');



exports.registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({message: 'All fields are required'});
    }
    
    const duplicate = await User.findOne({ username }).lean().exec();
    if (duplicate) {
        return res.status(409).json({message: 'Duplicate Username' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userObject = { username, "password": hashedPassword, email };
    const user = User.create(userObject);

    if (user) {
        res.status(201).json({ message: `New user ${username} created`});
    } else {
        res.status(400).json({ message: 'Invalid user data recieved'});
    }

});