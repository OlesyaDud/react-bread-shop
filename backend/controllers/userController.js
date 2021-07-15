import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// auth user, got token
const authUser = asyncHandler(async (req, res) => {
    // get data from the body (or submitted form on the fe)
    // add body parser in server.js to parse received req body
    const {email, password} = req.body;

    const user = await User.findOne({email: email});

    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
});

// get user profile/auth
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
       res.status(404)
        throw new Error('User not found')
    }
});

// update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if(user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        });

    } else {
       res.status(404)
        throw new Error('User not found')
    }
});

// register a user
const registerUser = asyncHandler(async (req, res) => {
    // get data from the body (or submitted form on the fe)
    // add body parser in server.js to parse received req body
    const {name, email, password} = req.body;

    const userExists = await User.findOne({email: email});

    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    };

    const user = await User.create({
        name, email, password
    });

    // if user is created
    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

});


export {authUser, registerUser, getUserProfile, updateUserProfile};