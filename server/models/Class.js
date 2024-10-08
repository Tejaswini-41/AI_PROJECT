// models/Class.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
    name: { type: String, required: true },
    section: { type: String },
    teacher: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    assignments: [{ type: Schema.Types.ObjectId, ref: 'Assignment' }]
}, { timestamps: true });

module.exports = mongoose.model('Class', ClassSchema);
