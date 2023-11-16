const express = require('express');
const { Pool } = require('pg');
const app = express();
const cors = require('cors');


app.use(cors());
app.use(express.json());
app.use(express.static('public'));
const PORT = process.env.PORT || 9001;

const pool = new Pool({ 
    user: 'postgres',
    host: 'localhost',
    database: 'goals',
    password: 'noob',
    port: 5432
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