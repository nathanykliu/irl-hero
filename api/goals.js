const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();

//cors error fix
app.use(cors());

// postgresql connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.get('/api/goals', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM goals;');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.post('/api/goals', async (req, res) => {
  try {
    const { goals, days, complete, userId } = req.body;

    //insert the new goal into the database
    const insertQuery = 'INSERT INTO goals(goals, days, complete, user_id) VALUES($1, $2, $3, $4) RETURNING *;';
    const values = [goals, days, complete, userId];
    const { rows } = await pool.query(insertQuery, values);

    //send back new goal
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }

});

module.exports = app;
