import Post from "../models/postModel.js";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { sendNotification } from "../utils/sendNotification.js";
import { sendRequestAnswer } from "../utils/sendRequestAnswer.js";

// @desc Create a new post
// @route POST /api/posts
// @access Public
const createPost = asyncHandler(async (req, res) => {
  const { publisher, from, to, date, time, capacity, price, carModel, carColor, pets, smoking } = req.body;

  try {
    const userId = publisher;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.tokens < 1) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Not enough tokens to create a post",
        });
    }

    const post = new Post({ publisher, from, to, date, time, capacity, price, carModel, carColor, pets, smoking });
    await post.save();

    user.posts.push(post._id);
    user.createdPosts += 1;
    user.tokens -= 1;
    const updatedUser = await user.save();

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
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
        deletedPosts: updatedUser.deletedPosts,
        createdPosts: updatedUser.createdPosts,
        posts: updatedUser.posts,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to create post",
        error: error.message,
      });
  }
});

const getPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find().populate("publisher");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const deletePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    for (const reservationUserId of post.reservations) {
      const user = await User.findById(reservationUserId);
      if (user) {
        user.tokens += 1;
        await user.save();
      }
    }

    const publisherId = post.publisher;
    const user = await User.findById(publisherId);
    if (user) {
      user.posts = user.posts.filter(
        (postId) => postId.toString() !== post._id.toString()
      );
      user.deletedPosts += 1;
      await user.save();
    }

    await Post.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json("Post has been deleted and tokens have been returned to users");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const reservePost = asyncHandler(async (req, res) => {
  const { postId, userId } = req.body;

  try {
    const post = await Post.findById(postId).populate("publisher");
    const user = await User.findById(userId);

    if (!post) {
      return res.status(404).json({ message: "Trip not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user._id.toString() === post.publisher._id.toString()) {
      return res
        .status(400)
        .json({ message: "You cannot reserve your own travel" });
    }

    if (user.tokens <= 0) {
      return res.status(400).json({ message: "Not enough tokens" });
    }

    if (
      post.reservations.includes(userId) ||
      post.pendingRequests.includes(userId)
    ) {
      return res
        .status(400)
        .json({ message: "User already reserved or requested this trip" });
    }

    user.requestedPosts.push(postId);
    post.pendingRequests.push(userId);
    await post.save();
    await user.save();

    await sendNotification(post.publisher.email, post.publisher.name);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      phone: user.phone,
      city: user.city,
      address: user.address,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      tokens: user.tokens,
      posts: user.posts,
      deletedPosts: user.deletedPosts,
      joinedPosts: user.joinedPosts,
      requestedPosts: user.requestedPosts,
      comments: user.comments,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to reserve post", error: error.message });
  }
});

const handleRequest = asyncHandler(async (req, res) => {
  const { postId, userId, action } = req.body;

  try {
    const post = await Post.findById(postId).populate("publisher");
    const user = await User.findById(userId);

    if (!post) {
      return res.status(404).json({ message: "Trip not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (post.publisher._id.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform this action" });
    }

    const requestIndex = post.pendingRequests.indexOf(userId);

    if (requestIndex === -1) {
      return res
        .status(400)
        .json({ message: "No such reservation request found" });
    }

    let notificationMessage = "";
    if (action === "accept") {
      if (post.reservations.length >= post.capacity) {
        return res.status(400).json({ message: "Travel is full" });
      }

      post.reservations.push(userId);
      user.tokens -= 1;
      user.joinedPosts.push(postId);
      notificationMessage = "Your reservation request has been accepted.";
    } else if (action === "reject") {
      notificationMessage = "Your reservation request has been rejected.";
    } else {
      return res.status(400).json({ message: "Invalid action specified" });
    }

    post.pendingRequests.splice(requestIndex, 1);
    await post.save();
    await user.save();

    await sendRequestAnswer(user.email, user.name, notificationMessage);

    res.status(200).json({
      message: `Reservation has been ${action}ed`,
      user: {
        _id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth,
        city: user.city,
        address: user.address,
        gender: user.gender,
        tokens: user.tokens,
        posts: user.posts,
        deletedPosts: user.deletedPosts,
        joinedPosts: user.joinedPosts,
        requestedPosts: user.requestedPosts,
        comments: user.comments,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to handle request", error: error.message });
  }
});

const getPendingRequests = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    // Find posts by the current user that have pending requests
    const posts = await Post.find({
      publisher: userId,
      pendingRequests: { $exists: true, $not: { $size: 0 } },
    }).populate({
      path: 'pendingRequests',
      select: 'name email', // Select the fields you need from the requester
    });

    // Map the posts to extract relevant information including requesters' details
    const requests = posts.map((post) => ({
      _id: post._id,
      from: post.from,
      to: post.to,
      date: post.date,
      carColor: post.carColor,
      carModel: post.carModel,
      pets: post.pets,
      smoking: post.smoking,
      pendingRequests: post.pendingRequests.map(request => ({
        _id: request._id,
        name: request.name,
        email: request.email,
      })),
      user: post.publisher,
    }));

    res.json(requests);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch pending requests",
      error: error.message,
    });
  }
});


export {
  createPost,
  getPosts,
  deletePost,
  reservePost,
  handleRequest,
  getPendingRequests,
};
