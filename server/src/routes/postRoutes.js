import express from 'express';
import {
    createPost,
    getPosts,
    deletePost,
    reservePost,
    handleRequest, // Import the new handleRequest function
    getPendingRequests,
    leavePost,
} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/posts', getPosts);
router.post('/create-post', protect, createPost);
router.delete('/delete-post/:id', protect, deletePost);
router.post('/leave-post', protect, leavePost);

router.post('/reserve', protect, reservePost);
router.post('/handle-request', protect, handleRequest);
router.get('/pending-requests', protect, getPendingRequests);

export default router;
