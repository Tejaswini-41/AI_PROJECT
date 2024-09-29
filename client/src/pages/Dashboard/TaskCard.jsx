import React, { useState } from 'react';
import './TaskCard.css';

const TaskCard = ({ title, description, taskNumber, onFileUpload, onFileRemove, uploadedFiles }) => {
    const [files, setFiles] = useState([]);
    const [studentId] = useState("12345"); // Replace with actual student ID logic
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleFileUpload = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles((prevFiles) => {
            const updatedFiles = [...prevFiles, ...selectedFiles];
            onFileUpload(taskNumber, selectedFiles); // Notify the parent component
            return updatedFiles;
        });
    };

    const handleFileRemove = (fileName) => {
        setFiles((prevFiles) => prevFiles.filter(file => file.name !== fileName));
        onFileRemove(taskNumber, fileName); // Notify the parent component
    };

    const triggerFileUpload = () => {
        document.getElementById(`file-upload-input-${taskNumber}`).click(); // Triggers the hidden file input
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('studentId', studentId);
        files.forEach((file) => {
            formData.append('assignmentFiles', file);
        });

        try {
            const response = await fetch(`http://localhost:3000/api/tasks/upload-task${taskNumber}`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setSuccessMessage('Files uploaded successfully!');
                setErrorMessage('');
                setFiles([]);
            } else {
                setErrorMessage('Failed to upload files.');
                setSuccessMessage('');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred during the upload.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="task-card">
            <h3 className="card-title">{title}</h3>
            <p className="description">{description}</p>
            <div className="upload-section">
                <button className="upload-button" onClick={triggerFileUpload}>
                    Upload
                </button>
                <input
                    id={`file-upload-input-${taskNumber}`}
                    type="file"
                    className="file-upload"
                    multiple
                    onChange={handleFileUpload}
                    style={{ display: 'none' }} // Hides the file input
                />
                <button className="submit-button" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="uploaded-files">
                {uploadedFiles.length > 0 && (
                    <ul>
                        {uploadedFiles.map((file, index) => (
                            <li key={index}>
                                {file.name}
                                <button
                                    className="remove-button"
                                    onClick={() => handleFileRemove(file.name)}
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default TaskCard;
