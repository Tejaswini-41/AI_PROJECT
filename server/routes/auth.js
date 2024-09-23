// import express from 'express';
// import { check } from 'express-validator';
// import { registerUser } from '../controllers/auth.js';

// const router = express.Router();

// router.post(
//   '/register',
//   [
//     check('name', 'Name is required').not().isEmpty(),
//     check('email', 'Please include a valid email').isEmail(),
//     check('password', 'Please enter a password with 6 or more characters').isLength({ min: 3 }),
//   ],
//   registerUser
// );

// export default router;

import express from 'express';
import { registerUser, loginUser } from '../controllers/auth.js'; // Adjust path as needed

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser); // Make sure this route is defined

export default router;
