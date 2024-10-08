import File from '../models/File.js';

export const uploadFile = async (req, res) => {
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);

    const { taskId } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }

    // Create a new file document using the uploaded file data
    try {
        const newFile = new File({
            taskId: taskId,
            filename: req.file.filename,
            uploadDate: new Date(),
            originalname: req.file.originalname,
            path: req.file.path
        });

        // Save file info to the database
        await newFile.save();

        res.status(200).json({ message: 'File uploaded successfully', file: newFile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving file to database' });
    }
};
