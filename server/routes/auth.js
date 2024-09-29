// routes/auth.js

import express from 'express';
import { loginUser, registerUser } from '../controller/auth.js';
import { getUserProfile } from '../controller/profile.js';
import { protect } from '../middleware/authMiddleware.js'; // Import middleware

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/profile', protect, getUserProfile); // Protect this route

export default router;
