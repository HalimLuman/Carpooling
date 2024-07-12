import Post from "../models/postModel.js";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { sendNotification } from "../utils/sendNotification.js";
import { sendRequestAnswer } from "../utils/sendRequestAnswer.js";

// Create a new post
const createPost = asyncHandler(async (req, res) => {
  const { publisher, from, to, date, time, capacity, price, carModel, carColor, pets, smoking } = req.body;

  try {
    const user = await User.findById(publisher);

    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    if (user.tokens < 1) return res.status(400).json({ success: false, message: "Not enough tokens to create a post" });

    const post = new Post({ publisher, from, to, date, time, capacity, price, carModel, carColor, pets, smoking });
    await post.save();

    user.posts.push(post._id);
    user.createdPosts += 1;
    user.tokens -= 1;
    await user.save();

    res.status(201).json({ success: true, message: "Post created successfully", post, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create post", error: error.message });
  }
});

// Get all posts
const getPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find().populate("publisher").populate({ path: 'reservations', select: '-password' });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a post
const deletePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    for (const userId of post.reservations) {
      const user = await User.findById(userId);
      if (user) {
        user.tokens += 1;
        await user.save();
      }
    }

    const user = await User.findById(post.publisher);
    if (user) {
      user.posts = user.posts.filter(id => id.toString() !== post._id.toString());
      user.deletedPosts += 1;
      await user.save();
    }

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("Post has been deleted and tokens have been returned to users");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Leave a post (cancel reservation)
const leavePost = asyncHandler(async (req, res) => {
  const { postId, userId } = req.body;

  try {
    const post = await Post.findById(postId).populate("publisher");
    const user = await User.findById(userId);

    if (!post) return res.status(404).json({ message: "Trip not found" });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!post.reservations.includes(userId)) return res.status(400).json({ message: "User has not reserved this trip" });

    const reservationIndex = post.reservations.indexOf(userId);
    if (reservationIndex === -1) return res.status(400).json({ message: "No such reservation found" });

    post.reservations.splice(reservationIndex, 1);
    user.joinedPosts = user.joinedPosts.filter(postId => postId.toString() !== post._id.toString());
    await post.save();
    await user.save();

    // Optionally send notification to the user
    await sendRequestAnswer(user.email, user.name, "A reservation has been canceled on your recent travel, check your travel status to see what has been changed.");

    res.status(200).json({ message: "Reservation has been cancelled", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to leave post", error: error.message });
  }
});

// Reserve a post
const reservePost = asyncHandler(async (req, res) => {
  const { postId, userId } = req.body;

  try {
    const post = await Post.findById(postId).populate("publisher");
    const user = await User.findById(userId);

    if (!post) return res.status(404).json({ message: "Trip not found" });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user._id.toString() === post.publisher._id.toString()) return res.status(400).json({ message: "You cannot reserve your own travel" });
    if (user.tokens <= 0) return res.status(400).json({ message: "Not enough tokens" });
    if (post.reservations.includes(userId) || post.pendingRequests.includes(userId)) return res.status(400).json({ message: "User already reserved or requested this trip" });

    user.requestedPosts.push(postId);
    post.pendingRequests.push(userId);
    await post.save();
    await user.save();

    await sendNotification(post.publisher.email, post.publisher.name);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to reserve post", error: error.message });
  }
});

// Handle reservation request
const handleRequest = asyncHandler(async (req, res) => {
  const { postId, userId, action } = req.body;

  try {
    const post = await Post.findById(postId).populate("publisher");
    const user = await User.findById(userId);

    if (!post) return res.status(404).json({ message: "Trip not found" });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (post.publisher._id.toString() !== req.user._id.toString()) return res.status(403).json({ message: "You are not authorized to perform this action" });

    const requestIndex = post.pendingRequests.indexOf(userId);
    if (requestIndex === -1) return res.status(400).json({ message: "No such reservation request found" });

    let notificationMessage = "";
    if (action === "accept") {
      if (post.reservations.length >= post.capacity) return res.status(400).json({ message: "Travel is full" });

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
    res.status(200).json({ message: `Reservation has been ${action}ed`, user });
  } catch (error) {
    res.status(500).json({ message: "Failed to handle request", error: error.message });
  }
});

// Get pending requests
const getPendingRequests = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find({
      publisher: req.user._id,
      pendingRequests: { $exists: true, $not: { $size: 0 } },
      date: { $gte: new Date() } 
    }).populate({
      path: 'pendingRequests',
      select: 'profilePic name email surname gender city age createdPosts joinedPosts deletedPosts',
    }).populate({
      path: 'reservations',
      select: 'name email surname gender city age createdPosts joinedPosts deletedPosts',
    });

    const requests = posts.map(post => ({
      _id: post._id,
      from: post.from,
      to: post.to,
      date: post.date,
      carColor: post.carColor,
      carModel: post.carModel,
      pets: post.pets,
      smoking: post.smoking,
      pendingRequests: post.pendingRequests.map(req => ({
        _id: req._id,
        profilePic: req.profilePic,
        name: req.name,
        surname: req.surname,
        email: req.email,
        gender: req.gender,
        city: req.city,
        age: req.age,
        createdPosts: req.createdPosts,
        joinedPosts: req.joinedPosts,
        deletedPosts: req.deletedPosts,
      })),
      reservations: post.reservations.map(res => ({
        _id: res._id,
        name: res.name,
        surname: res.surname,
        email: res.email,
        gender: res.gender,
        city: res.city,
        age: res.age,
        createdPosts: res.createdPosts,
        joinedPosts: res.joinedPosts,
        deletedPosts: res.deletedPosts,
      })),
      user: post.publisher,
    }));

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch pending requests", error: error.message });
  }
});

const handleExpiredPosts = async () => {
  try {
    // Get all posts that have expired
    const expiredPosts = await Post.find({
      date: { $lt: new Date() }
    });

    for (const post of expiredPosts) {
      // Remove pendingRequests from users
      for (const userId of post.pendingRequests) {
        const user = await User.findById(userId);
        if (user) {
          user.requestedPosts = user.requestedPosts.filter(requestId => requestId.toString() !== post._id.toString());
          await user.save();
        }
      }

      // Clear pendingRequests from the post
      post.pendingRequests = [];
      
      if (post.reservations.length === 0) {
        const user = await User.findById(post.publisher);
        if (user) {
          user.tokens += 1; // Return 1 token to the user
          await user.save();
          console.log(`Returned 1 token to user ${user._id} for expired post ${post._id}`);
        }

        // Delete the expired post
        await Post.findByIdAndDelete(post._id);
        console.log(`Deleted expired post ${post._id}`);
      } else {
        await post.save();
        console.log(`Cleared pending requests for expired post ${post._id}`);
      }
    }

    console.log('Expired posts handled successfully');
  } catch (error) {
    console.error('Error handling expired posts:', error.message);
  }
};

export {
  createPost,
  getPosts,
  deletePost,
  reservePost,
  handleRequest,
  getPendingRequests,
  handleExpiredPosts,
  leavePost
};
