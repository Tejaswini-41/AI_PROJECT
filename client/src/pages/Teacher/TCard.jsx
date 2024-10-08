import React from 'react';
import './TCard.css'; // Assuming you have a separate CSS for TaskCard
import { useNavigate } from 'react-router-dom'; 
const TaskCard = ({ taskId, title, description, dueDate, score, onDelete }) => {
    const navigate = useNavigate(); // Initialize useNavigate

    // Function to handle the "View Similarity" button click
    const handleViewSimilarity = () => {
        navigate('/similarity-report'); // Navigate to the similarity report page
    };
    return (
        <div className="task-card">
            <h3>{title}</h3>
            <p>{description}</p>
            <p className="task-date-score">Due Date: {dueDate}</p>
            <p className="task-date-score">Score: {score}</p>
            <div className="task-actions">
                <button className="view-similarity-button" onClick={handleViewSimilarity}>
                    View Similarity
                </button>
                <button className="delete-button" onClick={onDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskCard;