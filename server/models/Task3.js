import mongoose from 'mongoose';

const task3Schema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignmentFiles: [String], // Array to store file paths
});

const Task3 = mongoose.model('Task3', task3Schema);
export default Task3;
