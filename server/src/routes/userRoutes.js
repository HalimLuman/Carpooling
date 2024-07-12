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
import { protect } from '../middleware/authMiddleware.js';
import { getPosts } from '../controllers/postController.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/verify-user', verifyUser);
router.post('/auth', authUser);
router.post('/forgot-password', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.delete('/delete/:id', deleteUser);

router.post('/create-comment', createComment);
router.get('/comments', getComments);
router.get('/posts', getPosts);
export default router;
