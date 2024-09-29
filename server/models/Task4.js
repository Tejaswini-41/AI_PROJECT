import mongoose from 'mongoose';

const task4Schema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignmentFiles: [String], // Array to store file paths
});

const Task4 = mongoose.model('Task4', task4Schema);
export default Task4;
