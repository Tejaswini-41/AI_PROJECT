// controller/auth.js

import User from '../models/User.js';
import Teacher from '../models/Teacher.js'; // Import the Teacher model
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Utility function to generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token expires in 1 hour
    });
};

export const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body; // Destructure role from the request body

    try {
        if (!role) {
            return res.status(400).json({ message: 'Role is required.' });
        }

        if (role === 'Student') {
            // Check if the student already exists
            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(400).json({ message: 'Student already exists.' });
            }

            // Create a new student
            const user = new User({
                name,
                email,
                password, // Password will be hashed by the User model's pre-save hook
            });

            await user.save();

            res.status(201).json({ message: 'Student registered successfully!' });
        } else if (role === 'Teacher') {
            // Check if the teacher already exists
            const teacherExists = await Teacher.findOne({ email });
            if (teacherExists) {
                return res.status(400).json({ message: 'Teacher already exists.' });
            }

            // Create a new teacher
            const teacher = new Teacher({
                name,
                email,
                password,
            });

            await teacher.save();

            res.status(201).json({ message: 'Teacher registered successfully!' });
        } else {
            return res.status(400).json({ message: 'Invalid role specified.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password, role } = req.body; // Destructure role from the request body

    try {
        if (!role) {
            return res.status(400).json({ message: 'Role is required for login.' });
        }

        let user;

        if (role === 'Student') {
            // Find the student
            user = await User.findOne({ email });
        } else if (role === 'Teacher') {
            // Find the teacher
            user = await Teacher.findOne({ email });
        } else {
            return res.status(400).json({ message: 'Invalid role specified.' });
        }

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // Compare password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // If login is successful, generate a JWT
        const token = generateToken(user._id);

        res.json({
            message: 'Login successful!',
            token,
            user: { id: user._id, name: user.name, email: user.email, role } // Include role in the user object
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
