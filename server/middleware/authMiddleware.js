// middleware/authMiddleware.js

import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
    let token = req.headers.authorization?.split(' ')[1]; // Extract token from headers

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Set the user in request object
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
};
