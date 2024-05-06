import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js'

// @desc  Auth user/set token
// route POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPasswords(password))){
        generateToken(res, user._id)
        res.status(201).json({_id: user._id, name: user.name, surname: user.surname, email: user.email, phone: user.phone, city: user.city, address: user.address, dateOfBirth: user.dateOfBirth, gender: user.gender});
    }else{
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

// @desc  Register a new user
// route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, surname, email, password, city, address, dateOfBirth, gender, phone } = req.body;
    const userExists = await User.findOne({email});

    if(userExists) {
        res.status(400);
        throw new Error("User already exists.");
    }

    const user = await User.create({name, surname, email, password, city, address, dateOfBirth, gender, phone});

    if(user){
        generateToken(res, user._id)
        res.status(201).json({_id: user._id, name: user.name, surname: user.surname, email: user.email, phone: user.phone, city: user.city, address: user.address, dateOfBirth: user.dateOfBirth, gender: user.gender});
    }else{
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// @desc  Logout a user
// route POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({message: 'User Logged out'});
});

// @desc  Get user profile
// route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        surname: req.user.surname,
        email: req.user.email,
        phone: req.user.phone,
        dateOfBirth: req.user.dateOfBirth,
        city: req.user.city,
        address: req.user.address,
        gender: req.user.gender,
    }

    res.status(200).json({user});
});

// @desc  Update user profile
// route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    
    if(user){
        user.name = req.body.name || user.name;
        user.surname = req.body.surname || user.surname;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth;
        user.city = req.body.city || user.city;
        user.address = req.body.adress || user.address;
        user.gender = req.body.gender || user.gender;

        if(req.body.password){
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            surname: updatedUser.surname,
            email: updatedUser.email,
            phone: updatedUser.phone,
            dateOfBirth: updatedUser.dateOfBirth,
            city: updatedUser.city,
            address: updatedUser.address,
            gender: updatedUser.gender,
        })
    }else{
        res.status(404);
        throw new Error('User not found');
    }
});

const deleteUser = asyncHandler(async (req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0)
        });
        res.status(200).json("User has been deleted");
    }catch(error){
        console.log(error.status);
    }
});


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    deleteUser,
}