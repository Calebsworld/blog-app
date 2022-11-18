const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler');

exports.login = asyncHandler (async (req, res) => {
    const { username, password } = req.body;

    if ( !username || !password) {
        return res.status(400).json({message: 'All fields are required'});
    }

    const foundUser = await User.findOne({ username }).exec()

    if (!foundUser) {
        return res.status(400).json({message: 'Username does not exists'});
    }    

});

exports.refresh = asyncHandler (async (req, res) => {
    //implement
});

exports.register = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;

    if ( !email || !username || !password) {
        return res.status(400).json({message: 'All fields are required'});
    }
   
    const duplicateEmail = await User.findOne({ email }).lean().exec();
    if (duplicateEmail) {
        return res.status(409).json({message: 'Duplicate Username' });
    }

    const duplicateUsername = await User.findOne({ username }).lean().exec();
    if (duplicateUsername) {
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

exports.logout = asyncHandler (async (req, res) => {
    //implement
 });