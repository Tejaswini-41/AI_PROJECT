import mongoose from 'mongoose';

const task1Schema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignmentFiles: [String], // Array to store file paths
});

const Task1 = mongoose.model('Task1', task1Schema);
export default Task1;
