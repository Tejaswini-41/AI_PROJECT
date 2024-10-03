// models/Submission.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubmissionSchema = new Schema({
    assignment: { type: Schema.Types.ObjectId, ref: 'Assignment', required: true },
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String }, // Could be text or URL to file
    submittedAt: { type: Date, default: Date.now },
    grade: { type: Number },
    feedback: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Submission', SubmissionSchema);
