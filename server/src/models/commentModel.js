import mongoose from 'mongoose';

const commentSchema = mongoose.Schema(
  {
    commentedFrom: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    commentedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    context: { type: String, required: true },
    rating: { type: Number, default: 0, required: true }, // Add the stars attribute
    createdAt: { type: Date, default: Date.now }
  }
);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
