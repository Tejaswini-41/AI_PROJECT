// models/classroom.js
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to teacher
    assignments: [
        {
            student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to student
            file: { type: String },  // URL or file path
            submissionDate: { type: Date, default: Date.now },
        },
    ],
});

const classroomSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to teacher
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  // List of students
    tasks: [taskSchema],  // Embedded tasks
});

const Classroom = mongoose.model('Classroom', classroomSchema);

export default Classroom;
