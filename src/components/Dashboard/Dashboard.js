import React, {useState} from 'react';
import './Dashboard.css'; // Import the CSS file for styling
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faPen} from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
    const [columns, setColumns] = useState([]);
    const [taskOverlayVisible, setTaskOverlayVisible] = useState(false);
    const [columnOverlayVisible, setColumnOverlayVisible] = useState(false);
    const [newTaskName, setNewTaskName] = useState('');
    const [newColumnName, setNewColumnName] = useState('');
    const [editingItem, setEditingItem] = useState(null);
    const [editingType, setEditingType] = useState('');
    const [addingTaskToColumn, setAddingTaskToColumn] = useState(null);

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

    const onDragEnd = (result) => {
        console.log(result);
        const {source, destination} = result;
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
                                                                className="task"
                                                                ref={provided.innerRef} // Correctly pass ref
                                                                {...provided.draggableProps} // Correctly pass draggable props
                                                                {...provided.dragHandleProps} // Correctly pass drag handle props
                                                            >
                                                                {task.content}
                                                                <button className="edit-button"
                                                                        onClick={() => handleEdit(colIndex, taskIndex)}>
                                                                    <FontAwesomeIcon icon={faPen} color="black"
                                                                                     size="2xs"/>
                                                                </button>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                    {provided.placeholder}
                                                </div>
                                            ))}
                                            <button
                                                className="add-task-button"
                                                onClick={() => {
                                                    setAddingTaskToColumn(colIndex);
                                                    setTaskOverlayVisible(true);
                                                }}
                                            >
                                                {provided.placeholder}
                                                <FontAwesomeIcon icon={faPlus}/>
                                            </button>
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
                <div className="overlay">
                    <div className="overlay-content">
                        <h2>Add Column</h2>
                        <input
                            type="text"
                            value={newColumnName}
                            onChange={(e) => setNewColumnName(e.target.value)}
                            placeholder="Column Name"
                        />
                        <button onClick={addColumn}>Add Column</button>
                        <button onClick={() => setColumnOverlayVisible(false)}>Close</button>
                    </div>
                </div>
            )}

            {taskOverlayVisible && (
                <div className="overlay">
                    <div className="overlay-content">
                        <h2>Add Task</h2>
                        <input
                            type="text"
                            value={newTaskName}
                            onChange={(e) => setNewTaskName(e.target.value)}
                            placeholder="Task Name"
                        />
                        <button onClick={addTask}>Add Task</button>
                        <button onClick={() => setTaskOverlayVisible(false)}>Close</button>
                    </div>
                </div>
            )}

            {editingItem && (
                <div className="overlay">
                    <div className="overlay-content">
                        <h2>Edit {editingType === 'task' ? 'Task' : 'Column'}</h2>
                        <input
                            type="text"
                            value={editingType === 'task' ? newTaskName : newColumnName}
                            onChange={(e) => (editingType === 'task' ? setNewTaskName(e.target.value) : setNewColumnName(e.target.value))}
                            placeholder={editingType === 'task' ? 'Task Name' : 'Column Name'}
                        />
                        <button onClick={saveEdit}>Save</button>
                        <button onClick={() => setEditingItem(null)}>Cancel</button>
                    </div>
                </div>
            )}
        </DragDropContext>
    );
};

export default Dashboard;
