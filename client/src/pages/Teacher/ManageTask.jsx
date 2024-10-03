import React, { useState } from 'react';
import TaskCard from './TCard';
import Sidebar from './TSidebar';
import './ManageTask.css';

const ManageTask = () => {
    const userProfile = {
        image: null, // Placeholder image
        name: 'Dr. Chetali Shewale',
        email: 'chetali@gmail.com',
    };

    const initialTasks = [
        {
            taskId: 1,
            title: 'AI Task 1:',
            description: 'Write an assignment on learning strategies mentioned in AI. Due: Sep 30',
        },
        {
            taskId: 2,
            title: 'AI Task 2:',
            description: 'Write one example of partial order planning and non-linear planning. Due: Sep 25',
        },
        // Add more tasks as needed
    ];

    const [tasks, setTasks] = useState(initialTasks);
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
    const [newTask, setNewTask] = useState({ title: '', description: '', date: '', score: '' });

    const handleAddTask = () => {
        if (newTask.title.trim() === '' || newTask.description.trim() === '' || newTask.date === '' || newTask.score === '') {
            alert('Please fill in all fields.');
            return;
        }

        const formattedDescription = `${newTask.description} Due: ${newTask.date}, Score: ${newTask.score}`;

        const newTaskEntry = {
            taskId: tasks.length + 1,
            title: newTask.title,
            description: formattedDescription,
        };

        setTasks([...tasks, newTaskEntry]);
        setShowAddTaskModal(false);
        setNewTask({ title: '', description: '', date: '', score: '' });
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.taskId !== taskId));
    };

    return (
        <div className="manage-task">
            <Sidebar userProfile={userProfile} />
            <div className="main-content">
                <nav className="navbar">
                    <h2>Assigned Tasks</h2>
                </nav>
                <div className="tasks-container">
                    {tasks.map((task) => (
                        <TaskCard
                            key={task.taskId}
                            taskId={task.taskId}
                            title={task.title}
                            description={task.description}
                            onDelete={() => handleDeleteTask(task.taskId)} // Pass delete function
                        />
                    ))}
                </div>
                <div className="button-container">
                <button className="add-task-button" onClick={() => setShowAddTaskModal(true)}>
                    Add Task
                </button>
                <button className="delete-task-button" onClick={() => handleDeleteTask(task.taskId)}>
                    Delete Task
                </button>
                <a href="/tdashboard" className="back-button">
                    Back to Dashboard
                </a>               
                </div>

            </div>
            {showAddTaskModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Add New Task</h3>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleAddTask();
                            }}
                        >
                            <label>
                                Title:
                                <input
                                    type="text"
                                    value={newTask.title}
                                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                    required
                                />
                            </label>
                            <label>
                                Description:
                                <textarea
                                    value={newTask.description}
                                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                    required
                                />
                            </label>
                            <label>
                                Due Date:
                                <input
                                    type="date"
                                    value={newTask.date}
                                    onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
                                    required
                                />
                            </label>
                            <label>
                                Score:
                                <input
                                    type="number"
                                    value={newTask.score}
                                    onChange={(e) => setNewTask({ ...newTask, score: e.target.value })}
                                    required
                                />
                            </label>
                            <div className="modal-buttons">
                                <button type="submit" className="submit-button">
                                    Add
                                </button>
                                <button type="button" className="cancel-button" onClick={() => setShowAddTaskModal(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageTask;
