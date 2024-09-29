import React, { useState } from 'react'; 
import './TaskCard.css';

const TaskCard = ({ title, description }) => {
    const [files, setFiles] = useState([]);
    const [studentId] = useState("12345"); // Replace with actual student ID logic
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleFileUpload = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    };

    const handleFileRemove = (fileName) => {
        setFiles((prevFiles) => prevFiles.filter(file => file.name !== fileName));
    };

    const triggerFileUpload = () => {
        document.getElementById('file-upload-input').click(); // Triggers the hidden file input
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('studentId', studentId);
        files.forEach((file) => {
            formData.append('assignmentFiles', file);
        });

        try {
            const response = await fetch('http://localhost:5000/api/tasks/upload-task1', { // Adjust endpoint if necessary
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setSuccessMessage('Files uploaded successfully!'); // Set success message
                setErrorMessage(''); // Clear any previous error messages
                setFiles([]); // Clear the files after successful upload
            } else {
                setErrorMessage('Failed to upload files.'); // Set error message
                setSuccessMessage(''); // Clear any previous success messages
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred during the upload.'); // Set error message
            setSuccessMessage(''); // Clear any previous success messages
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
                    id="file-upload-input"
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
            {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
            <div className="uploaded-files">
                {files.length > 0 && (
                    <ul>
                        {files.map((file, index) => (
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
