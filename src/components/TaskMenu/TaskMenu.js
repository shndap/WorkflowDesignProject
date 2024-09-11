import React, {useState} from 'react';
import './TaskMenu.css';
import {useNavigate} from "react-router-dom"; // Add your styles for the page

const TaskMenu = () => {
    const navigate = useNavigate();

    // Dummy data for the task
    const [task, setTask] = useState({
        taskName: "Task 1",
        assignee: "John Doe",
        assigner: "Jane Doe",
        dueDate: "2024-09-30",
        description: "This is a detailed description of the task.",
        priority: "High",
        status: "In Progress"
    });

    // Handle form changes
    const handleChange = (e) => {
        const {name, value} = e.target;
        setTask(prevTask => ({
            ...prevTask,
            [name]: value
        }));
    };

    // Handle save
    const handleSave = () => {
        alert('Task details saved');
        // Implement save functionality here
    };

    const handleClose = () => {
        navigate('/dashboard');
    }

    return (
        <div className='main'>
        <div className="task-details-page">
            <h1>Task Details</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="taskName">Task Name</label>
                    <input
                        type="text"
                        id="taskName"
                        name="taskName"
                        value={task.taskName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="assignee">Assignee</label>
                    <input
                        type="text"
                        id="assignee"
                        name="assignee"
                        value={task.assignee}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="assigner">Assigner</label>
                    <input
                        type="text"
                        id="assigner"
                        name="assigner"
                        value={task.assigner}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dueDate">Due Date</label>
                    <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        value={task.dueDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="priority">Priority</label>
                    <select
                        id="priority"
                        name="priority"
                        value={task.priority}
                        onChange={handleChange}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        name="status"
                        value={task.status}
                        onChange={handleChange}
                    >
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div className='buttons'>
                    <button type="button" onClick={handleSave} className="save-button">Save</button>
                    <button type="button" onClick={handleClose} className="close-button">Close</button>
                </div>
            </form>
        </div>
        </div>
    );
};

export default TaskMenu;
