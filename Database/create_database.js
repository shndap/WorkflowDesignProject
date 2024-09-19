const {Client} = require('pg');
const fs = require('fs');
const path = require('path');

// Connect to the default 'postgres' database to run administrative tasks
const client = new Client({
    user: 'postgres',       // default superuser
    host: 'localhost',
    password: 'pass', // if set
    port: 5432,
});

const sqlFilePath = path.join(__dirname, 'generate.sql');

async function createDatabase() {
    try {
        // Read the SQL file contents
        const sql = fs.readFileSync(sqlFilePath).toString();

        // Connect to PostgreSQL
        await client.connect();
        console.log('Connected to PostgreSQL');

        // Execute the SQL commands
        await client.query(sql);
        console.log('SQL file executed successfully.');

    } catch (err) {
        console.error('Error executing SQL file:', err);
    } finally {
        // Close the PostgreSQL connection
        await client.end();
        console.log('Disconnected from PostgreSQL');
    }
}

createDatabase();
