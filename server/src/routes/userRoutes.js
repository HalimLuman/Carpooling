import express from 'express';
import { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, deleteUser, verifyUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.delete('/delete/:id', deleteUser);
router.post('/verify-user', verifyUser);


export default router;