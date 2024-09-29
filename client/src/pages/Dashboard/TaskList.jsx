import React from 'react';
import TaskCard from './TaskCard'; 

const TaskList = () => {
    const tasks = [
        { id: 'task1', title: 'Task 1', description: 'Upload files for Task 1' },
        { id: 'task2', title: 'Task 2', description: 'Upload files for Task 2' },
        // Add more tasks as needed
    ];

    return (
        <div>
            {tasks.map((task) => (
                <TaskCard
                    key={task.id}
                    title={task.title}
                    description={task.description}
                    taskId={task.id} // Pass the taskId prop
                />
            ))}
        </div>
    );
};

export default TaskList;
