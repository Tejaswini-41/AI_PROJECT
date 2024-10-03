import express from 'express';
import { loginUser, registerUser, getUserProfile } from '../controller/auth.js'; // Imported getUserProfile here
import { protect } from '../middleware/authMiddleware.js'; // We can add this once middleware is ready

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);

// Route to get user profile (we can protect this route later)
router.get('/profile', protect, getUserProfile); // Protect this route

export default router;
