import React from 'react';
import TaskCard from './TaskCard';
import Sidebar from './sidebar';
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
                            title={task.title}
                            description={task.description}
                            taskNumber={task.taskNumber}  // Pass taskNumber here
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AssignedTasks;
