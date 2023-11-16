const express = require('express');
const { Pool } = require('pg');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.static('public'));
const PORT = process.env.PORT || 9001;

const pool = new Pool({ 
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

// get all goals
app.get('/api/goals', async (req, res) => {
    try {
        const allGoals = await pool.query('SELECT * FROM goals');
        res.json(allGoals.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Add more endpoints as needed for creating, updating, and deleting goals

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});