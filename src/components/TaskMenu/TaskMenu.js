import React, {useState} from 'react';
import './TaskMenu.css';
import {useNavigate} from "react-router-dom";
import Label from "../Label/Label";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

const TaskMenu = () => {
    const navigate = useNavigate();

    const [task, setTask] = useState({
        taskName: "Task 1",
        assignee: "John Doe",
        assigner: "Jane Doe",
        dueDate: "2024-09-30",
        description: "This is a detailed description of the task.",
        priority: "High",
        status: "In Progress",
        labels: ['UI', 'Frontend']
    });

    const [labelColors, setLabelColors] = useState([
        {label: 'UI', color: 'green'},
        {label: 'Backend', color: 'blue'},
        {label: 'Frontend', color: 'purple'},
        {label: 'Bug', color: 'red'},
    ]);

    const [newLabel, setNewLabel] = useState("");
    const [newColor, setNewColor] = useState("#000000");

    // State to control label input visibility
    const [showLabelInput, setShowLabelInput] = useState(false);

    const getColorByLabel = (label) => {
        const item = labelColors.find((item) => item.label === label);
        return item ? item.color : null; // Return color or null if label not found
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setTask(prevTask => ({
            ...prevTask,
            [name]: value
        }));
    };

    const handleSave = () => {
        alert('Task details saved');
    };

    const handleClose = () => {
        navigate('/dashboard');
    }

    const removeLabel = (label) => {
        setTask(prevTask => ({
            ...prevTask,
            labels: prevTask.labels.filter(labelt => labelt !== label)
        }));
    }

    const handleAddLabel = () => {
        if (!newLabel) return; // If the label name is empty, do nothing
        setTask(prevTask => ({
            ...prevTask,
            labels: [...prevTask.labels, newLabel]
        }));

        setLabelColors(prevColors => [
            ...prevColors,
            {label: newLabel, color: newColor}
        ]);

        // Reset input fields after adding
        setNewLabel("");
        setNewColor("#000000");
        setShowLabelInput(false); // Hide the input fields after adding
    }

    return (
        <div className='main'>
            <div className="task-details-page">
                <h1>Task Details</h1>
                <form>
                    <div className="label">
                        {task.labels.map((label, index) => (
                            <Label
                                key={index}
                                text={label}
                                color={getColorByLabel(label)}
                                show_remove={true}
                                onClick={() => removeLabel(label)}
                            />
                        ))}

                        {/* Toggle input fields visibility when faPlus is clicked */}
                        <FontAwesomeIcon
                            className='add-label-button'
                            icon={faPlus}
                            onClick={() => setShowLabelInput(!showLabelInput)} // Toggle visibility
                        />
                    </div>

                    {/* Conditionally render the input fields based on showLabelInput */}
                    {showLabelInput && (
                        <div className="login-box-t">
                            <div className="user-box-t">
                                <h2>Add Label</h2>
                                <input
                                    type="text"
                                    value={newLabel}
                                    onChange={(e) => setNewLabel(e.target.value)}
                                    placeholder="Enter label name"
                                />
                                <div className="div-color">
                                    <span style={{color: 'white', opacity: '40%'}}>Color</span>
                                    <input
                                        className="colorpicker"
                                        type="color"
                                        value={newColor}
                                        onChange={(e) => setNewColor(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <button onClick={handleAddLabel}>Add Label</button>
                                    <button onClick={() => setShowLabelInput(!showLabelInput)}>Close</button>
                                </div>
                            </div>
                        </div>
                    )}

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
