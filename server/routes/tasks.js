// server/routes/tasks.js

import express from 'express';
import multer from 'multer';
import Task1 from '../models/Task1.js';  // Task 1 Model
import Task2 from '../models/Task2.js';  // Task 2 Model
import Task3 from '../models/Task3.js';  // Task 3 Model
import Task4 from '../models/Task4.js';  // Task 4 Model

const router = express.Router();

// Configure Multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Define the destination for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Set the filename to include a timestamp
    }
});

const upload = multer({ storage: storage });

// Generic upload function for tasks
const handleUpload = async (TaskModel, req, res) => {
    const files = req.files.map(file => file.path); // Save file paths
    try {
        const newTask = new TaskModel({
            studentId: req.body.studentId, // assuming studentId is passed from frontend
            assignmentFiles: files,
        });
        await newTask.save();
        res.status(201).json({ message: 'Files uploaded successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading files', error });
    }
};

// Task 1 Upload Route
router.post('/upload-task1', upload.array('files'), (req, res) => {
    handleUpload(Task1, req, res);
});

// Task 2 Upload Route
router.post('/upload-task2', upload.array('files'), (req, res) => {
    handleUpload(Task2, req, res);
});

// Task 3 Upload Route
router.post('/upload-task3', upload.array('files'), (req, res) => {
    handleUpload(Task3, req, res);
});

// Task 4 Upload Route
router.post('/upload-task4', upload.array('files'), (req, res) => {
    handleUpload(Task4, req, res);
});

export default router;
