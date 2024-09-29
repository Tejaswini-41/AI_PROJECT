import express from 'express';
import { uploadFile } from '../controller/uploadController.js';
import { upload } from '../config/multerStorage.js';

const router = express.Router();

router.post('/upload', upload.single('file'), uploadFile);

export default router;
