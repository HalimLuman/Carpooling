import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    profilePic: {type: String, default: ""},
    name: { type: String, required: true },
    surname: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
    tokens: { type: Number, default: 1 }, // Default value for tokens
    deletedPosts: { type: Number, default: 0 }, // Default value for deleted posts count
    createdPosts: { type: Number, default: 0 }, // Default value for deleted posts count
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    joinedPosts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    requestedPosts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next(); // Make sure to call next() after hashing the password
});

userSchema.methods.matchPasswords = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
