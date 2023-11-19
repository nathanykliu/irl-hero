// api/users.js

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();

//cors error fix
app.use(cors());
app.use(express.json());

// postgresql connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users;');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { lastname, firstname, stage } = req.body;

    //insert the new goal into the database
    const insertQuery = 'INSERT INTO users (lastname, firstname, stage) VALUES($1, $2, $3) RETURNING *;';
    const values = [lastname, firstname, stage];
    const { rows } = await pool.query(insertQuery, values);

    //send back new goal
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }

});

module.exports = app;
