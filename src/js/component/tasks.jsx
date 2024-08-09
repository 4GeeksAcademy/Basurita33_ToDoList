import React, { useState } from 'react';

const Tasks = () => {
    const [task, setTask] = useState('');
    const [tasksList, setTasksList] = useState([]);

    const AddTask = () => {
        if (task.trim()) {
            setTasksList([task.trim(), ...tasksList]);
            setTask(''); 
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            AddTask();
        }
    };

    const deleteTask = (index) => {
        setTasksList(tasksList.filter((_,i) => i !== index));       
    };

    return (
        <div>
            <input className='inputTask'
                type="text"
                value={task}
                onChange={(event) => setTask(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter a new task"
            />
            <ul className='ulTasks'>
                {tasksList.map((ts, index) => (
                    <li className='liTask' key={index}>
                        {ts}
                        <button className="delete-button" onClick={() => deleteTask(index)}>×</button>
                    </li>
                ))}
            </ul>
            <div className="tasks-count">{tasksList.length} task{tasksList.length > 1 ? 's' : ''} left</div>
        </div>
    );
};

export default Tasks;