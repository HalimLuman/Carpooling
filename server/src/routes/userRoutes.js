import express from 'express';
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    deleteUser,
    verifyUser,
    createComment,
    resetPassword,
    forgotPassword,
    getComments
} from '../controllers/userController.js';
import {
    createPost,
    getPosts,
    deletePost,
    reservePost,
    handleRequest, // Import the new handleRequest function
    getPendingRequests,
} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.delete('/delete/:id', deleteUser);
router.post('/verify-user', verifyUser);
router.post('/create-comment', createComment);
router.post('/forgot-password', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.get('/comments', getComments);

router.post('/create-post', createPost);
router.get('/posts', getPosts);
router.delete('/delete-post/:id', deletePost);
router.post('/reserve', reservePost);
router.post('/handle-request', protect, handleRequest); // Add the new route for handling reservation requests
router.get('/pending-requests', protect, getPendingRequests);

export default router;
