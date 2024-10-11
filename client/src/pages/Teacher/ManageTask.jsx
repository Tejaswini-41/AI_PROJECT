import React, { useState, useEffect } from 'react';
import TaskCard from './TCard';
import Sidebar from '../Dashboard/sidebar';
import './ManageTask.css';

const ManageTask = () => {
    const userProfile = {
        image: null, // Placeholder image
        name: 'Dr. Chetali Shewale',
        email: 'chetali@gmail.com',
    };

    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
    const [newTask, setNewTask] = useState({ title: '', description: '', date: '', score: '' });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = () => {
        const { title, description, date, score } = newTask;

        if (title.trim() === '' || description.trim() === '' || date === '' || score === '') {
            alert('Please fill in all fields.');
            return;
        }

        const newTaskEntry = {
            taskId: Date.now(), // Unique taskId
            title,
            description,
            dueDate: new Date(date).toLocaleDateString(), // Save dueDate separately
            score, // Save score separately
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
                        dueDate={task.dueDate} // Passing dueDate separately
                        score={task.score}     // Passing score separately
                        onDelete={() => handleDeleteTask(task.taskId)} // Pass delete function
                        />
                    ))}
                    {tasks.length === 0 && <p>No tasks assigned. Click "Add Task" to create one.</p>}
                </div>
                <div className="button-container">
                    <button className="add-task-button" onClick={() => setShowAddTaskModal(true)}>
                        Add Task
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