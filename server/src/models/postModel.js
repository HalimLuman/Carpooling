import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    publisher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    capacity: { type: Number, required: true },
    price: { type: Number, required: true },
    carModel: {type: String, required: true},
    carColor: {type: String, required: true},
    pets: {type: Boolean, required: true},
    smoking: {type: Boolean, required: true},
    reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: []}],
    pendingRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

export default Post;
