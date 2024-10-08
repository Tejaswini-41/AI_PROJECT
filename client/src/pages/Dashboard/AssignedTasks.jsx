import React from 'react';
import TaskCard from './TaskCard';
import Sidebar from './sidebar';
import './AssignedTasks.css';

const AssignedTasks = () => {

    const tasks = [
        {
            taskId: 1,
            title: 'AI Task 1:',
            description: 'Write an assignment on learning strategies mentioned in AI. Due: Oct 20, Score : 50',
        },
        {
            taskId: 2,
            title: 'AI Task 2:',
            description: 'Write one example of partial order planning and non-linear planning. Due: Oct 15, Score : 30',
        },
        // Add more tasks as needed
    ];

 

    return (
        <div className="assigned-tasks">
            <Sidebar />
            <div className="main-content">
                <nav className="navbar">
                    <h2>Assigned Tasks</h2>
                </nav>
                <div className="tasks-container">
                    {tasks.map((task, index) => (
                        <TaskCard 
                            key={index} 
                            taskId={task.taskId}
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