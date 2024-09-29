import mongoose from 'mongoose';

const task2Schema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignmentFiles: [String], // Array to store file paths
});

const Task2 = mongoose.model('Task2', task2Schema);
export default Task2;
