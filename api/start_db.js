const express = require('express');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({
    user: 'postgres',       // default superuser
    host: 'localhost',
    password: 'pass', // if set
    port: 5432,
});

// Endpoint to fetch board data
app.get('/api/board-data', async (req, res) => {
    try {
        const columnsResult = await pool.query('SELECT * FROM columns');
        const tasksResult = await pool.query('SELECT * FROM tasks');
        const labelsResult = await pool.query('SELECT * FROM labels');

        const columns = columnsResult.rows;
        const tasks = tasksResult.rows;
        const labels = labelsResult.rows;

        // Format data for the Kanban board
        const board = {
            columns: columns.map(column => ({
                id: column.id,
                title: column.name,
                cards: tasks
                    .filter(task => task.column_id === column.id)
                    .map(task => ({
                        id: task.id,
                        title: task.title,
                        labels: task.labels ? task.labels.split(',') : [], // Assuming labels are stored as a comma-separated string
                    })),
            })),
        };

        res.json({ board, labelColors: labels });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
