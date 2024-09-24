// TaskCard.jsx
import React from 'react';
import './TaskCard.css';

const TaskCard = ({ title, description }) => {
    return (
        <div className="task-card">
            <h3 className="card-title">{title}</h3>
            <p className="description">{description}</p>
            <div className="upload-section">
                <input type="file" className="file-upload" />
                <button className="upload-button">Upload</button>
            </div>
        </div>
    );
};

export default TaskCard;
