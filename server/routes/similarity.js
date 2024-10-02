import express from 'express';
import axios from 'axios';
import File from '../models/File.js';

const router = express.Router();

router.get('/check-similarity/:taskId', async (req, res) => {
    const { taskId } = req.params;

    try {
        const files = await File.find({ taskId });

        if (!files || files.length === 0) {
            return res.status(404).json({ message: 'No files found for the given taskId' });
        }

        const fastApiUrl = `http://localhost:8000/similarity/${taskId}`;
        const similarityResponse = await axios.post(fastApiUrl);

        res.json(similarityResponse.data);
    } catch (error) {
        console.error('Error in similarity check:', error);
        res.status(500).json({ message: 'Error checking similarity' });
    }
});

export default router;
