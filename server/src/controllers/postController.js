import Post from "../models/postModel.js";
import asyncHandler from 'express-async-handler';

// @desc  Register a new user
// route POST /api/users
// @access Public
const createPost = asyncHandler(async (req, res) => {
    const {publisher, from, to, date, time, capacity, price } = req.body;

    try {
        const post = new Post({publisher, from, to, date, time, capacity, price });
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
    try{
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json("Post has been deleted");
        console.log('here');
    }catch(error){
        console.log(error.status);
    }
});

export {
    createPost,
    getPosts,
    deletePost,
}