import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Dashboard.css'; // Import CSS for styling

// Sample data
const initialData = {
    tasks: [
        { id: 'task-1', content: 'Task 1' },
        { id: 'task-2', content: 'Task 2' },
        { id: 'task-3', content: 'Task 3' }
    ],
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'To Do',
            taskIds: ['task-1', 'task-2']
        },
        'column-2': {
            id: 'column-2',
            title: 'In Progress',
            taskIds: ['task-3']
        }
    },
    columnOrder: ['column-1', 'column-2']
};

const Dashboard = () => {
    const [data, setData] = React.useState(initialData);

    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) return;

        const start = data.columns[source.droppableId];
        const finish = data.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, result.draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds
            };

            const newState = {
                ...data,
                columns: {
                    ...data.columns,
                    [newColumn.id]: newColumn
                }
            };

            setData(newState);
            return;
        }

        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, result.draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds
        };

        const newState = {
            ...data,
            columns: {
                ...data.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        };

        setData(newState);
    };

    return (
        <div className="dashboard">
            <div className="dashboard-widgets">
                {/* Project/Task Stats Widgets */}
                <div className="widget">
                    <h2>Project Stats</h2>
                    {/* Add your stats content here */}
                </div>
                <div className="widget">
                    <h2>Task Stats</h2>
                    {/* Add your stats content here */}
                </div>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                {data.columnOrder.map((columnId) => {
                    const column = data.columns[columnId];
                    const tasks = column.taskIds.map(taskId => data.tasks.find(task => task.id === taskId));

                    return (
                        <Droppable key={column.id} droppableId={column.id}>
                            {(provided) => (
                                <div
                                    className="column"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <h2>{column.title}</h2>
                                    {tasks.map((task, index) => (
                                        <Draggable key={task.id} draggableId={task.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    className="task"
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    {task.content}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    );
                })}
            </DragDropContext>
        </div>
    );
};

export default Dashboard;
