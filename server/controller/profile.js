// controller/profile.js

import User from '../models/User.js'; // Assuming you're using Mongoose and a User model

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming the user ID is available in the JWT token
        const user = await User.findById(userId).select('-password'); // Exclude the password field
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user); // Return user data
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
