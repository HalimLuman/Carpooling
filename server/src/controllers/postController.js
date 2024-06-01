import Post from "../models/postModel.js";
import asyncHandler from 'express-async-handler';
import User from "../models/userModel.js";
import { sendNotification } from "../utils/sendNotification.js";

// @desc Create a new post
// @route POST /api/posts
// @access Public
const createPost = asyncHandler(async (req, res) => {
    const { publisher, from, to, date, time, capacity, price } = req.body;

    try {
        const post = new Post({ publisher, from, to, date, time, capacity, price });
        await post.save();

        // Send a success response
        res.status(201).json({ success: true, message: 'Post created successfully', post });
    } catch (error) {
        // Send an error response
        res.status(500).json({ success: false, message: 'Failed to create post', error: error.message });
    }
});

const getPosts = asyncHandler(async (req, res) => {
    try {
        const posts = await Post.find().populate('publisher');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const deletePost = asyncHandler(async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json("Post has been deleted");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc Reserve a trip and notify the owner
// @route POST /api/trips/reserve
// @access Private
const reservePost = asyncHandler(async (req, res) => {
    const { postId, userId } = req.body;

    const post = await Post.findById(postId).populate('publisher');
    const user = await User.findById(userId);

    if (!post) {
        res.status(404);
        throw new Error('Trip not found');
    }

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    if (user._id.toString() === post.publisher._id.toString()) {
        res.status(400);
        throw new Error('You cannot reserve your own travel');
    }

    if (user.tokens <= 0) {
        res.status(400);
        throw new Error('Not enough tokens');
    }

    if (post.reservations.includes(userId) || post.pendingRequests.includes(userId)) {
        res.status(400);
        throw new Error('User already reserved or requested this trip');
    }

    post.pendingRequests.push(userId);
    await post.save();

    await sendNotification(user.email, post.publisher.name);
     res.status(201).json({_id: user._id, name: user.name, surname: user.surname, email: user.email, phone: user.phone, city: user.city, address: user.address, dateOfBirth: user.dateOfBirth, gender: user.gender, tokens: user.tokens});

});

// @desc Handle reservation request
// @route POST /api/trips/handle-request
// @access Private
const handleRequest = asyncHandler(async (req, res) => {
    const { postId, userId, action } = req.body; // action should be either 'accept' or 'reject'

    const post = await Post.findById(postId).populate('publisher');
    const user = await User.findById(userId);

    if (!post) {
        res.status(404);
        throw new Error('Trip not found');
    }

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    if (post.publisher._id.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error('You are not authorized to perform this action');
    }

    const requestIndex = post.pendingRequests.indexOf(userId);

    if (requestIndex === -1) {
        res.status(400);
        throw new Error('No such reservation request found');
    }

    if (action === 'accept') {
        if (post.reservations.length >= post.capacity) {
            res.status(400);
            throw new Error('Travel is full');
        }

        post.reservations.push(userId);
    }

    post.pendingRequests.splice(requestIndex, 1);
    await post.save();

    user.tokens -= 1;
    const updatedUser = await user.save();

    res.status(200).json({
        message: `Reservation has been ${action}ed`,
        user: {
            _id: updatedUser._id,
            name: updatedUser.name,
            surname: updatedUser.surname,
            email: updatedUser.email,
            phone: updatedUser.phone,
            dateOfBirth: updatedUser.dateOfBirth,
            city: updatedUser.city,
            address: updatedUser.address,
            gender: updatedUser.gender,
            tokens: updatedUser.tokens,
        }
    });
});

const getPendingRequests = asyncHandler(async (req, res) => {
    const posts = await Post.find({ pendingRequests: { $exists: true, $not: { $size: 0 } } }).populate('pendingRequests');

    const requests = posts.map(post => ({
        _id: post._id,
        from: post.from,
        to: post.to,
        date: post.date,
        pendingRequests: post.pendingRequests,
        user: post.publisher
    }));

    res.json(requests);
});

export {
    createPost,
    getPosts,
    deletePost,
    reservePost,
    handleRequest,
    getPendingRequests
};
