// models/similarityResult.js
import mongoose from 'mongoose';

const similarityResultSchema = new mongoose.Schema({
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },  // Reference to task
    student1: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to first student
    student2: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to second student
    similarity: { type: Number, required: true },  // Similarity score
});

const SimilarityResult = mongoose.model('SimilarityResult', similarityResultSchema);

export default SimilarityResult;
