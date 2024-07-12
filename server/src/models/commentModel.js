import mongoose from 'mongoose';

const commentSchema = mongoose.Schema(
  {
    commentedPic: {type: String, default: ""},
    commentedFrom: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    commentedFromName: {type: String, required: true},
    commentedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    context: { type: String, required: true },
    rating: { type: Number, default: 0, required: true }, // Add the stars attribute
  },{timestamps: true},
);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
