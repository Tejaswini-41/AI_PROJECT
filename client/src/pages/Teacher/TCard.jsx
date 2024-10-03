import React, { useState } from 'react';

const TaskCard = ({  taskId, title, description }) => { // Accept taskId as a prop
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            console.error('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('taskId', taskId); // Include taskId in the upload

        try {
            const response = await fetch('http://localhost:3000/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload file');
            }

            const data = await response.json();
            console.log('File uploaded:', data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className="task-card">
            <h3>{title}</h3>
            <p>{description}</p>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload File</button>
        </div>
    );
};

export default TaskCard;
