import React, {useState} from "react";
import Board, {moveCard} from "@asseinfo/react-kanban";
import "@asseinfo/react-kanban/dist/styles.css";
import "./Dashboard.css";
import Label from "../Label/Label";
import {useNavigate} from "react-router-dom";

const board = {
    columns: [
        {
            id: 1,
            title: "Backlog",
            backgroundColor: "#f0f0f0",
            cards: [
                {
                    id: 1,
                    title: "Fix login page bug",
                    labels: ["bug", "urgent"]
                },
                {
                    id: 2,
                    title: "Implement user profile page",
                    labels: ["feature", "low-priority"]
                },
                {
                    id: 3,
                    title: "Optimize database queries",
                    labels: ["enhancement"]
                }
            ]
        },
        {
            id: 2,
            title: "Doing",
            backgroundColor: "#e8f5e9",
            cards: [
                {
                    id: 4,
                    title: "Redesign homepage layout",
                    labels: ["in-progress"]
                }
            ]
        },
        {
            id: 3,
            title: "Q&A",
            backgroundColor: "#fff3e0",
            cards: [
                {
                    id: 5,
                    title: "Review new API endpoints",
                    labels: ["review"]
                },
                {
                    id: 6,
                    title: "Clarify payment gateway integration",
                    labels: ["question", "high-priority"]
                }
            ]
        },
        {
            id: 4,
            title: "Production",
            backgroundColor: "#e3f2fd",
            cards: [
                {
                    id: 7,
                    title: "Deploy new features",
                    labels: ["completed"]
                },
                {
                    id: 8,
                    title: "Fix minor bugs in production",
                    labels: ["urgent", "completed"]
                }
            ]
        }
    ]
};

// Array of color configurations
const initLabelColors = [
    {name: "bug", color: "#e74c3c"},          // Red
    {name: "urgent", color: "#e67e22"},       // Orange
    {name: "feature", color: "#2ecc71"},      // Green
    {name: "lowPriority", color: "#95a5a6"},  // Gray
    {name: "enhancement", color: "#3498db"},  // Blue
    {name: "in-progress", color: "#f1c40f"},   // Yellow
    {name: "review", color: "#9b59b6"},       // Purple
    {name: "question", color: "#1abc9c"},     // Teal
    {name: "highPriority", color: "#c0392b"}, // Dark Red
    {name: "completed", color: "#2ecc71"}     // Green
];


const items = [];

function ControlledBoard() {
    const navigate = useNavigate();
    // You need to control the state yourself.
    const [controlledBoard, setBoard] = useState(board);
    const [labelColors, setLabelColors] = useState(initLabelColors);


    function handleCardMove(_card, source, destination) {
        const updatedBoard = moveCard(controlledBoard, source, destination);
        setBoard(updatedBoard);
    }

    const getColorByLabel = (label) => {
        const item = labelColors.find((item) => item.name === label);
        return item ? item.color : null; // Return color or null if label not found
    };

    function CustomCard({card}) {
        return (
            <div className="card" onClick={() => navigate('/task-details')}>
                {card.title}
                <div className="labels">
                    {card.labels?.map((label) => (
                        <Label color={getColorByLabel(label)} text={label}/>
                    ))}
                </div>
            </div>
        );
    }

    function CustomColumnTitle({title}) {
        return (
            <div className="rck-header">
                {title}
            </div>
        );
    }

    const onNewCard = (draftCard) => ({
        id: new Date().getTime(),
        ...draftCard
    });

    const onNewColumn = (draftColumn) => ({
        id: new Date().getTime(),
        ...draftColumn
    });

    return (
        <Board
            disableColumnDrag
            allowAddCard={{ on: "top" }}
            allowAddColumn={{ on: "right" }}
            allowRemoveCard
            allowRenameColumn
            onCardNew={console.log}
            onCardRemove={console.log}
            onColumnNew={console.log}
            onColumnRemove={console.log}
            onColumnRename={console.log}
            onNewCardConfirm={onNewCard}
            onNewColumnConfirm={onNewColumn}
            onDragEnd={handleCardMove}
            initialBoard={controlledBoard}
            renderCard={(card) => <CustomCard card={card}/>}
            renderColumnHeader={(column) => <CustomColumnTitle title={column.title}/>} // Use the custom title component
        />
    );
}

const Dashboard = () => {
    return (
        <div>
            <div className='header-dashboard'>Dashboard</div>
            <div>
                <ControlledBoard/>
            </div>
        </div>
    );
}

export default Dashboard;
