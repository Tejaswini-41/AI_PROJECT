import React, { useState } from 'react';
import TaskCard from './TaskCard';
import Sidebar from './Sidebar'; // Ensure the casing matches your file name
import './AssignedTasks.css';

const AssignedTasks = () => {
    const userProfile = {
        name: "John Doe",
        class: "12",
        course: "Science",
        image: null,
    };

    const tasks = [
        { title: 'Math Homework', description: 'Complete exercises from chapter 5.', taskNumber: 1 },
        { title: 'Science Project', description: 'Submit your science project.', taskNumber: 2 },
        { title: 'History Essay', description: 'Write an essay on WWII.', taskNumber: 3 },
        { title: 'Computer Assignment', description: 'Create a web page.', taskNumber: 4 }
    ];

    const [taskFiles, setTaskFiles] = useState({
        1: [], // For Math Homework
        2: [], // For Science Project
        3: [], // For History Essay
        4: []  // For Computer Assignment
    });

    const handleFileUpload = (taskNumber, files) => {
        setTaskFiles((prev) => ({
            ...prev,
            [taskNumber]: [...prev[taskNumber], ...files]
        }));
    };

    const handleFileRemove = (taskNumber, fileName) => {
        setTaskFiles((prev) => ({
            ...prev,
            [taskNumber]: prev[taskNumber].filter(file => file.name !== fileName)
        }));
    };

    return (
        <div className="assigned-tasks">
            <Sidebar userProfile={userProfile} />
            <div className="main-content">
                <nav className="navbar">
                    <h2>Assigned Tasks</h2>
                </nav>
                <div className="tasks-container">
                    {tasks.map((task) => (
                        <TaskCard
                            key={task.taskNumber}
                            title={task.title}
                            description={task.description}
                            taskNumber={task.taskNumber}
                            onFileUpload={handleFileUpload}
                            onFileRemove={handleFileRemove}
                            uploadedFiles={taskFiles[task.taskNumber]}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AssignedTasks;
