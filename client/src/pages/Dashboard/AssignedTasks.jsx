import React, { useState } from 'react';
import TaskCard from './TaskCard';
import Sidebar from './sidebar';
import './AssignedTasks.css';

const AssignedTasks = () => {
    const userProfile = {
        image: null, // Placeholder image
        name: 'Tejaswini Durge',
        email: 'tejaswini@gmail.com',
    };
    
    const tasks = [
        {
            taskId: 1,
            title: 'AI Task 1:',
            description: 'Write an assignment on learning strategies mentioned in AI.  Due: Sep 30, 12:29 PM',
        },
        {
            taskId:2,
            title: 'AI Task :',
            description: 'Write one example of partial order planning and non linear planning.  Due: Sep 25, 12:29 PM',
        },
        // Add more tasks as needed
    ];

    return (
        <div className="assigned-tasks">
            <Sidebar userProfile={userProfile} />
            <div className="main-content">
                <nav className="navbar">
                    <h2>Assigned Tasks</h2>
                </nav>
                <div className="tasks-container">
                    {tasks.map((task, index) => (
                        <TaskCard 
                            key={index} 
                            taskId={ task.taskId}
                            title={task.title} 
                            description={task.description} 
                        />
                    ))}
                </div>
                <div className="button-container">
                    <a href="/dashboard" className="back-button">
                        Back to Dashboard
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AssignedTasks;


