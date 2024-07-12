import express from 'express'
import { sendMessage, getMessages } from '../controllers/messageController.js';
import { protect } from '../middleware/authMiddleware.js';
import { getUsersForSidebar } from '../controllers/userController.js';
const router = express.Router();

router.get("/:id",protect, getMessages);
router.post("/send/:id",protect, sendMessage);
router.get("/",protect, getUsersForSidebar);

export default router;