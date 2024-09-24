// AssignedTasks.jsx
import React from 'react';
import TaskCard from './TaskCard';
import Sidebar from './sidebar';
import './AssignedTasks.css';

const AssignedTasks = () => {
    const userProfile = {
        name: "John Doe",
        class: "12",
        course: "Science",
        image: null, // Set to null if no image is provided
    };
    const tasks = [
        {
            title: 'Math Homework',
            description: 'Complete exercises from chapter 5. Due: 30th September',
        },
        {
            title: 'Science Project',
            description: 'Submit your science project by 5th October. Guidelines are attached.',
        },
        // Add more tasks as needed
    ];

    return (
        <div className="assigned-tasks">
           
            <Sidebar userProfile={userProfile} /> 
          
            <div className="main-content">
                <nav className="navbar">
                    <h2>Assigned Task</h2>
                </nav>
                <div className="tasks-container">
                    {tasks.map((task, index) => (
                        <TaskCard 
                            key={index} 
                            title={task.title} 
                            description={task.description} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AssignedTasks;

