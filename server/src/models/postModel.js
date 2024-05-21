import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    publisher: {type: mongoose.Types.ObjectId, ref: "User", required: true},
    from: { type: String, required: true },
    to: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    capacity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;