// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';  
import authRoutes from './routes/auth.js';
import uploadRoutes from './routes/upload.js'; // Import your upload routes

dotenv.config();  
connectDB();

const app = express();
app.use(cors());
app.use(express.json());  

// Use the routes
app.use('/auth', authRoutes);  
app.use('/api', uploadRoutes); // Use the upload routes under /api

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

