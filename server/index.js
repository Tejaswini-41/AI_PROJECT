import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';  // Import the DB connection
import authRoutes from './routes/auth.js';  // Import the auth routes
import taskRoutes from './routes/tasks.js';  // Import the new task routes

dotenv.config();  // Load environment variables

// Connect to MongoDB Atlas
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // Parse JSON requests

// Routes
app.use('/auth', authRoutes);  // For registration and login routes
app.use('/tasks', taskRoutes);  // For handling task-related requests

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));  // Serve files from the 'uploads' folder

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
