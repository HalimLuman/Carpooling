import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import generateOTP from "../utils/generateOTP.js";
import Post from "../models/postModel.js";
import { sendOTPByEmail } from "../utils/sendOTP.js";
import bcrypt from "bcryptjs";
import Comment from "../models/commentModel.js";
import { sendResetPassword } from "../utils/sendResetPassword.js";
import crypto from "crypto";

// Password validation function
const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&:])[A-Za-z\d$@$!%*#?&:]{8,}$/;
  return passwordRegex.test(password);
};

// Validate required fields in the request body
const validateRequiredFields = (fields, body) => {
  for (const field of fields) {
    if (!body[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
};

// Generate a response object for a user
const generateUserResponse = (user) => ({
  _id: user._id,
  profilePic: user.profilePic,
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
  createdPosts: user.createdPosts,
  joinedPosts: user.joinedPosts,
  requestedPosts: user.requestedPosts,
  comments: user.comments,
});

// Authenticate user and generate a token
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    generateToken(res, user._id);
    res.status(201).json(generateUserResponse(user));
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, surname, email, password, city, address, dateOfBirth, gender, phone } = req.body;

  validateRequiredFields(["name", "surname", "email", "password", "city", "address", "dateOfBirth", "gender", "phone"], req.body);

  if (!validatePassword(password)) {
    throw new Error("Password must contain at least 8 characters, one number, one letter, and one symbol");
  }

  if (name.length < 3 || surname.length < 3) {
    throw new Error("Name and surname must contain at least 3 characters");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already exists.");
  }

  const profilePic = `https://avatar.iran.liara.run/username?username=${name}+${surname}`;

  const user = await User.create({ name, surname, email, password, city, address, dateOfBirth, gender, phone, profilePic });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json(generateUserResponse(user));
  } else {
    throw new Error("Invalid user data");
  }
});

// Handle forgot password by generating a reset token and sending it via email
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("Email is not registered");
  }

  const resetToken = crypto.randomBytes(20).toString("hex");

  user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

  await user.save();

  const resetUrl = `${req.protocol}://localhost:3000/resetpassword/${resetToken}`;

  try {
    await sendResetPassword(email, resetUrl);
    res.status(200).json({ success: true, data: "Email sent" });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(500);
    throw new Error("Email could not be sent");
  }
});

// Reset password using the reset token
const resetPassword = asyncHandler(async (req, res) => {
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.resettoken).digest("hex");

  const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });

  if (!user) {
    res.status(400);
    throw new Error("Invalid token");
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({ success: true, data: "Password updated successfully" });
});

// Log out the user
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "User logged out" });
});

// Get the logged-in user's profile
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ user: generateUserResponse(req.user) });
});

// Update the user's profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { phone, dateOfBirth, city, address, gender, newPassword, password } = req.body;

    user.phone = phone || user.phone;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;
    user.city = city || user.city;
    user.address = address || user.address;
    user.gender = gender || user.gender;

    if (newPassword) {
      if (!(await bcrypt.compare(password, user.password))) {
        res.status(401);
        throw new Error("Invalid current password");
      }
      user.password = newPassword;
    }

    const updatedUser = await user.save();
    res.status(200).json(generateUserResponse(updatedUser));
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Delete a user and their posts
const deleteUser = asyncHandler(async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Post.deleteMany({ publisher: req.params.id });
    res.clearCookie("jwt", { httpOnly: true, expires: new Date(0) });
    res.status(200).json("User has been deleted");
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error: error.message });
  }
});

// Verify user by sending an OTP to their email
const verifyUser = asyncHandler(async (req, res) => {
  const { name, surname, email } = req.body;

  validateRequiredFields(["name", "surname", "email", "password", "city", "address", "dateOfBirth", "gender", "phone"], req.body);

  if (name.length < 3 || surname.length < 3) {
    throw new Error("Name and surname must contain at least 3 characters");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }

  try {
    const otp = generateOTP();
    await sendOTPByEmail(email, otp);
    res.status(200).json({ otp });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Create a comment and associate it with a user
const createComment = asyncHandler(async (req, res) => {
  const { commentedPic, commentedTo, commentedFromName, commentedFrom, context, rating } = req.body;
  try {
    const userToUpdate = await User.findById(commentedTo);
    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }
    const comment = new Comment({ commentedPic, commentedTo, commentedFromName, commentedFrom, context, rating });
    await comment.save();
    userToUpdate.comments.push(comment);
    await userToUpdate.save();

    res.status(201).json({ message: "Comment added successfully", user: generateUserResponse(userToUpdate) });
  } catch (error) {
    res.status(500).json({ message: "Failed to add comment", error: error.message });
  }
});

// Get all comments
const getComments = asyncHandler(async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get users for the sidebar based on joined posts and reservations
const getUsersForSidebar = asyncHandler(async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // Fetch posts that the logged-in user has joined
    const user = await User.findById(loggedInUserId)
      .populate({
        path: "joinedPosts",
        populate: {
          path: "publisher",
          select: "-password",
        },
      })
      .populate({
        path: "posts",
        populate: {
          path: "reservations",
          select: "-password",
        },
      });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Extract users from joined posts and user's posts reservations
    const usersFromJoinedPosts = user.joinedPosts.map((post) => post.publisher);
    const usersFromUserPosts = user.posts.flatMap((post) => post.reservations);

    // Use a Set to keep track of unique users
    const userSet = new Set();
    const uniqueUsers = [];

    // Combine users and remove duplicates
    [...usersFromJoinedPosts, ...usersFromUserPosts].forEach((user) => {
      if (!userSet.has(user._id.toString())) {
        userSet.add(user._id.toString());
        uniqueUsers.push(user);
      }
    });

    // Filter out the logged-in user
    const filteredUsers = uniqueUsers.filter((user) => user._id.toString() !== loggedInUserId.toString());

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

export {
  authUser,
  registerUser,
  forgotPassword,
  resetPassword,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  verifyUser,
  createComment,
  getComments,
  getUsersForSidebar,
};
