import React, {useState} from 'react';
import './Dashboard.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faPen} from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
    const initColumns = [
        {
            id: 'column-1',
            name: 'Backlog',
            tasks: [
                { id: 'task-1', name: 'Design UI Mockups' },
                { id: 'task-2', name: 'Setup Database Schema' }
            ]
        },
        {
            id: 'column-2',
            name: 'In Progress',
            tasks: [
                { id: 'task-3', name: 'Implement Authentication' }
            ]
        }
    ];


    const [columns, setColumns] = useState(initColumns);
    const [taskOverlayVisible, setTaskOverlayVisible] = useState(false);
    const [columnOverlayVisible, setColumnOverlayVisible] = useState(false);
    const [newTaskName, setNewTaskName] = useState('');
    const [newColumnName, setNewColumnName] = useState('');
    const [editingItem, setEditingItem] = useState(null);
    const [editingType, setEditingType] = useState('');
    const [addingTaskToColumn, setAddingTaskToColumn] = useState(null);

    const navigate = useNavigate();

    const addColumn = () => {
        if (newColumnName) {
            setColumns([...columns, {id: Date.now().toString(), name: newColumnName, tasks: []}]);
            setNewColumnName('');
            setColumnOverlayVisible(false);
        }
    };

    const addTask = () => {
        if (addingTaskToColumn != null && newTaskName) {
            if (addingTaskToColumn >= 0 && addingTaskToColumn < columns.length) {
                const updatedColumns = [...columns];
                updatedColumns[addingTaskToColumn].tasks.push({id: Date.now().toString(), content: newTaskName});
                setColumns(updatedColumns);
                setNewTaskName('');
                setAddingTaskToColumn(null);
                setTaskOverlayVisible(false);
            } else {
                console.error('Invalid column index:', addingTaskToColumn);
            }
        } else {
            console.error('Cannot add task: addingTaskToColumn is null or newTaskName is empty');
        }
    };

    const handleEdit = (columnIndex, taskIndex) => {
        setEditingItem({columnIndex, taskIndex});
        setEditingType(taskIndex !== undefined ? 'task' : 'column');
    };

    const saveEdit = () => {
        if (editingItem) {
            const {columnIndex, taskIndex} = editingItem;
            const updatedColumns = [...columns];

            if (editingType === 'task') {
                updatedColumns[columnIndex].tasks[taskIndex].content = newTaskName;
            } else if (editingType === 'column') {
                updatedColumns[columnIndex].name = newColumnName;
            }

            setColumns(updatedColumns);
            setEditingItem(null);
            setEditingType('');
        }
    };

    const handleTaskClick = (task) => {
        // Navigate to task details page with the task identifier (or other data)
        navigate('/task-details');
    };

    const onDragEnd = (result) => {
        const {source, destination} = result;
        console.log(source, destination);
        if (!destination) return;

        const sourceColumnIndex = columns.findIndex(column => column.id === source.droppableId);
        const destColumnIndex = columns.findIndex(column => column.id === destination.droppableId);

        if (sourceColumnIndex === -1 || destColumnIndex === -1) return; // Ensure valid indexes

        const sourceColumn = columns[sourceColumnIndex];
        const destColumn = columns[destColumnIndex];
        const [movedTask] = sourceColumn.tasks.splice(source.index, 1);

        if (!destColumn.tasks) destColumn.tasks = [];
        destColumn.tasks.splice(destination.index, 0, movedTask);

        const updatedColumns = [...columns];
        updatedColumns[sourceColumnIndex] = {...sourceColumn, tasks: sourceColumn.tasks};
        updatedColumns[destColumnIndex] = {...destColumn, tasks: destColumn.tasks};

        setColumns(updatedColumns);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="header-dashboard">Dashboard</div>
            <Droppable droppableId="all-columns" direction="horizontal">
                {(provided) => (
                    <div className="dashboard-body" ref={provided.innerRef} {...provided.droppableProps}>
                        {columns.map((column, colIndex) => (
                            <Droppable key={column.id} droppableId={column.id} direction="vertical">
                                {(provided) => (
                                    <div
                                        className="column"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <div className="column-header">
                                            <span className="column-title">{column.name}</span>
                                            <button className="edit-button" onClick={() => handleEdit(colIndex)}>
                                                <FontAwesomeIcon icon={faPen} color="black" size="xs"/>
                                            </button>
                                        </div>
                                        <div className="tasks">
                                            {column.tasks.map((task, taskIndex) => (
                                                <div>
                                                    <Draggable key={task.id} draggableId={task.id} index={taskIndex}>
                                                        {(provided) => (
                                                            <div
                                                                className="fancy"
                                                                ref={provided.innerRef} // Correctly pass ref
                                                                {...provided.draggableProps} // Correctly pass draggable props
                                                                {...provided.dragHandleProps} // Correctly pass drag handle props
                                                                // onClick={() => handleEdit(colIndex, taskIndex)}
                                                                onClick={() => handleTaskClick(taskIndex)}
                                                            >
                                                                {task.name}
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                </div>
                                            ))}
                                            {provided.placeholder}

                                            <button
                                                className="add-task-button"
                                                onClick={() => {
                                                    setAddingTaskToColumn(colIndex);
                                                    setTaskOverlayVisible(true);
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faPlus}/>
                                            </button>
                                            {provided.placeholder}
                                        </div>
                                    </div>
                                )}
                            </Droppable>
                        ))}
                        <button className="column-add" onClick={() => setColumnOverlayVisible(true)}>
                            <FontAwesomeIcon icon={faPlus}/>
                        </button>
                    </div>
                )}
            </Droppable>

            {columnOverlayVisible && (
                <div className="login-box">
                    <div className="user-box">
                        <h2>Add Column</h2>
                        <input
                            type="text"
                            value={newColumnName}
                            onChange={(e) => setNewColumnName(e.target.value)}
                            placeholder="Column Name"
                        />
                        <div>
                            <button onClick={addColumn}>Add Column</button>
                            <button onClick={() => setColumnOverlayVisible(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            {taskOverlayVisible && (
                <div className="login-box">
                    <div className="user-box">
                        <h2>Add Task</h2>
                        <input
                            type="text"
                            value={newTaskName}
                            onChange={(e) => setNewTaskName(e.target.value)}
                            placeholder="Task Name"
                        />
                        <div>
                            <button onClick={addTask}>Add Task</button>
                            <button onClick={() => setTaskOverlayVisible(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            {editingItem && (
                <div className="login-box">
                    <div className="user-box">
                        <h2>Edit {editingType === 'task' ? 'Task' : 'Column'}</h2>
                        <input
                            type="text"
                            value={editingType === 'task' ? newTaskName : newColumnName}
                            onChange={(e) => (editingType === 'task' ? setNewTaskName(e.target.value) : setNewColumnName(e.target.value))}
                            placeholder={editingType === 'task' ? 'Task Name' : 'Column Name'}
                        />
                        <div>
                            <button onClick={saveEdit}>Save</button>
                            <button onClick={() => setEditingItem(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </DragDropContext>
    );
};

export default Dashboard;
